//document.body.style.background = 'yellow';

//get innertext
function getText(){
	    $("._1dwg").ready(function() {
	    	$("._1dwg").css("background", "red");
	    	alert("here!");
	    });
	
}

// get whole html 
function getHTML(){
    return document.body.outerHTML;
}
setTimeout(getText(), 5000);
           //Gives you all the text on the page
//alert(getHTML());             //Gives you the whole HTML of the page
