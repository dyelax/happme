var uid;
var contactEmail = "";
var shouldFilter = false;
var serverURL = "http://happme.azurewebsites.net";

$(document).ready(function() {		
	$("#contactEmail").val(contactEmail);
		
	$('#filterSwitch').click(function() {
		alert("A");

	    if ($(this).is(":checked")) {			
		    console.log("checked");
	    } else {
			console.log("unchecked");
		}
		
		var info = {"uid" : uid, "checked": $(this).is(":checked")}
		$.post(serverURL, info, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
	});
	
	$("#contactEmail").change(function() {
		var info = {"uid" : uid, "contact_email": $(this).val}
		$.post(serverURL, info, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
		console.log("changed");
	});
});

window.onload = function() {
	console.log("onload" + Date());
}

function setUser(newUID) {
	uid = newUID;
	
	//pull contactEmail and shouldFilter from server
	$.get(serverURL, {"uid" : uid}, function(data) {
		contactEmail = data["contact_email"];
		shouldFilter = data["filtering"];
	});
}