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
var userID = "";

$(window).load(function(){
	var userURL = $("._36he").attr("href");
	userID = userURL.substr(25, userURL.indexOf("?") - 25);//cut off facebook domain and GET info.
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

		if (type !== "" && ID !== "" && postText !== "" && $.inArray(postText+commentText, postedText) < 0) {	
			post["uid"] = userID;
			
			var filtering;
			console.log("A");
			chrome.storage.sync.get("shouldFilter", function(object) {
				console.log("B");
				
				filtering = object["shouldFilter"];
				post["filtering"] = filtering;
//				post["post_type"] = type;
//				post["post_ID"] = ID;
				post["contents"] = {"post" : postText, "comment" : commentText};

				var serverURL = "https://happme.azurewebsites.net/record_story";
//				console.log(JSON.stringify(post));
//				$.post(serverURL, JSON.stringify(post), function(data, textStatus) {
//					console.log("Response Data: "+data);
//
//					blockByTypeAndID(type, ID);
//				}, "application/json");
//				
				$.ajax({
					type: "POST",
					url: serverURL,
					headers: {"Content-Type": "application/json"},
					data: JSON.stringify(post),
					success: function(data) {
						console.log(data);

						if (filtering && data["remove"]) {
							blockByTypeAndID(type, ID);
						}
					}
				});

				postedText.push(postText+commentText);
				posts.push(post);
			});
			
		}
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