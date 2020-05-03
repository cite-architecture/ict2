/* Defaults and Globals */

var viewer = null

// "https://www.homermultitext.org/iipsrv?DeepZoom=/project/homer/pyramidal/VenA/"
var defaultServiceUrl = "https://www.homermultitext.org/iipsrv?"
var defaultServiceZoomService = "DeepZoom="
var defaultServicePath = "/project/homer/pyramidal/deepzoom/"
var defaultServiceSuffix = ".tif"
var defaultServiceZoomPostfix = ".dzi"
var defaultLocalpath = "image_archive/"
var defaultThumbWidth = 250;
var defaultFullWidth = 5000;


//var defaultLocalpath = "image_archive/"
//var defaultLocalpath = "image_archive/"


var serviceUrl = defaultServiceUrl
var servicePath= defaultServicePath
var serviceUrlAndPath = serviceUrl + defaultServiceZoomService + servicePath
var imagePath= "";
var serviceSuffix = defaultServiceSuffix
var servicePostfix = serviceSuffix + defaultServiceZoomPostfix


var localPath = defaultLocalpath;
var localSuffix = ".dzi";
var usePath = localPath;
var useSuffix = localSuffix;

var useLocal = false;
var initialLoadDone = false;

var imgUrn = "urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.208,0.2087,0.086,0.0225"
var defaultUrn = "urn:cite2:hmt:vaimg.2017a:VA012RN_0013"

var roiArray = []

/*
Toggles the sidebar button show/hide value
*/
function toggleSidebar(){
  $('#sidebarToggle').val(($('#sidebarToggle').val() == 'Hide') ? 'Show' : 'Hide');
}

/**
 * Draws a preview. Does not seem to be used anymore. DEPRECATED?
 */
 /*
function ict2_drawPreview(osr){
	  var newRoi = rectToRoi(osr)
		if (useLocal){
			getLocalPreview(newRoi)
		} else {
			getRemotePreview(newRoi)
		}
}
*/

/**
 * Distributes the drawing of the preview image to the right function
 * depending on local or remote setting
 * @param  {string} urn the URN we want to draw a preview of
 */
function ict2_drawPreviewFromUrn(urn){
		var newRoi = urn.split("@")[1].trim();
		if (useLocal){
			getLocalPreview(newRoi)
		} else {
			getRemotePreview(newRoi)
		}
}

/**
 * Updates the link the 'Share' button links to.
 * @return {[type]} [description]
 */
function updateShareUrl(){
			var thisUrl = window.location.href.split("?")[0];
			var theseUrns = "";
			var shareUrl = "";
			if (imgUrn == "") {
			} else {
					if (roiArray.length > 0){
						roiArray.forEach( function(r){
							if (theseUrns == ""){
								theseUrns += "?";
							} else {
								theseUrns += "&";
							}
							//theseUrns += "urn=" + imgUrn + "@" + r.roi;
							theseUrns += "urn=" + r.mappedUrn;
						});
					} else {
						theseUrns += "?urn=" + imgUrn;
					}
			}
			shareUrl = thisUrl + theseUrns;
			$("a#ict_shareUrl").attr("href", shareUrl);
			$("a#ict_shareUrl").text("Link to Current State")

      //only update the urlbar if the initial load is done
      if(initialLoadDone){
	       history.pushState(null, '', theseUrns);
	    }
}

/**
 * Gets the local preview using the provided ROI parameter
 * @param  {string} newRoi the ROI of the image
 */
