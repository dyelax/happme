$(document).ready(function() {	
	$('#filterSwitch').click(function() {
	    if ($(this).is(":checked")) {			
		    console.log("checked");
	    } else {
			console.log("unchecked");
		}
		
		var testInfo = {"UID" : 1, "checked": $(this).checked}
		$.post("url", testInfo, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
	});
	
	$("#contactEmail").change(function() {
		//test post
		var testInfo = {"UID" : 1, "contact": $(this).val}
		$.post("url", testInfo, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
		console.log("changed");
	});
});