
var searchForm = document.querySelectorAll("#searchForm")[0];

if(searchForm != null){ 
searchForm.addEventListener("submit", function(event){
	var query = searchForm.elements.namedItem("courses").value;
	var options = searchForm.elements.namedItem("searchoptions").value;
	
	var popupText = "";

	if(query === ""){
		popupText = "Please enter a query";
		event.preventDefault();
	}
	else if(options === ""){
		popupText = "Please check the Moocs database you want to search";
	}
	else{
		popupText = "";
	}
	document.getElementById("required").innerHTML = popupText;	
	});
}

