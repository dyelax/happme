/*array of idstr*/
var blockedIDs = [];

var newContent = '<div class="userContentWrapper _5pcr" id="inserted" role="article" aria-label="Story">\
	<div class="_1dwg">\
		<div class="clearfix _5x46">\
			<a class="_5pb8 _29h _303" aria-hidden="true" tabindex="-1" data-fn="{"tn":"m"}">\
			<div class="_38vo">\
				<img class="_s0 _5xib _5sq7 _44ma _rw img" src="http://s11.postimg.org/tlol7z1f7/puppy_Logo.png" height="40" width="40" alt>\
			</div>\
			</a>\
			<div class="_3dp _29k">\
				<div class="_6a">\
					<div class="_6a _6b">\
						<h5 class="_5pbw" data-ft="{"tn":"C"}" id="js_31">\
							<span class="fwn fcg">\
								<span class="fcg">\
									<span class="fwb">\
										<a class="profileLink" data-ft="{"tn":"l"}" aria-owns="js_28" aria-describedby="js_29">Happme</a>\
									</span>\
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
								<img class="_46-i img" src="http://i.giphy.com/pX8D09atj822I.gif" style="left:-5px; top:0px;" width="472" height="315">\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>'

/**
reveals content that has been blocked
needs to incorporate
*/
function revealBlockedContent(curr_page) {
	// set display to none of current inserted html
	$(curr_page).find("#inserted").remove();
	// get the closest parent and set display to inline
	$(curr_page).find(".userContentWrapper._5pcr").css("display", "inline");
}

/*
inputs an id, blocks content with id
and type and blocks posts that match this id and type
*/
function blockByTypeAndID(type, id) {
	var id_string = type + "/"  + id; // create id string for search
	// on load look to see if contains the id_string to block
	$(window).load(function() {
		$("._5v3q").each(function() {
			var curr_page = this;
			// go in and find this part
			$(this).find("._5pcq").each(function() {
				// looks to see if this ._5v3q contains the type/id
				if ($(this).attr("href").indexOf(id_string) > -1 ) {
					// only do this if not in array
					if ($.inArray(id_string, blockedIDs) == -1) {
							// get the closest and set display to none
						$(this).closest(".userContentWrapper._5pcr").css("display", "none");
						// append new content
						$(this).closest("._3ccb").append(newContent);
						// set function to link
						$("#myLink").click(function() {revealBlockedContent(curr_page); return false;}); 
						blockedIDs.push(id_string); // add to list of blockedIDs
					}	
				}
			});
		});
	});
	// check to make sure when scrolling ok
	$(window).scroll(function() {
		$("._5v3q").each(function() {
			var curr_page = this;
			// go in and find this part
			$(this).find("._5pcq").each(function() {
				// looks to see if this ._5v3q contains the type/id
				if ($(this).attr("href").indexOf(id_string) > -1 ) {
					// only do this if not in array
					if ($.inArray(id_string, blockedIDs) == -1) {
							// get the closest and set display to none
						$(this).closest(".userContentWrapper._5pcr").css("display", "none");
						// append new content
						$(this).closest("._3ccb").append(newContent);
						// set function to link
						$("#myLink").click(function() {revealBlockedContent(curr_page); return false;}); 
						blockedIDs.push(id_string); // add to list of blockedIDs
					}	
				}
			});
		});
	});
}

// just some blocks for testing
blockByTypeAndID("posts", "10205805439035045");
blockByTypeAndID("posts", "975588315818234");
blockByTypeAndID("posts", "1093232884029780"); // ali
blockByTypeAndID("posts", "10203609883647759"); //max
///maxluzuriaga/posts/10203609883647759

