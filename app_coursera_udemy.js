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
  var options = req.body.searchoptions
  var results = [] //array to add up all results (can also be a different format, what works best)
  
  console.log("Variables");
  console.log(name);
  console.log(courses);
  console.log(options);
  console.log(results);

  if (typeof options === 'undefined') {
    res.send('Nothing selected!');
    return;
  }

  //Ensure that options always remains an array.
  if (! Array.isArray(options)) {
    options = [];
    options.push(req.body.searchoptions);
  }

  var async_tokens = options.length;  //# of search tasks expected to complete.

  // Add requests for each API that is checked
  for(var i=0; i < options.length; i++){

    //Youtube
    //Check if this MOOC provider is checked
    if(options[i] === 'youtube'){
      console.log("Search YouTube");
      console.log(i);
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
    //     }
      //Check if we're the last task?
      if (async_tokens == 1) {
        res.render("home.html", {'results': results});
      }
      async_tokens--;   //Task done.
    }

    //EdX
    //Check if this MOOC provider is checked
    if(options[i] === 'edX'){
      console.log("Search edX");
      console.log(i);
      //Add request to API here
      
      //Check if we're the last task?
      if (async_tokens == 1) {
        res.render("home.html", {'results': results});
      }
      async_tokens--;   //Task done.
    }

    //Udemy
    //Check if this MOOC provider is checked
    if(options[i] === 'udemy'){
      console.log("Search Udemy");
      var udemy_results = [];
      // const CLIENT_AUTH = new Buffer('Si9ikvjcO6kpHyPMjLK8od6vNiwNTKBD3uo70gLO:ZPb5VDWWfvOQtAIjmsHiU10Yk1RR7LZ0hwGT0fqQG34TdUWUSon9IRrPdlmZb47DN4foFWB5kxZZiV7Cng1BwKscSbX20jEnlEuh8Gm26ejBQg5opzcyXHnb2TJ6m8WB').toString('base64');
      // const ENDPOINT_URL = 'https://www.udemy.com/';

      request({
        url: 'https://www.udemy.com/api-2.0/courses/?search=' + courses,
        method: 'GET',
        headers: {
            "Authorization": "Basic U2k5aWt2amNPNmtwSHlQTWpMSzhvZDZ2Tml3TlRLQkQzdW83MGdMTzpaUGI1VkRXV2Z2T1F0QUlqbXNIaVUxMFlrMVJSN0xaMGh3R1QwZnFRRzM0VGRVV1VTb245SVJyUGRsbVpiNDdETjRmb0ZXQjVreFpaaVY3Q25nMUJ3S3NjU2JYMjBqRW5sRXVoOEdtMjZlakJRZzVvcHpjeVhIbmIyVEo2bThXQg==",
            "Accept": "application/json, text/plain, */*" }, 
          }, function(error, response, body){
            if(error) {
              console.log(error);
            } else {
              //console.log(response.statusCode);
              json_body = JSON.parse(body);
              // console.log(json_body);
              var name = json_body.results[0].title;
              var courseUrl = 'https://www.udemy.com' + json_body.results[0].url;
              var imageUrl = json_body.results[0].image_125_H;
              var description = json_body.results[0].description;
              //console.log(name, courseUrl, imageUrl);
              udemy_results.push(name, courseUrl, imageUrl);
              results.push(udemy_results);
              //console.log(results);
            }

            //Check if we're the last task?
            if (async_tokens == 1) {
              res.render("home.html", {'results': results});
            }
            async_tokens--;   //Task done.
      });
    }

    //Khan Academy
    //Check if this MOOC provider is checked
    if(options[i] === 'khanAcademy'){
      console.log("Search Khan Academy");
      console.log(i);
      //Add request to API here
      //Check if we're the last task?
      if (async_tokens == 1) {
        res.render("home.html", {'results': results});
      }
      async_tokens--;   //Task done.
    }

    // Coursera 
    // Check if this MOOC provider is checked
    if(options[i] === 'coursera'){
      console.log("Search Coursera");
      console.log(i);
      var coursera_results = [];
      var query_url = 'https://api.coursera.org/api/courses.v1?q=search&query='+courses+'&includes=name,description,photoUrl,previewLink&fields=name,description,photoUrl,previewLink';

      request({
        url: query_url,
        method: 'GET',
        }, function(error, response, body){
          if(error) {
            console.log(error);
          } else {
              //console.log(response.statusCode);
              json_body = JSON.parse(body);
              //console.log(json_body);
              var name = json_body.elements[0].name;
              var courseUrl = json_body.elements[0].previewLink;
              var imageUrl = json_body.elements[0].photoUrl;
              var description = json_body.elements[0].description;
              //console.log(name, courseUrl, imageUrl, description);
              coursera_results.push(name, courseUrl, imageUrl, description);
              results.push(coursera_results);
              //console.log(results);
          }

          //Check if we're the last task?
          if (async_tokens == 1) {
            res.render("home.html", {'results': results});
          }
          async_tokens--;   //Task done.
      });
    }

    //Udacity
    //Check if this MOOC provider is checked
     if(options[i] === 'udacity'){
      console.log("Search Udacity");
      console.log(i);
      //Add request to API here

        //Check if we're the last task?
        if (async_tokens == 1) {
          res.render("home.html", {'results': results});
        }
        async_tokens--;   //Task done.
     }

  //End For-loop
  }


  //???The codes below probably won't render anything, because Nodejs is asynchronous, so it renders empty results before the steps above get results back.
  //Render page with all results 
  // res.render("home.html", {'results': results});

  //Got all tasks done - yey!
  //res.render("home.html", {'results': results});
});

// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});