function getLocalPreview(newRoi){

					var rL = newRoi.split(',')[0];
					var rT = newRoi.split(',')[1];
					var rW = newRoi.split(',')[2];
					var rH = newRoi.split(',')[3];


	var plainUrn = imgUrn.split("@")[0];
	var imgId = plainUrn.split(":")[4];
	//var localDir = plainUrn.split(":")[0] + "_" + plainUrn.split(":")[1] + "_" + plainUrn.split(":")[2] + "_" + plainUrn.split(":")[3] + "_/"
	var tempImagePath = getImagePathFromUrn(plainUrn);
	var path = localPath + tempImagePath  + imgId + ".jpg";
	var cvs = document.createElement("canvas");
	cvs.setAttribute("crossOrigin","Anonymous");
	var ctx = cvs.getContext("2d");
	var offScreenImg = document.createElement("img");
	offScreenImg.setAttribute("crossOrigin","Anonymous")
	offScreenImg.setAttribute("src",path);
	offScreenImg.onload = function(){
		cvs.width = (offScreenImg.width * rW);
		cvs.height = (offScreenImg.height * rH);
				// draw it once
		ctx.drawImage(offScreenImg,(0-(offScreenImg.width * rL)),(0-(offScreenImg.height*rT)));
		var s = cvs.toDataURL("image/png");
		$("#image_preview").attr("src",s);

	};
// image_archive/urn_cite2_hmt_vaimg.v1_/VA012RN_0013.jpg
}

/**
 * Creates the SRC attribute for the image used in the preview window using
 * the provided ROI
 * @param  {string} roi the ROI of this image
 */
function getRemotePreview(roi){
	var plainUrn = imgUrn.split("@")[0];
	var imgId = plainUrn.split(":")[4];
	var tempImagePath = getImagePathFromUrn(plainUrn);
	// here
	var linkUrl = serviceUrl + "OBJ=IIP,1.0&FIF=" + servicePath + tempImagePath + imgId + serviceSuffix;
	linkUrl += "&RGN=" + roi + "&wID=" + defaultFullWidth + "&CVT=JPEG";

	$("#full_image_link").attr("href",linkUrl);
	var u = serviceUrl + "OBJ=IIP,1.0&FIF=" + servicePath + tempImagePath + imgId + serviceSuffix;
	u += "&RGN=" + roi + "&wID=" + defaultThumbWidth + "&CVT=JPEG";
	$("#image_preview").attr("src",u);
}



/**
 * Main entry point of the program.
 */
jQuery(function($){

	var paramUrn = get("urn");


	if (paramUrn === undefined ){
		imgUrn = defaultUrn;
		paramUrn = defaultUrn;
	} else {
		imgUrn = paramUrn;
	}
//	console.log("calling updateShare from jQuery")
//	updateShareUrl();

	setUpUI()


	initOpenSeadragon()

  $('#sideBarItself').drags();
});

/* Initiatlize OpenSeadragon viewer with guides, selection, and pre-load any urn */
function initOpenSeadragon() {
  initialLoadDone = false;

		if (viewer != null){
				viewer.destroy();
				viewer = null
		}

	viewer = OpenSeadragon({
		id: 'image_imageContainer',
		prefixUrl: 'css/images/',
		crossOriginPolicy: "Anonymous",
		defaultZoomLevel: 1,
		tileSources: getTileSources(imgUrn),
		// tileSources: 'https://www.homermultitext.org/iipsrv?DeepZoom=/project/homer/pyramidal/VenA/VA012RN_0013.tif.dzi',
		minZoomImageRatio: 0.1, // of viewer size
		immediateRender: true
	});



	viewer.addHandler('full-screen', function (viewer) {
		refreshRois();
	})


	// Guides plugin
	viewer.guides({
		allowRotation: false,        // Make it possible to rotate the guidelines (by double clicking them)
		horizontalGuideButton: null, // Element for horizontal guideline button
		verticalGuideButton: null,   // Element for vertical guideline button
		prefixUrl: "css/images/",             // Images folder
		removeOnClose: false,        // Remove guidelines when viewer closes
		useSessionStorage: false,    // Save guidelines in sessionStorage
		navImages: {
			guideHorizontal: {
				REST: 'guidehorizontal_rest.png',
				GROUP: 'guidehorizontal_grouphover.png',
				HOVER: 'guidehorizontal_hover.png',
				DOWN: 'guidehorizontal_pressed.png'
			},
			guideVertical: {
				REST: 'guidevertical_rest.png',
				GROUP: 'guidevertical_grouphover.png',
				HOVER: 'guidevertical_hover.png',
				DOWN: 'guidevertical_pressed.png'
			}
		}
	});

	//selection plugin
	selection = viewer.selection({
		restrictToImage: true,
		onSelection: function(rect) {
			createROI(rect);
			//addRoiOverlay()
		}
	});


	// Openseadragon does not have a ready() function, so here we are…
	setTimeout(function(){
			loadDefaultROI(imgUrn);
      initialLoadDone = true;
	},2000);

}

