
####I.URL of application:


http://agile-citadel-56488.herokuapp.com


####II. Description:


The application is designed to provide an integrated platform for searching a specific course across certain famous online educational websites, namely Coursera, Khan Academy, Udacity, Udemy and YouTube. This application is aimed to relieve users from searching individually on different MOOCs sites for a course. Instead, it displays the offerings from selected MOOCs on a single website with a single search. It not only makes the search experience easier but also allows the user to make a good comparison among the available courses.
 
Functionality:
The application provides a user with a search field and checkboxes for selecting between 5 MOOCs across which the user wants to make his search. Once the search term is submitted the application displays a list of course titles, descriptions and links to courses from the requested MOOCs platforms, with a maximum of 5 per MOOCs platform.




####III. 


###NodeJS
As a JavaScript runtime environment, it is used to build server-side applications. It works together with Express to serve our webpage and provide easier way of routing to render our webpage. 


###HTML
It  is a markup language that has been used for creating the structure of our webpage.  


###CSS
It is a styling language that has been used for styling our application page structurally and aesthetically.


###Javascript
We used javascript to write the code for web server and api server in NodeJs and we also used javascript to show an alert on the webpage in case nothing was entered in the search query or none of the checkboxes was checked.


###Web Server
The web server accepts search requests from the user and processes them accordingly. The requests to search YouTube, Coursera, Khan Academy, Udemy are sent to the corresponding APIs, and the request to search Udacity is routed to our own API that is connected to a database that stores Udacity data of courses.


###API
We created our own API with two end points, one to create a database that inserts Udacity course details contents in  ‘udacity’ table. The other endpoint accepts requests for Udacity search and retrieves the content from the table based on search query.


###SQLite3
This is the NodeJS library that has been used for creation of the database "moocsearch.db". It enables use of query language on the database. The library has been used to populate the database table with udacity courses and also allows retrieval of course data from the it.


###Express
This is a NodeJS library a NodeJS library for writing web servers. This library has been used app.js and api.js to respond to http  GET and POST requests and for dynamic rendering of the page based on request responses.


###Request
This is a NodeJS library for sending http requests with certain options. This library has been used in the application to send requests to external APIs of MOOCs and internal database API with search queries to get the relevant courses.

    
###Body Parser
This is a NodeJS library that extracts the entire body portion of an incoming POST request stream and exposes it on req.body. Body parser in API has been used to parse a Json file with size limit of 3mb.


###Curl
Curl allows sending requests to servers from the terminal. Curl has been  used in the project specifically to populate the database, for sending json file of Udacity courses as body of the POST requests. 


###Heroku
This is a cloud Platform that has been used for deploying our application on the Web. We created two seperate Heroku-applications for our webserver and for our API. 


###Mustache
Mustache is a web template system that has been used to display results from the search query dynamically on the browser.








