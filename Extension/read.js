//document.body.style.background = 'yellow';

//get innertext
function changeDivs(){
	$("._1dwg").ready(function() {
		$("._1dwg").css("background", "red");
		alert("here!");
	});
}

// get whole html 
function getHTML(){
    return document.body.outerHTML;
}

//Gives you all the text on the page
//console.log(getHTML());             //Gives you the whole HTML of the page

//._5pbx .userContent -> p

var posts = [];
var postedText = [];

$(window).scroll(function() {
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
		$(this).find(".UFICommentBody").each(function() {//get main post text
			$(this).find("span").each(function() {//should only be one
				commentText += cleanHTML($(this).html())+" ";
			});
		});
		
		console.log("type: "+type);
		console.log("ID  : "+ID);
		console.log("post: "+postText);
		console.log("comments: "+commentText)
		
		if (type !== "" && ID !== "" && postText !== "" && $.inArray(postText+commentText, postedText) < 0) {
			console.log("SUCCESS");
			
			post["type"] = type;
			post["ID"] = ID;
			post["text"] = postText;
			post["comment"] = commentText;
			
//			console.log("type: "+type);
//			console.log("ID  : "+ID);
//			console.log("post: "+postText);
//			console.log("comments: "+commentText)
//			console.log("");
			
			posts.push(post);
			postedText.push(postText+commentText);
		}
		console.log("");
	});
	
	console.log(posts);
	
//	$("._5pbx").find("p").each(function() {
//		var cleanText = cleanHTML($(this).html());
//		console.log(cleanText);
//		posts += cleanText;
//	});
});
//get link (use as ID) from ._5pcq -> href.

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