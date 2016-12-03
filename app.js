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
  var results_image = [];

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

  var async_tokens = options.length;  //Number of search tasks expected to complete, "countdown" approach -- e.g.from 6 to 1

  // Add requests for each API that is checked
  for(var i = 0; i < options.length; i++) {

    //Youtube
    //Check if this MOOC provider is checked
    if(options[i] === 'youtube'){
      console.log("Search YouTube");
      console.log(i);

      youTube.search(courses, 5, function(error, result, body) {
        var youTubeResp = result;
        if (error) {
          console.log(error);
        } else {
          //console.log(JSON.stringify(result, null, 5));
          json_body = JSON.stringify(youTubeResp);
          json_parsed = JSON.parse(json_body);

          if (json_parsed.pageInfo.totalResults == 0){
            console.log("Youtube Returned No Results!");           
          } else {
            var max_len = 0; //initialize the max_len for cappping the results
            
            if (json_parsed.pageInfo.totalResults >= 5) {
              max_len = 5; 
            } else {
              max_len = json_parsed.pageInfo.totalResults;
            }

            for(var i = 0; i < max_len; i++) {
              var youTubeUrl = "https://www.youtube.com/embed/" + json_parsed.items[i].id.videoId;
              var youTubeTitle = json_parsed.items[i].snippet.title;
              var youTubeDescr = json_parsed.items[i].snippet.description;
              results.push(["YouTube: " + youTubeTitle, youTubeUrl, youTubeDescr]);
            }
          }
        }

      //Check if this is the last search task before rendering all the results?
        if (async_tokens === 1) {
          res.render("home.html", {'results': results,'results_image': results_image});
        }
        async_tokens--;   //One Task done: decrements the token.
      });
    }


    //Udemy
    //Check if this MOOC provider is checked
    if(options[i] === 'udemy'){
      console.log("Search Udemy");

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

              if (json_body.results.length == 0) {
                console.log('Udemy Returned No Results!');
              } else {
                var max_len = 0; //initialize the max_len for cappping the results

                if (json_body.results.length >= 5) {
                  max_len = 5; 
                } else {
                  max_len = json_body.results.length;
                }
            
                for(var i =0 ; i < max_len; i++) {
                  var name = json_body.results[i].title;
                  var courseUrl = 'https://www.udemy.com' + json_body.results[i].url;
                  var imageUrl = json_body.results[i].image_480x270;
                  var description = json_body.results[i].description;
                  //console.log(name, courseUrl, imageUrl);
                  results_image.push(["Udemy: " + name, courseUrl, imageUrl, description]);
                }
                //console.log(results);
              }
            }

            //Check if this is the last search task before rendering all the results?
            if (async_tokens === 1) {
              res.render("home.html", {'results': results,'results_image': results_image});
            }
            async_tokens--;   //One Task done: decrements the token.
      });
    }

    //Khan Academy
    //Check if this MOOC provider is checked
    if(options[i] === 'khanAcademy'){
      console.log("Search Khan Academy");
      console.log(i);
      youTube.khanSearch(courses, 5, function(error, result, body) {
        var khanResp = result;

        if (error) {
          console.log(error);
        } else {
          //console.log(JSON.stringify(result, null, 5));
          json_body = JSON.stringify(khanResp);
          json_parsed = JSON.parse(json_body);
          //console.log(json_body);

          if (json_parsed.pageInfo.totalResults == 0){
            console.log('Khan Academy Returned No Results!');           
          } else {
            var max_len = 0; //initialize the max_len for cappping the results
            
            if (json_parsed.pageInfo.totalResults >= 5) {
              max_len = 5; 
            } else {
              max_len = json_parsed.pageInfo.totalResults;
            }

            for (var i = 0; i < max_len; i++) {
              var khanUrl = "https://www.youtube.com/embed/" + json_parsed.items[i].id.videoId;
              var khanTitle = json_parsed.items[i].snippet.title;
              var khanDescr = json_parsed.items[i].snippet.description;
              results.push(["Khan Academy: " + khanTitle, khanUrl, khanDescr]);
            }
          }
        }

      //Check if this is the last search task before rendering all the results?
        if (async_tokens === 1) {
          res.render("home.html", {'results': results,'results_image': results_image});
        }
        async_tokens--;   //One Task done: decrements the token.
      });
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
              // console.log(json_body);
              
              if (json_body.elements.length == 0) {
                  console.log('Coursera Returned No Results!');
                } else {
                  var max_len = 0; //initialize the max_len for cappping the results

                  if (json_body.elements.length >= 5) {
                    max_len = 5; 
                  } else {
                    max_len = json_body.elements.length;
                  }

                  for (var i=0; i<max_len; i++) {
                    var name = json_body.elements[i].name;
                    var courseUrl = json_body.elements[i].previewLink;
                    var imageUrl = json_body.elements[i].photoUrl;
                    var description = json_body.elements[i].description;
                    //console.log(name, courseUrl, imageUrl, description);
                    results_image.push(["Coursera: " + name, courseUrl, imageUrl, description]);
                  }
                  // console.log(results);
                  // console.log(results_image);
              }
            }

          //Check if this is the last search task before rendering all the results?
          if (async_tokens === 1) {
            res.render("home.html", {'results': results,'results_image': results_image});
          }
          async_tokens--;   //One Task done: decrements the token.
      });
    }

    //Udacity
    //Check if this MOOC provider is checked
    if(options[i] === 'udacity'){
      console.log("Search Udacity");
      console.log(i);

      request({
        url: 'http://localhost:3001/udacity?title=' + courses,
        method: 'GET',
          }, function(error, response, body){
            if(error) {
              console.log(error);
            } else {
              //console.log(response.statusCode);
              json_body = JSON.parse(body);
              console.log("THIS IS THE UDATICYT RESULT!!!!!!!");
              
              if (json_body.length == 0){
                console.log('Udacity Returned No Results!');           
              } else {
              var max_len = 0; //initialize the max_len for cappping the results
            
              if (json_body.length >= 5) {
                max_len = 5; 
              } else {
                max_len = json_body.length;
              }

              for(var i=0; i<max_len; i++) {
                var name = json_body[i].title;

                var courseUrl = json_body[i].homepage;
                // var imageUrl = json_body.image;
                var description = json_body[i].short_summary;
                //console.log(name, courseUrl, imageUrl);
                results_image.push(["Udacity: " + name, courseUrl,'http://admin.imbresources.org/photos/noImageFound.l.png',description]);
              }
                console.log(results);
            }
          }

          //Check if this is the last search task before rendering all the results?
          if (async_tokens === 1) {
            res.render("home.html", {'results': results,'results_image': results_image});
          }
          async_tokens--;   //One Task done: decrements the token.
      });
    }
  }
  //End For-loop
  


  //???The codes below probably won't render anything, because Nodejs is asynchronous, so it renders empty results before the steps above get results back.
  //Render page with all results 
  // res.render("home.html", {'results': results});

});

// Start up server on port 3000 on host localhost

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;

  console.log('Assignment 3 server on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});