var uid;
var contactEmail = "";
var shouldFilter = false;
var serverURL = "https://happme.azurewebsites.net/";

$(document).ready(function() {			
	chrome.storage.sync.get("contactEmail", function(object) {
		console.log(object);
		contactEmail = object["contactEmail"];
		getShouldFilter();
	});
		
	$("#triggers li input").click(function() {
		saveTriggers();
	});
	$('#filterSwitch').click(function() {
	    if ($(this).is(":checked")) {			
		    console.log("checked");
	    } else {
			console.log("unchecked");
		}
		
		url = serverURL + "";
		var info = {"uid" : uid, "checked": $(this).is(":checked")}
		$.post(url, info, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
		
		chrome.storage.sync.set({"shouldFilter" : $(this).is(":checked")}, function() {
			console.log("Successfully stored filter");
		});
	});
	
	$("#contactEmail").change(function() {
		url = serverURL + "change_contact";
		var info = {"uid" : "mattjcoop", "contact_email": $(this).val()}
		$.post(url, info, function(data, textStatus) {
			console.log("Response Data: "+data);
		});
		console.log("changed");
		
		chrome.storage.sync.set({"contactEmail" : $(this).val()}, function() {
			console.log("Successfully stored contact email");
		});
	});
});

function getShouldFilter(){
	chrome.storage.sync.get("shouldFilter", function(object) {
		console.log("filter:");
		console.log(object);
		shouldFilter = object["shouldFilter"];
		
		getTriggers();
	});
}

function getTriggers() {
	getProfanity();
}
function getProfanity(){
	chrome.storage.sync.get("profanity", function(object) {
		$("#profanity").prop("checked", object["profanity"]);
		getPTSD();
	}); 
}
function getPTSD(){
	chrome.storage.sync.get("ptsd", function(object) {
		$("#PTSD").prop("checked", object["ptsd"]);
		getDrugUse();
	}); 
}
function getDrugUse(){
	chrome.storage.sync.get("drugUse", function(object) {
		$("#drugUse").prop("checked", object["drugUse"]);
		getSexualAssault();
	}); 
}
function getSexualAssault(){
	chrome.storage.sync.get("sexualAssault", function(object) {
		$("#sexualAssault").prop("checked", object["sexualAssault"]);
		getChildAbuse();
	}); 
}
function getChildAbuse(){
	chrome.storage.sync.get("childAbuse", function(object) {
		$("#childAbuse").prop("checked", object["childAbuse"]);
		getSelfharm();
	}); 
}
function getSelfharm(){
	chrome.storage.sync.get("self-harm", function(object) {
		$("#self-harm").prop("checked", object["self-harm"]);
		setupPopup();
	}); 
}

function saveTriggers() {
//	$("#triggers ul li input").each(function() {
//		var name = $(this).attr("name");
//		var isChecked = $(this).is(":checked");
//		
//		console.log(isChecked);
//		var info = {};
//		info[name] = isChecked;
//		chrome.storage.sync.set(info, function() {
//			console.log("set checked for "+ name +" successful.");
//		});
//	});
	
	chrome.storage.sync.set({"profanity" : $("#profanity").is(":checked")}, function() {
		console.log("success");
	});
	chrome.storage.sync.set({"ptsd" : $("#PTSD").is(":checked")}, function() {
		console.log("success");
	});
	chrome.storage.sync.set({"drugUse" : $("#drugUse").is(":checked")}, function() {
		console.log("success");
	});
	chrome.storage.sync.set({"sexualAssault" : $("#sexualAssault").is(":checked")}, function() {
		console.log("success");
	});
	chrome.storage.sync.set({"childAbuse" : $("#childAbuse").is(":checked")}, function() {
		console.log("success");
	});
	chrome.storage.sync.set({"self-harm" : $("#self-harm").is(":checked")}, function() {
		console.log("success");
	});
							
}

function setupPopup() {
	$("#contactEmail").val(contactEmail);
	$("#filterSwitch").prop("checked", shouldFilter);
	
	if (!contactEmail) {
		contactEmail = "";
	}
}

window.onload = function() {
	console.log("onload" + Date());
}

function setUser(newUID) {
	uid = "mattjcoop";
}