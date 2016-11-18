/*
	tools.js

	A miscellaneous module that adds additional functionality to your web application
	DO NOT NEED TO MODIFY!!!

*/
module.exports = {

	/* logger

		This function adds a simple logger to your application.
		Now on the console for every request that comes in your browser, this logger will notify you of the request, 
		what method was asked for, and what was the response code that the server sent.

	*/
	logger: function(req, res, next) {

		function afterResponse() {
	        res.removeListener('finish', afterResponse);
	        res.removeListener('close', afterResponse);

        	console.log(req.method +  " request received for path " +  req.originalUrl + " with status " + res.statusCode);
    	}

	    res.on('finish', afterResponse);
	    res.on('close', afterResponse);

	    next();
	},

	/* getMailAuthObject

		Returns an object with the authentication parameters needed to authenticate to the external Mailgun API. Grabs
		username and password values from the system environment for security purposes.
	*/
	getMailAuthObject: function() {
		user = process.env.MAILGUN_USERNAME;
		password = process.env.MAILGUN_PASSWORD;

		return {
			'user': username,
			'password': password
		};

	}

};