/**
 * Called after Openseadragon has initialized (currently set to two seconds
 * magic interval). Loads the default image. This method is also Called
 * when the user presses the Change Image button.
 * @param  {string} imgUrn the urn of the default image
 */
function loadDefaultROI(imgUrn){
	tempArray = roiArray;
	roiArray = []
	
	if (tempArray.length > 0){
		tempArray.forEach(function(i){
			var newRoi = i;
			var newGroup = getGroup(roiArray.length+1);
			var newUrn = imgUrn.split("@")[0] + "@" + i;
			var roiObj = {
				index: roiArray.length,
				roi: newRoi,
				mappedUrn: newUrn,
				group: newGroup.toString()};
			roiArray.push(roiObj);
			addRoiOverlay(roiObj);
			addRoiListing(roiObj);
		});
		updateShareUrl();
	}

}

/**
 * Creates a ROI from the selection rect created by Openseadragon.
 * @param  {Rectangle} rect rectangular object (the selection)
 */
function createROI(rect){
	var newRoi = rectToRoi(rect);
	var newUrnStripped = imgUrn.split("@")[0]
	var newUrn = newUrnStripped + "@" + newRoi;
	var newGroup = getGroup(roiArray.length+1);
	var roiObj = {index: roiArray.length, roi: newRoi, mappedUrn: newUrn, group: newGroup.toString()};
	roiArray.push(roiObj);
	addRoiOverlay(roiObj);
	addRoiListing(roiObj);
	updateShareUrl();
}

/**
 * Converts a rectangle object into a ROI we can use in a URN
 * @param  {Rectangle} rect a rectangle object.
 * @return {string}   a string that describes the rectangle in percentages
 */
function rectToRoi(rect){
	var normH = viewer.world.getItemAt(0).getBounds().height;
	var normW = viewer.world.getItemAt(0).getBounds().width;
	roiRect = viewer.viewport.imageToViewportRectangle(rect);
	var rl = roiRect.x / normW;
	var rt = roiRect.y / normH;
	var rw = roiRect.width / normW;
	var rh = roiRect.height / normH;
	var newRoi = rl.toPrecision(4) + "," + rt.toPrecision(4) + "," + rw.toPrecision(4) + "," + rh.toPrecision(4);
	return newRoi;
}

/**
 * Adds a listing to the preview panel using the provided ROI object
 * that contains all the data.
 * @param {Object} roiObj Contains all the necessary data to construct the listing
 */
