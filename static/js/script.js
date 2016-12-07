var searchForm = document.querySelectorAll("#searchForm")[0];
if(searchForm != null){ 
searchForm.addEventListener("submit", function(event){
	var query = searchForm.elements.namedItem("courses").value;
	
	var popupText = "";

	if(courses === ""){
		popupText = "Please enter a query";
		event.preventDefault();
	}
	document.getElementById("required").innerHTML = popupText;	
	});
}

