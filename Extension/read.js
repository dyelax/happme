//document.body.style.background = 'yellow';

//get innertext
//function changeDivs(){
//	$("._1dwg").ready(function() {
//		$("._1dwg").css("background", "red");
//		alert("here!");
//	});
//}

// get whole html of page
function getHTML(){
    return document.body.outerHTML;
}

var posts = [];
var postedText = [];
var userID = "mattjcoop";

var showAlertTimeout = null;

$(window).load(function(){
	// var userURL = $("._36he").attr("href");
	// if (userURL != null) {
	// 	userID = userURL.substr(25, userURL.indexOf("?") - 25);//cut off facebook domain and GET info.
	// }
	
//	setUser(userID);
	
	scanFeed();
});

$(window).scroll(function() {
	scanFeed();
});

function scanFeed(){
	$("._5v3q").each(function() {//each timeline post
		var post = {};
		var type = "";
		var ID = "";
		var postText = "";
		var commentText = "";

		var types = ["posts", "comments", "videos", "photos", "permalink"];//more?
		$(this).find("._5pcq").each(function() {//get type and ID from permalink
			//should only be one
			link = $(this).attr("href");

			linkElements = link.split("/");
			for (var i = 0; i < linkElements.length; i++) {
				if ($.inArray(linkElements[i], types) >= 0) {
					type = linkElements[i];
					if (i < linkElements.length - 1) {
						ID = linkElements[i+1];
					}
				}
			}
		});
		$(this).find("._5pbx").each(function() {//get main post text
			//should only be one
			$(this).find("p").each(function() {
				postText += cleanHTML($(this).html())+" ";
			});
		});
		$(this).find(".UFICommentBody").each(function() {//get comment text
			$(this).find("span").each(function() {//should only be one
				commentText += cleanHTML($(this).html())+". ";
			});
		});

		var triggers = "";
		var num_found = 0;

		function doNextThing() {
			if (type !== "" && ID !== "" && postText !== "" && $.inArray(postText+commentText, postedText) < 0) {	
				post["uid"] = userID;
				
				var filtering;
				console.log("A");
				chrome.storage.sync.get("shouldFilter", function(object) {
					console.log("B");
					
					filtering = object["shouldFilter"];
					post["filtering"] = filtering;
					post["triggers"] = triggers;
					// post["post_type"] = type;
	//				post["post_ID"] = ID;
					post["contents"] = {"post" : postText, "comment" : commentText};

					var serverURL = "https://happme.azurewebsites.net/record_story";

					$.ajax({
						type: "POST",
						url: serverURL,
						headers: {"Content-Type": "application/json"},
						data: JSON.stringify(post),
						success: function(data) {
							console.log(data);

							if (data["prompt"]) {
								if (showAlertTimeout != null) {
									window.clearTimeout(showAlertTimeout);
								}
								showAlertTimeout = window.setTimeout(function() {
									alert("Your news feed is more negative than average. This may be aversely affecting your mood. Consider turning on \"Filter Feed\" to make your feed a happier place!");
								}, 1000);
							}

							if (filtering && data["remove"]) {
								blockByTypeAndID(type, ID);
							}
						}
					});

					postedText.push(postText+commentText);
					posts.push(post);
				});
				
			}
		}

		chrome.storage.sync.get("profanity", function(object) {
			if (object["profanity"]) {
				triggers += "profanity" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
		chrome.storage.sync.get("ptsd", function(object) {
			if (object["ptsd"]) {
				triggers += "ptsd" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
		chrome.storage.sync.get("drugUse", function(object) {
			if (object["drugUse"]) {
				triggers += "drugUse" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
		chrome.storage.sync.get("sexualAssault", function(object) {
			if (object["sexualAssault"]) {
				triggers += "sexualAssault" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
		chrome.storage.sync.get("childAbuse", function(object) {
			if (object["childAbuse"]) {
				triggers += "childAbuse" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
		chrome.storage.sync.get("self-harm", function(object) {
			if (object["self-harm"]) {
				triggers += "self-harm" + ","
			}
			num_found++;
			if (num_found == 6) {
				doNextThing();
			}
		});
	});
	
//	console.log(posts);
}

//Text cleaning
function cleanHTML(html) {
	var cleanText = removeElements(html, "a");
	cleanText = removeElements(cleanText, "br");
	cleanText = removeElements(cleanText, "span");
	cleanText = removeElements(cleanText, "i");
	cleanText = removeElements(cleanText, "u");
	return cleanText;
}
function removeElements(text, selector) {
    var wrapped = $("<div>" + text + "</div>");
    wrapped.find(selector).remove();
    return wrapped.html();
}