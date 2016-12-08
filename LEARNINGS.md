
####I.URL of application:


http://agile-citadel-56488.herokuapp.com


####II. Description:


The application is designed to provide an integrated platform for searching a specific course across certain famous online educational websites, namely Coursera, Khan Academy, Udacity, Udemy and YouTube. This application is aimed to relieve users from searching individually on different MOOCs sites for a course, instead, it displays the offerings from selected MOOCs on a single website with a single search. It not only makes the search experience easier but also allows the user to make a good comparison among the available courses.
 
Functionality:
The application provides a user with a search field and checkboxes for selecting between 5 MOOCs across which the user wants to make his search. Once the search term is submitted the application displays a list of course titles, descriptions and links to courses from the requested MOOCs platforms.




####III. 


###NodeJS
As a JavaScript runtime environment, it is used to build server-side applications. It works together with Express to serve our webpage and provide easier way of routing to render our webpage. 


###HTML
It  is a markup language that has been used for creating the structure of our webpage.  


###CSS
It is a styling language that has been used for styling our application page structurally and aesthetically.


###Javascript
We used javascript to write the code for web server and api server in NodeJs and we also used javascript to display message on the html page in case nothing was entered in the search query.


###Web Server
The web server accepts search requests from the user and processes them accordingly. The requests for search from YouTube, Coursera, Khan Academy, Udemy are send to their APIs and the request for search from Udacity is routed to the database that stores udacity data of courses.


###API
The internal API has been used for creating a database and inserting Udacity course details contents in  ‘udacity’ table in the database. This server also accepts requests for udacity search and    retrieves the content from the table based on search query.


###SQLite3
This is the NodeJS library that has been used for creation of a database "moocsearch.db", it enables   use of query language on the database. The library has been used to populate   the database table with udacity courses  and also allows retrieval of course data  from the it.


###Express
This is a NodeJS library a NodeJS library for writing web servers. This library has been used app.js and api.js to respond to http  GET and POST requests and for dynamic rendering of the page based on request responses.


###Request
This is a NodeJS library for sending http requests with certain options. This library has been used in the application to send requests to external APIs of MOOCs and internal database API with search queries to get the relevant courses.

    
###Body Parser
This is a NodeJS library that extracts the entire body portion of an incoming POST request stream and exposes it on req.body. Body parser in API has been used to parse a Json file with size limit of 3mb.


###Curl
Curl allows sending requests to servers from the terminal. Curl has been  used in  the project especially to populate the database, for sending json file of udacity  courses as body of the POST requests. 


###Heroku
This is a cloud Platform that has been used for deploying our application on Internet.


###Mustache
Mustache is a web template system that has been used to display results dynamically from the search query on the html page.








