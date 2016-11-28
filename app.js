  /******NO NEED TO MODIFY ****/
var express = require('express'); // Adding the express library 
var mustacheExpress = require('mustache-express'); // Adding mustache templating system and connecting it to 
var request = require('request');  // Adding the request library (to make HTTP reqeusts from the server);
var tools = require('./tools.js'); // Custom module providing additional functionality to the server
var bodyParser = require('body-parser');

var app = express(); // initializing applicaiton

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyASBTPnt-OJlLc3ey0SMhiU38a2THSsnP4');

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
  var options = req.body.searchoptions;
  var results = []; //array to add up all results (can also be a different format, what works best)
  
  console.log("Variables");
  console.log(name);
  console.log(courses);
  console.log(options);
  console.log(results);

// Add requests for each API that is checked
for(var i=0; i < options.length; i++){

//Youtube
//Check if this MOOC provider is checked
if(options[i] === 'youtube'){
  console.log("Search YouTube");
  youTube.search(courses, 5, function(error, result, body) {
  var youTubeResp = result;
  if (error) {
    console.log(error);
  }
  else {
    //console.log(JSON.stringify(result, null, 5));
    json_body = JSON.stringify(youTubeResp);
    json_parsed = JSON.parse(json_body);
    for (var i = 0; i < 5; i++) { 
      var youTubeUrl = "https://www.youtube.com/embed/" + json_parsed.items[i].id.videoId;
      var youTubeTitle = json_parsed.items[i].snippet.title;
      var youTubeDescr = json_parsed.items[i].snippet.description; 

      results.push(["YouTube: " + youTubeTitle, youTubeUrl, youTubeDescr]);
    }
  }
  }
                )};


//EdX
//Check if this MOOC provider is checked
 if(options[i] === 'edX'){
  console.log("Search edX");
//Add request to API here
 }

//Udemy
//Check if this MOOC provider is checked
 if(options[i] === 'udemy'){
  console.log("Search Udemy");
//Add request to API here

 }

//Khan Academy
//Check if this MOOC provider is checked
 if(options[i] === 'khanAcademy'){
  console.log("Search Khan Academy");
//Add request to API here
  youTube.khanSearch(courses,  5, function(error, result, body) {
  var khanResp = result;
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result, null, 5));
    
    
    

    //this rendering should only be done after all results are gathered
    json_body = JSON.stringify(khanResp);
    json_parsed = JSON.parse(json_body);
    console.log(json_body);
    for (var i = 0; i < 5; i++) { 
      var khanUrl = "https://www.youtube.com/embed/" + json_parsed.items[i].id.videoId;
      var khanTitle = json_parsed.items[i].snippet.title;
      var khanDescr = json_parsed.items[i].snippet.description; 

      results.push(["Khan Academy: " + khanTitle, khanUrl, khanDescr]);
    }
    ;
        
    }});
 }

//Coursera 
//Check if this MOOC provider is checked
  if(options[i] === 'coursera'){
    console.log("Search Coursera");
    var coursera_results = [];
    var query_url = 'https://api.coursera.org/api/courses.v1?q=search&query='+courses+'&includes=name,description,photoUrl,previewLink&fields=name,description,photoUrl,previewLink';

    request({
      url: query_url,
      method: 'GET',
      }, function(error, response, body){
        if(error) {
          console.log(error);
      } else {
          console.log(response.statusCode);
          json_body = JSON.parse(body);
          //console.log(json_body);
          var name = json_body.elements[0].name;
          var courseUrl = json_body.elements[0].previewLink;
          var imageUrl = json_body.elements[0].photoUrl;
          var description = json_body.elements[0].description;
          //console.log(name, courseUrl, imageUrl, description);
          coursera_results.push(name, courseUrl, imageUrl, description);
          results.push(coursera_results);
          console.log(results);
      }
    });
  }

//Udacity
//Check if this MOOC provider is checked
 if(options[i] === 'udacity'){
  console.log("Search Udacity");
//Add request to API here
 }

//End For-loop
};

//Render page with all results 
res.render("home.html", {'results': results});
});

// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('moocSearch server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});