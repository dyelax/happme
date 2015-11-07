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

$(window).scroll(function() {
	$("._5pbx").find("p").each(function() {
		console.log($(this).html());
		posts += $(this).html();
	});
});