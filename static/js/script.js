/* add function for required fields in query form */


function processForm(){  

var empt = document.forms["contactForm"]["personsName"].value;  
	if (empt == ""){  
		document.getElementById("nameRequired").innerHTML = "***Name Field Required***";  
	  	} 
	else{  
		document.getElementById("nameRequired").innerHTML = "";  
		}

var subjField = document.forms["contactForm"]["subject"].value;  
	if (subjField == ""){  
	document.getElementById("subjectRequired").innerHTML = "***Subject Field Required***";  
	}
	else   
	{  
	document.getElementById("subjectRequired").innerHTML = "";  
} 

var msgField = document.forms["contactForm"]["message"].value;  
	if (msgField == "") {  
	document.getElementById("messageRequired").innerHTML = "***Message Field Required***";  
	}
	else   
	{  
	document.getElementById("messageRequired").innerHTML = "";
	} 

var emailField = document.forms["contactForm"]["email"].value;  
	if (emailField == ""){  
	document.getElementById("emailRequired").innerHTML = "***Email Address Required***";  
	}
	else   
	{  
	document.getElementById("messageRequired").innerHTML = "";  
	} 
}  