function addRoiListing(roiObj){
		// image_urnList
		var idForListing = idForMappedUrn(roiObj.index);
		var idForRect = idForMappedROI(roiObj.index);
		var groupClass = "image_roiGroup_" + roiObj.group;
		var deleteLink = "<a class='deleteLink' title='delete urn' id='delete" + idForListing + "' data-index='" + roiObj.index + "'></a>";
		var copyLink = "<a class='copyLink' title='copy urn' id='copyUrn" + idForListing + "'></a>";
		var mappedUrnSpan = "<li class='" + groupClass + "' id='" + idForListing + "'>";
		mappedUrnSpan += deleteLink + copyLink + roiObj.mappedUrn + "</li>";
		$("#image_urnList").append(mappedUrnSpan);
		// <a class="image_deleteUrn">✖︎</a>
		$("li#" + idForListing ).on("click",function(){
			if ( $(this).hasClass("image_roiGroupSelected")){
				removeAllHighlights();
			} else {
				removeAllHighlights();
				$(this).addClass("image_roiGroupSelected");
				var rectId = urnToRoiId(this.id);
					// !!!! Update preview here!
				ict2_drawPreviewFromUrn(  $("#" + rectId ).data("urn"))	;
				$("#"+rectId).addClass("image_roiGroupSelected");
			}
		});

		$("a#copyUrn" + idForListing).on("click", function(){
			var copyText = $("#" + idForListing).text();
			//$("#" + idForListing).createTextRange();
			var textArea = document.createElement("textarea");
		  textArea.style.position = 'fixed';
		  textArea.style.top = 0;
		  textArea.style.left = 0;
		  textArea.style.width = '2em';
		  textArea.style.height = '2em';
		  textArea.style.padding = 0;
		  textArea.style.border = 'none';
		  textArea.style.outline = 'none';
		  textArea.style.boxShadow = 'none';
		  textArea.style.background = 'transparent';
		  textArea.value = copyText;
		  document.body.appendChild(textArea);
		  textArea.select();
		  try {
			    var successful = document.execCommand('copy');
			    var msg = successful ? 'successful' : 'unsuccessful';
			    console.log('Copying text command was ' + msg);
		  } catch (err) {
			    console.log('Oops, unable to copy');
		  }
			  document.body.removeChild(textArea);
		});

		$("a#delete"+idForListing).on("click",function(){
				var tid = $(this).prop("id")
				var i = tid.replace("deleteimage_mappedUrn_","")
				deleteRoi(parseInt(i))
		});
}

/**
 * Removes the ROI specified by the parameter from the list of saved URNS
 * @param  {int} c index of the removed ROI
 */
function deleteRoi(c){
	var tempArray = []
	for (i = 0; i < roiArray.length; i++){
		if (i != c){
			tempArray.push(roiArray[i]);
		}
	}
	clearJsRoiArray()
	for (i = 0; i < tempArray.length; i++){
	 var newGroup = getGroup(i+1);
	 var roiObj = {index: i, roi: tempArray[i].roi, mappedUrn: tempArray[i].mappedUrn, group: newGroup.toString()};
		roiArray.push(roiObj);
		addRoiOverlay(roiArray[i]);
		addRoiListing(roiArray[i]);
	}
	updateShareUrl();
}

/**
 * Removes all ROI overlays and adds them immediately afterwards
 */
function refreshRois(){
	var tempArray = [];
	for (i = 0; i < roiArray.length; i++){
		tempArray.push(roiArray[i]);
	}
	clearJsRoiArray()
	for (i = 0; i < tempArray.length; i++){
	 var newGroup = getGroup(i+1);
	 var roiObj = {index: i, roi: tempArray[i].roi, mappedUrn: tempArray[i].mappedUrn, group: newGroup.toString()};
		roiArray.push(roiObj);
		addRoiOverlay(roiArray[i]);
		addRoiListing(roiArray[i]);
	}
}

/**
 * Returns a URL parameter with the provided name and parses it into the ROI
 * array
 * @param  {string} name the name of the URL parameter
 * @return the value of the URL parameter
 */
function get(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))

	var query = window.location.search.substring(1);
	if (query != undefined){
	  var vars = query.split("&");
		vars.forEach(function(v){
			if(v.length > 0){
				if (v.split("=")[1].split("@").length > 1){
					roiArray.push(v.split("=")[1].split("@")[1].split("%")[0]);
				}
			}
		});
	}
	if (name != undefined) {
		return decodeURIComponent(name[1]);
	} else {
		return undefined;
	}
}

/**
 * Adds a new ROI overlay using the provided ROI object
 * @param {Object} roiObj   the object that contains the data needed to create
 *                          the overlay for this ROI
 */
