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


// Get homepage
app.get('/', function (req, res, next) {
    res.render("home.html");        
});

//Upon submitting form, send get request to MOOCS APIs
app.post('/', function(req,res,next){
  
  var results = [] //array to add up all results (can also be a different format, what works best)
  var yt_query = req.body.query
// Add requests for each API that is checked

//Youtube
//Add if-statement for checked or not 

youTube.search(yt_query, 5, function(error, result, body) {
  var youTubeResp = result;
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 5));
    
    
    

    //this rendering should only be done after all results are gathered
    json_body = JSON.stringify(youTubeResp);
    json_parsed = JSON.parse(json_body);
    for (var i = 0; i < 5; i++) { 
      var youTubeUrl = "https://www.youtube.com/embed/" + json_parsed.items[i].id.videoId;
      var youTubeTitle = json_parsed.items[i].snippet.title;
      var youTubeDescr = json_parsed.items[i].snippet.description; 

      results.push(["YouTube: " + youTubeTitle, youTubeUrl, youTubeDescr]);
    }
    console.log(results);
        
    };

res.render("home.html", {title: results[0][0], video: results[0][1], description: results[0][2]});
  });


//EdX
//Add if-statement for checked or not 

//Udemy
//Add if-statement for checked or not 

//Khan Academy
//Add if-statement for checked or not 

//Coursera 
//Add if-statement for checked or not 

//Udacity (not entirely clear from API overview spreadsheet whether this is possible)
//Add if-statement for checked or not 


//Render page with all results 

});


// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});