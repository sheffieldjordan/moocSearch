
var searchForm = document.querySelectorAll("#searchForm")[0];

if(searchForm != null){ 
searchForm.addEventListener("submit", function(event){
	var query = searchForm.elements.namedItem("courses").value;	
	var options = document.getElementsByClassName("options");

	var notification1 = "";
	var notification2 = "";

	// Check if any query has been entered
	if(query === ""){
		notification1 = "Please enter a query";
		event.preventDefault();
	} 

	// Check if any checkbox has been checked
	var checkCount = 0;
	for(var i = 0; i < options.length && checkCount === 0; i++){
		if (options[i].checked) {
			checkCount++;
		}
	}
	if(checkCount === 0){
    	notification2 = "Please check the boxes of the MOOCs databases you want to search";
		event.preventDefault();
  		}
  	
	document.getElementById("required").innerHTML = notification1 + '<br>' + notification2;	
	});
}

