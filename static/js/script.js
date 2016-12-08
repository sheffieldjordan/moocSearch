
var searchForm = document.querySelectorAll("#searchForm")[0];

if(searchForm != null){ 
searchForm.addEventListener("submit", function(event){
	var query = searchForm.elements.namedItem("courses").value;	
	var options = searchForm.elements.namedItem("searchoptions").value;

	var notification1 = "";
	var notification2 = "";

	if(query === ""){
		notification1 = "Please enter a query";
		event.preventDefault();
	} 

	if (typeof options === 'undefined') {
    	notification2 = "Please choose a MOOCs database you want to search";
		event.preventDefault();
  	}
	
	document.getElementById("required").innerHTML = notification1 + '\n' + notification2;	
	});
}

