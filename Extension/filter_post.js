
var real_image;
var real_content = [];

/*
blocks image and replaces with replacement image
*/
function blockImage(id, replacementImage) {
	var id_and_class = id + "._4ikz";
	// _5cq3 a img contains user posted image
	$(id_and_class).find("._5cq3 a img").attr("src", replacementImage);
	// make sure to sent height and width of replacement content
}

/*
blocks advertisement image, replaces with replacement images
*/
function blockAddImage(id, replacementImage) {
	var id_and_class = id + "._4ikz";
	// _5cq3 a img contains user posted image
	$(id_and_class).find(".uiScaledImageContainer._6m5 img").attr("src", replacementImage);
}

/*
replaces user text content with replacement content 
*/
function blockUserContent(replacementContent) {
	// get and save real content
	var id_and_class = "._4ikz";
	// _5pbx userContent contains content
	$(id_and_class).find("._5pbx.userContent p").text(replacementContent);
}

function blockByID(id) {
	var id_string = "#" + id; // create id string for search
	$(window).scroll(function() {
		$("._4ikz").ready(function() {//each timeline post
			blockImage(id_string, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg");
			blockAddImage(id_string, "https://upload.wikimedia.org/wikipedia/commons/c/c7/Puppy_on_Halong_Bay.jpg");
			blockUserContent("BLOCKED content");
		});
	});
}



blockByID("substream_0");

