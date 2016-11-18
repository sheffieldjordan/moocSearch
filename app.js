  /******NO NEED TO MODIFY ****/
var express = require('express'); // Adding the express library 
var mustacheExpress = require('mustache-express'); // Adding mustache templating system and connecting it to 
var request = require('request')  // Adding the request library (to make HTTP reqeusts from the server);
var tools = require('./tools.js'); // Custom module providing additional functionality to the server
var bodyParser = require('body-parser');


var app = express(); // initializing applicaiton

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyASBTPnt-OJlLc3ey0SMhiU38a2THSsnP4');

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
// For each request to this server, run the function "logger" in tools.js 
app.use(tools.logger);

// Set up /static path to host css/js/image files directly
app.use('/static', express.static(__dirname + '/static'));

/****END OF NO NEED TO MODIFY SECTION ******/


// Define your routes here
app.get('/', function (req, res, next) {
    res.render("index.html");        
});
app.get('/contactus', function(req,res) {
  res.render("contactus.html");
  var subject = req.body.subject;
  youTube.search(subject, 2, function(error, result, body) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 2));
    json_body = JSON.parse(body);
    var videoId = json_body.data[1].result;
    //var content = json_body.data[0].content; 
    res.render("contactus.html", {
      video_search_results: "https://www.youtube.com/watch?v=" + videoId
    });
  }
});                       
});



app.get('/aboutus', function (req, res) {
  res.render("aboutus.html");
});
app.get('/contactus', function(req,res) {
  res.render("contactus.html");
});
app.post('/contactus', function(req,res) {
  
  console.log("Received POST for Contact Form");
  emailAddr = req.body.emailAddr;
  console.log("Sending email to myself");
  var name = req.body.name;
  res.render("contactus.html", {
    submit_notice: 'Hi ' + name + ' your message has been sent'
  });
});

app.get('/blog/what-productivity-systems-wont-solve', function(req,res) {
  request({ // put this app.get for each blog entry 
    url: 'http://localhost:3001/blog?slug=what-productivity-systems-wont-solve',
    method: 'GET',
    headers: {
      'Content-Type':"application/json"
    },
      
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log(response.statusCode, body);
          json_body = JSON.parse(body);
          var title = json_body.data[0].title;
          var content = json_body.data[0].content; 
          res.render("5wont_solve.html",{"title":title,"content":content});        
      }
});
});


// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});