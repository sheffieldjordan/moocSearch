  /******NO NEED TO MODIFY ****/
var express = require('express'); // Adding the express library 
var mustacheExpress = require('mustache-express'); // Adding mustache templating system and connecting it to 
var request = require('request')  // Adding the request library (to make HTTP reqeusts from the server);
var tools = require('./tools.js'); // Custom module providing additional functionality to the server
var bodyParser = require('body-parser');

var app = express(); // initializing applicaiton

// var YouTube = require('youtube-node');
// var youTube = new YouTube();
// youTube.setKey('AIzaSyASBTPnt-OJlLc3ey0SMhiU38a2THSsnP4');

// var khan = require('khan');

app.engine('html', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
// For each request to this server, run the function "logger" in tools.js 
// app.use(tools.logger);

// Set up /static path to host css/js/image files directly 
app.use('/static', express.static(__dirname + '/static'));

/****END OF NO NEED TO MODIFY SECTION ******/


// Get homepage
app.get('/', function (req, res, next) {
    res.render("home.html");        
});

//Upon submitting form, send get request to MOOCS APIs
app.post('/', function(req,res,next){
  var name = req.body.name;
  var courses = req.body.courses;
  var results = req.body.searchoptions
  // var results = [] //array to add up all results (can also be a different format, what works best)
  console.log("Variables");
  console.log(name);
  console.log(courses);
  console.log(results);


// Add requests for each API that is checked

//Youtube
//Add if-statement for checked or not 

//request to youTube API
// youTube.search(query, 2, function(error, result, body) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     console.log(JSON.stringify(result, null, 2));
//     json_body = JSON.parse(body);
//     var videoId = json_body.data[1].result;
//     //var content = json_body.data[0].content; 

//     //this rendering should only be done after all results are gathered
//     // res.render("contactus.html", {
//     video_search_results: "https://www.youtube.com/watch?v=" + videoId;
//     //  });
//     }
});


//EdX
//Add if-statement for checked or not here
//Add request to API here

//Udemy
//Add if-statement for checked or not here
//Add request to API here

//Khan Academy
//Add if-statement for checked or not 
//Add request to API here

// function getVideo(query) {
//   var khan_results = khan.topicVideos(query);
//   console.log(khan_results);

// }

//Coursera 
//Add if-statement for checked or not here
//Add request to API here


//Udacity (not entirely clear from API overview spreadsheet whether this is possible)
//Add if-statement for checked or not 
//Add request to API here


//Render page with all results 
// res.render("home.html", {results: 'results'})
// });


// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});