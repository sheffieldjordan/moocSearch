  /******NO NEED TO MODIFY ****/
var express = require('express'); // Adding the express library 
var request = require('request')  // Adding the request library (to make HTTP reqeusts from the server);
var bodyParser = require('body-parser');
var querystring = require('querystring');
var rp = require('request-promise');

//CLIENT_AUTH includes both id + pwd.
const CLIENT_AUTH = new Buffer('Si9ikvjcO6kpHyPMjLK8od6vNiwNTKBD3uo70gLO:ZPb5VDWWfvOQtAIjmsHiU10Yk1RR7LZ0hwGT0fqQG34TdUWUSon9IRrPdlmZb47DN4foFWB5kxZZiV7Cng1BwKscSbX20jEnlEuh8Gm26ejBQg5opzcyXHnb2TJ6m8WB').toString('base64');
const ENDPOINT_URL = 'https://www.udemy.com/';
const UDEMY_RESPONSE_OK = "success";
const UDEMY_RESPONSE_ERR = "error";

var app = express(); // initializing applicaiton

app.use(bodyParser.urlencoded({ extended: false }));

// Set up /static path to host css/js/image files directly
app.use('/static', express.static(__dirname + '/static'));

// Define your routes here
app.get('/', function (req, res, next) {
  var keyword = 'python';

  udemy_course_search({ search: keyword }, function(status_code, search_results) {
    if (status_code == UDEMY_RESPONSE_OK)
      res.send(search_results);
    else
      res.send('Error');
  });
});



//UDEMY Api  **********************************************************************************************

//udemy_course_ssearch(): searches udemy courses.
function udemy_course_search(params, callback_fn) {
  var options = {};

  if (params)   //if parameters are defined, use them (converted to URL params for GET).
    options = udemy_create_api_params('courses?' + querystring.stringify(params));      //?search=keyword&gtsds=sdsd
  else
    options = udemy_create_api_params('courses');

  //Request sync.
  rp(options)
    .then(function (body) {

      //establish a structure.
      var search_results = {
        course_summaries: {},
        course_details: {},
        reviews: {},
        results_found: 0
      };

      var courses_found = body.count;

      //We have found some courses - let's gather info and dig into details.
      if (courses_found > 0) {
        var courses = body['results'];
        var get_course_details = [];
        
        for(var result_index in courses) {
          var course = courses[result_index];
          search_results['course_summaries'][course.id] = {};
          search_results.course_summaries[course.id]['id'] = course.id;
          search_results.course_summaries[course.id]['title'] = course.title;
          search_results.course_summaries[course.id]['url'] = course.url;
          search_results.course_summaries[course.id]['img'] = course.image_480x270;
        }

        search_results.results_found = courses_found;       //Update count of found courses.
      }

      callback_fn(UDEMY_RESPONSE_OK, search_results);
    })
    .catch(function(err) {
      callback_fn(UDEMY_RESPONSE_ERR, err);
    });
}


function udemy_create_api_params(resource_uri) {
  return { 
          'uri': ENDPOINT_URL + 'api-2.0/' + resource_uri,
          'method': 'GET',
          'headers': {
            'Authorization': 'Basic ' + CLIENT_AUTH
          },
          json: true
        };
}
//*********************************************************************************************************


// Start up server on port 3000 on host localhost
var server = app.listen(3000, function () {
  var port = server.address().port;

  console.log('Final Project on localhost listening on port ' + port + '!');
  console.log('Open up your browser (within your VM) and enter the URL "http://localhost:' + port + '" to view your website!');
});