function addRoiOverlay(roiObj){
	var normH = viewer.world.getItemAt(0).getBounds().height;
	var normW = viewer.world.getItemAt(0).getBounds().width;
	var roi = roiObj.roi;
	var rl = +roi.split(",")[0];
	var rt = +roi.split(",")[1];
	var rw = +roi.split(",")[2];
	var rh = +roi.split(",")[3];
	var tl = rl * normW;
	var tt = rt * normH;
	var tw = rw * normW;
	var th = rh * normH;
	var osdRect = new OpenSeadragon.Rect(tl,tt,tw,th);
	var elt = document.createElement("a");
	elt.id = idForMappedROI(roiObj.index);
	elt.className = "image_mappedROI" + " image_roiGroup_" + roiObj.group + " " + idForMappedUrn(roiObj.index);
	elt.dataset.urn = roiObj.mappedUrn;

	viewer.addOverlay(elt,osdRect);

	$("a#" + elt.id ).on("click",function(){
		if ( $(this).hasClass("image_roiGroupSelected")){
			removeAllHighlights();
		} else {
			removeAllHighlights();
			$(this).addClass("image_roiGroupSelected");
			ict2_drawPreviewFromUrn( $(this).data("urn") );
			var liId = roiToUrnId(this.id);
			$("li#"+liId).addClass("image_roiGroupSelected");
		}
	});
}

/**
 * Removes all the Highlights from the site
 */
function removeAllHighlights(){
	 	for (i = 0; i < roiArray.length; i++){
			var liId = idForMappedUrn(i)
			var rectId = idForMappedROI(i)
			$("li#"+liId).removeClass("image_roiGroupSelected");
			$("a#"+rectId).removeClass("image_roiGroupSelected");
		}
}

/**
 * Clears all the ROI from the Array and empties the preview window
 */
function clearJsRoiArray() {
	for (i = 0; i < roiArray.length; i++){
		var tid = "image_mappedROI_" + i
		viewer.removeOverlay(tid)
		//$("a#" + tid).remove()
	}
	roiArray = [];
	$("#image_urnList").empty();
	$("#image_preview").attr("src","");
}

/**
 * Returns the URN with ID for the specific index
 * @param  {int} i ROI index
 * @return {string}   URN with ID
 */
function idForMappedUrn(i) {
	var s = "image_mappedUrn_" + (i)
	return s
}

/**
 * Returns the ROI with ID for the specific index
 * @param  {int} i ROI index
 * @return {string}   ROI with ID
 */
function idForMappedROI(i) {
	var s = "image_mappedROI_" + (i)
	return s
}

/**
 * Converts a ROI with id to URN with id
 * @param  {string} id ROI with ID
 * @return {string}    URN with ID
 */
function roiToUrnId(id) {
	var s = id.replace("image_mappedROI_","image_mappedUrn_")
	return s
}

/**
 * Converts a URN with id to ROI with id
 * @param  {string} id URN with ID
 * @return {string}    ROI with ID
 */
function urnToRoiId(id) {
	var s = id.replace("image_mappedUrn_","image_mappedROI_")
	return s
}

/**
 * Normalizes the index of the ROI to a number within the given amount of
 * colors. E.g. If there were only two colors, an index of 4 would return group
 * number 0 => (index % colorLength)
 * @param  {int} i index number
 * @return {int} normalized group number
 */
function getGroup(i){
	var colorArray = ["#f23568", "#6d38ff", "#38ffd7", "#fff238", "#661641", "#275fb3", "#24a669", "#a67b24", "#ff38a2", "#194973", "#35f268", "#7f441c", "#801c79", "#2a8ebf", "#216616", "#d97330", "#da32e6", "#196d73", "#bdff38", "#bf3e2a", "#3d1973", "#30cdd9", "#858c1f", "#661616"	];
	var limit = colorArray.length
  var rv = i % limit;
	return rv;
}

/**
 * Reloads the Image by clearing all ROI and
 * reinitializing OpenSeadragon
 */
function reloadImage(){
	clearJsRoiArray();
	initOpenSeadragon();
}

