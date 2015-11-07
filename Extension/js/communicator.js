$(document).ready(function() {	
	$('#filterSwitch').click(function() {
	    if (!$(this).is(':checked')) {			
		    alert("unchecked");
	    } else {
			alert("checked");
		}
	});
	
	$("#contactEmail").onchange(function() {
		console.log("changed");
	});
});