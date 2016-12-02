var express=require('express');
var app=express();
var request = require('request');

var bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'3mb'})); 

var sqlite3=require('sqlite3').verbose();
var db= new sqlite3.Database('moocsearch.db');


/* Create a table: */
app.post('/udacityData', function(req, res) {
  console.log("starts");
    
  db.run("CREATE TABLE IF NOT EXISTS udacity (" +
    "key varchar(255)," +
    "title varchar(255)," +
    "short_summary varchar(255),"+
    "homepage varchar(255))");
  
  console.log("table created!");

    var json_parsed=req.body;
  
 
  for (var i in json_parsed.courses )
  {
      // var a=json_parsed.courses[i].title;
      // var b=json_parsed.courses[i].short_summary;
      // var c=json_parsed.courses[i].homepage;
      // var e=json_parsed.courses[i].key;
      var a=json_parsed.courses[i]["title"];
      var b=json_parsed.courses[i]["short_summary"];
      var c=json_parsed.courses[i]["homepage"];
      var e=json_parsed.courses[i]["key"];
      console.log(a)
      
      db.run("INSERT INTO udacity " +"(key,title,short_summary,homepage) " + "VALUES (?,?, ?, ?)", e,a,b,c);
      // console.log("check"+a);
  }
  console.log("Finished");//   "title": b});
});


app.get('/udacity', function (req, res) {
  
  var searchword = req.query.title;
  console.log("sending request for  getting",searchword);
  //db.all("SELECT title,short_summary,homepage FROM udacity WHERE title=",searchword, function(err, row) {  
  //db.all("SELECT title,short_summary,homepage FROM udacity WHERE Contains(title,searchword) > 0", function(err, row) {  
 // db.all("SELECT * FROM udacity", function(err, row) {  
// ----
db.all("SELECT title,short_summary,homepage FROM udacity WHERE title LIKE ?","%"+searchword+"%", function(err, rows) {  
        // rows.forEach(function (row) {  
        // console.log(row.title);  
        //  res.json({"title": row.title,
        // "homepage":row.homepage,"short_summary":row.short_summary});
        // })  
        console.log(rows);
        res.json(rows)
    });   
//db.close(); 



});

var server = app.listen(process.env.PORT || 3001, function() {
  console.log('Server on localhost listening on port 3001');
});
// curl -H "Content-Type: application/json" -X POST --data '@/Users/sanaiqbal/Desktop/webarchitecture/project/mooc/udacity.json' http://localhost:3001/udacityData//curl -vX POST http://localhost:3001/udacityData '@PATH/udacity.json' --header "Content-Type: application/json"
//curl -X GET 'http://localhost:3001/udacity?title=Virtual'