/**
 * Creates all Event handlers using JQuery and sets
 * the initial state of the UI on document load
 */
function setUpUI() {
	$("div#serverConfigs").hide()
	$("div#localConfigs").show()
	$("#browse_onoffswitch").prop("checked",useRemoteByDefault)
	$("input#image_serverUrlBox").prop("value",serviceUrl)
	$("input#image_serverUrlPathBox").prop("value",servicePath)
	//$("input#image_serverSuffixBox").prop("value",serviceSuffix)
	$("input#image_localPathBox").prop("value",localPath)

	$("button#image_changeUrn").on("click", function(){
			var newUrn = $("input#image_urnBox").prop("value").trim()
			imgUrn = newUrn
			updateShareUrl();
			reloadImage();
	});

  //Handlers for all the configuration fields
	$("input#image_serverUrlBox").change(function(){
			serviceUrl = $(this).prop("value");
      serviceUrlAndPath = serviceUrl + defaultServiceZoomService + servicePath
	});
	$("input#image_serverUrlPathBox").change(function(){
			servicePath = $(this).prop("value");
      serviceUrlAndPath = serviceUrl + defaultServiceZoomService + servicePath
			usePath = serviceUrlAndPath;
	});
	$("input#image_serverSuffixBox").change(function(){
			serviceSuffix = $(this).prop("value");
			servicePostfix = serviceSuffix + defaultServiceZoomPostfix;
		  useSuffix = servicePostfix
	});
	$("input#image_localPathBox").change(function(){
			localPath = $(this).prop("value")
			usePath = localPath;
	});

  //set the value of the image_urnBox to the imgUrn value

	$("input#image_urnBox").prop("value",imgUrn.split("@")[0])

	console.log($("#browse_onoffswitch").prop("checked"));

  // Make sure we're starting correctly
	if ( $("#browse_onoffswitch").prop("checked") ){
		useLocal = false
		usePath = serviceUrlAndPath
		useSuffix = servicePostfix
		$("div#serverConfigs").show()
		$("div#localConfigs").hide()
	} else {
		useLocal = true
		usePath = localPath
		useSuffix = localSuffix
		$("div#serverConfigs").hide()
		$("div#localConfigs").show()
	}

  //Handler for the remote/local switch
	$("#browse_onoffswitch").on("click", function(){
			if ( $(this).prop("checked") ){
				useLocal = false
				usePath = serviceUrlAndPath
				useSuffix = servicePostfix
				$("div#serverConfigs").show()
				$("div#localConfigs").hide()
				reloadImage()
			} else {
				useLocal = true
				usePath = localPath
				useSuffix = localSuffix
				$("div#serverConfigs").hide()
				$("div#localConfigs").show()
				reloadImage()
			}
	});
}

/**
 * Returns an Image Path from the given URN.
 * @param  {string} urn the urn to analyse
 * @return {string}     the Image Path
 */
function getImagePathFromUrn(urn){
	var ns  = urn.split(":")[2];
	var collectionAndVersion = urn.split(":")[3];
	var collection = collectionAndVersion.split(".")[0];
	var version = collectionAndVersion.split(".")[1];
	var tempPath = ns + "/" + collection + "/" + version + "/";
	return tempPath
}

/**
 * Returns the Tilesource for the given Image URN
 * @param  {string} imgUrn the URN of the Image
 * @return {string}       the URL of the TileSource
 */
function getTileSources(imgUrn){
	var plainUrn = imgUrn.split("@")[0]
	var imgId = plainUrn.split(":")[4]
	imagePath = getImagePathFromUrn(plainUrn);
	var ts = ""
	if (useLocal){
		//var localDir = plainUrn.split(":")[0] + "_" + plainUrn.split(":")[1] + "_" + plainUrn.split(":")[2] + "_" + plainUrn.split(":")[3] + "_/"
		ts = usePath + imagePath + imgId + useSuffix
	} else {
		ts = usePath + imagePath + imgId + useSuffix
	}
	return ts
}
