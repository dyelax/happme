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

function generateNewContent() {
	q = "puppy"; // search query
	
	request = new XMLHttpRequest;
	request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			//document.getElementById("giphyme").innerHTML = '<center><img src = "'+data+'"  title="GIF via Giphy"></center>';
			return data;
		} else {
			console.log('reached giphy, but API returned an error');
		 }
	};

	request.onerror = function() {
		console.log('connection error');
	};

	request.send();
}

function blockContent() {
	$(".userContentWrapper._5pcr").ready(function() {
		$(".userContentWrapper._5pcr").css("display", "none");
		data = generateNewContent();
		// creates new post to be inserted in place
		newContent = '<div class="userContentWrapper _5pcr" id="inserted" role="article" aria-label="Story">\
	<div class="_1dwg">\
		<div class="clearfix _5x46">\
			<div class="_38vo">\
				<img class="_s0 _5xib _5sq7 _44ma _rw img" src="http://s11.postimg.org/tlol7z1f7/puppy_Logo.png" height="40" width="40" alt>\
			</div>\
			<div class="_3dp _29k">\
				<div class="_6a">\
					<div class="_6a _6b">\
						<h5 class="_5pbw" data-ft="{"tn":"C"}" id="js_31">\
							<span class="fwn fcg">\
								<span class="fwb">\
									<a class="profileLink">Happme</a>\
								</span>\
							</span>\
						</h5>\
					</div>\
				</div>\
			</div>\
			</div>\
			<div class="_5pbx userContent" data-ft="{"tn":"K"}" id="js_33">\
				<a id="myLink" href="#">Click here to reveal blocked content.</a>\
			</div>\
			<div class="_3x-2">\
				<div data-fit="{"tn":"H"}">\
					<div class="mtm">\
						<div class="_5cq3" data-ft="{"tn":"E"}">\
							<div class="_46-h _4-ep" style="width:470px;height:352px;" id="u_jsonp_3_u">\
								<img class="_46-i img" src=""' + data + 'style="left:-5px; top:0px;" width="472" height="315">\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>'
	$("._3ccb").append(newContent);
	$("#myLink").click(function() {revealBlockedContent(); return false;}); 
	});
}