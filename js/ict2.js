/* efaults and Globals */

var viewer = null

// "http://www.homermultitext.org/iipsrv?DeepZoom=/project/homer/pyramidal/VenA/"
var defaultServiceUrl = "http://www.homermultitext.org/iipsrv?"
var defaultServiceZoomService = "DeepZoom="
var defaultServicePath = "/project/homer/pyramidal/deepzoom/"
var defaultServiceSuffix = ".tif"
var defaultServiceZoomPostfix = ".dzi"
var defaultLocalpath = "image_archive/"
var defaultThumbWidth = 250;


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

var imgUrn = "urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.208,0.2087,0.086,0.0225"
var defaultUrn = "urn:cite2:hmt:vaimg.2017a:VA012RN_0013"

var roiArray = []

//var tsrc = getTileSource

/*
file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2360,0.4256,0.1149,0.08157

file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4044,0.3720,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2360,0.4256,0.1149,0.08157

file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705

file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013

file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html


http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4044,0.3720,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013@0.2518,0.2893,0.2640,0.09705

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012RN_0013

http://www.homermultitext.org/ict2/index.html

urn:cite2:hmt:vaimg.2017a:VA012VN_0514


http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4044,0.3720,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.2518,0.2893,0.2640,0.09705

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514

http://www.homermultitext.org/ict2/index.html

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4044,0.3720,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2799,0.4514,0.1334,0.08056 &urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2360,0.4256,0.1149,0.08157

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2518,0.2893,0.2640,0.09705

http://www.homermultitext.org/ict2/index.html?urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano

http://www.homermultitext.org/ict2/index.html

file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2518,0.2893,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.3274,0.3347,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4471,0.4081,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.4855,0.4484,0.2640,0.09705&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2799,0.4514,0.1334,0.08056%20&urn=urn:cite2:hmt:hmtpap.2017a:Pap114_pano@0.2360,0.4256,0.1149,0.08157


file:///Users/cblackwell/Dropbox/CITE/scala/ict2/index.html?urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4965,0.2199,0.3211,0.02047&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4978,0.2423,0.2905,0.01646&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4978,0.2609,0.3277,0.01936&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4959,0.2793,0.3277,0.01936&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4993,0.2992,0.3277,0.01936&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4993,0.3206,0.3137,0.01936&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4972,0.3380,0.3357,0.01992&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.4993,0.3555,0.3436,0.01992&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.5011,0.3739,0.3609,0.01936&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.5006,0.3918,0.3449,0.02241&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.5039,0.4107,0.3336,0.02241&urn=urn:cite2:hmt:vaimg.2017a:VA012VN_0514@0.5059,0.4317,0.3489,0.02241

*/


function ict2_drawPreview(osr){
	  var newRoi = rectToRoi(osr)
		if (useLocal){
			getLocalPreview(newRoi)
		} else {
			getRemotePreview(newRoi)
		}
}

function ict2_drawPreviewFromUrn(urn){
		var newRoi = urn.split("@")[1];
		if (useLocal){
			getLocalPreview(newRoi)
		} else {
			getRemotePreview(newRoi)
		}
}

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

function getRemotePreview(roi){
	var plainUrn = imgUrn.split("@")[0];
	var imgId = plainUrn.split(":")[4];
	var tempImagePath = getImagePathFromUrn(plainUrn);
	// here
	var u = serviceUrl + "OBJ=IIP,1.0&FIF=" + servicePath + tempImagePath + imgId + serviceSuffix;
	u += "&RGN=" + roi + "&wID=" + defaultThumbWidth + "&CVT=JPEG";
	$("#image_preview").attr("src",u);
}



/* Main */
jQuery(function($){

	var paramUrn = get("urn");


	if (paramUrn === undefined ){
		imgUrn = defaultUrn;
		paramUrn = defaultUrn;
	} else {
		imgUrn = paramUrn;
	}

	setUpUI()


	initOpenSeadragon()


});

/* Initiatlize OpenSeadragon viewer with guides, selection, and pre-load any urn */
function initOpenSeadragon() {

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
		// tileSources: 'http://www.homermultitext.org/iipsrv?DeepZoom=/project/homer/pyramidal/VenA/VA012RN_0013.tif.dzi',
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
	},1000);

}




function loadDefaultROI(imgUrn){
	tempArray = roiArray;
	roiArray = []
	if (tempArray.length > 0){
		tempArray.forEach(function(i){
			var newRoi = i;
			var newGroup = getGroup(roiArray.length+1);
			var roiObj = {
				index: roiArray.length,
				roi: newRoi,
				mappedUrn: imgUrn,
				group: newGroup.toString()};
			roiArray.push(roiObj);
			addRoiOverlay(roiObj);
			addRoiListing(roiObj);
		});
	}

	/*
	if (imgUrn.split("@").length > 1){
		var newRoi = imgUrn.split("@")[1];
		var newGroup = getGroup(roiArray.length+1);
		var roiObj = {index: roiArray.length, roi: newRoi, mappedUrn: imgUrn, group: newGroup.toString()};
		roiArray.push(roiObj);
		addRoiOverlay(roiObj);
		addRoiListing(roiObj);
	}
	*/
}




function createROI(rect){
	var newRoi = rectToRoi(rect);
	var newUrn = imgUrn + "@" + newRoi;
	var newGroup = getGroup(roiArray.length+1);
	var roiObj = {index: roiArray.length, roi: newRoi, mappedUrn: newUrn, group: newGroup.toString()};
	roiArray.push(roiObj);
	addRoiOverlay(roiObj);
	addRoiListing(roiObj);
}

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



function addRoiListing(roiObj){
		// image_urnList
		var idForListing = idForMappedUrn(roiObj.index);
		var idForRect = idForMappedROI(roiObj.index);
		var groupClass = "image_roiGroup_" + roiObj.group;
		var deleteLink = "<a class='deleteLink' id='delete" + idForListing + "' data-index='" + roiObj.index + "'></a>";
		var mappedUrnSpan = "<li class='" + groupClass + "' id='" + idForListing + "'>";
		mappedUrnSpan += deleteLink + roiObj.mappedUrn + "</li>";
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

		$("a#delete"+idForListing).on("click",function(){
				var tid = $(this).prop("id")
				var i = tid.replace("deleteimage_mappedUrn_","")
				deleteRoi(parseInt(i))
		});
}




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
}



function refreshRois(){
	var tempArray = []
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




//get request parameter
function get(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))

	var query = window.location.search.substring(1);
	if (query != undefined){
	  var vars = query.split("&");
		vars.forEach(function(v){
				if (v.split("=")[1].split("@").length > 1){
					roiArray.push(v.split("=")[1].split("@")[1].split("%")[0]);
				}
		});
	}
	if (name != undefined) {
		return decodeURIComponent(name[1]);
	} else {
		return undefined;
	}

}




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




function removeAllHighlights(){
	 	for (i = 0; i < roiArray.length; i++){
			var liId = idForMappedUrn(i)
			var rectId = idForMappedROI(i)
			$("li#"+liId).removeClass("image_roiGroupSelected");
			$("a#"+rectId).removeClass("image_roiGroupSelected");
		}
}




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




function idForMappedUrn(i) {
	var s = "image_mappedUrn_" + (i)
	return s
}



function idForMappedROI(i) {
	var s = "image_mappedROI_" + (i)
	return s
}




function roiToUrnId(id) {
	var s = id.replace("image_mappedROI_","image_mappedUrn_")
	return s
}



function urnToRoiId(id) {
	var s = id.replace("image_mappedUrn_","image_mappedROI_")
	return s
}




function getGroup(i){
	var colorArray = ["#f23568", "#6d38ff", "#38ffd7", "#fff238", "#661641", "#275fb3", "#24a669", "#a67b24", "#ff38a2", "#194973", "#35f268", "#7f441c", "#801c79", "#2a8ebf", "#216616", "#d97330", "#da32e6", "#196d73", "#bdff38", "#bf3e2a", "#3d1973", "#30cdd9", "#858c1f", "#661616"	];
	//var colorArray = ["#f23568", "#6d38ff", "#38ffd7", "#fff238"];
	var limit = colorArray.length
	//var limit = 4;
	rv = i % limit;
	return rv;
}




function reloadImage(){
	clearJsRoiArray();
	initOpenSeadragon();
}




function setUpUI() {

	$("div#serverConfigs").hide()
	$("div#localConfigs").show()
	$("#browse_onoffswitch").prop("checked",true)
	$("input#image_serverUrlBox").prop("value",serviceUrl)
	$("input#image_serverUrlPathBox").prop("value",servicePath)
	//$("input#image_serverSuffixBox").prop("value",serviceSuffix)
	$("input#image_localPathBox").prop("value",localPath)

	$("button#image_changeUrn").on("click", function(){
			var newUrn = $("input#image_urnBox").prop("value").trim()
			imgUrn = newUrn
			reloadImage();
	});

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

	$("input#image_urnBox").prop("value",imgUrn)

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
	} );
}

function getImagePathFromUrn(urn){
	var ns  = urn.split(":")[2];
	var collectionAndVersion = urn.split(":")[3];
	var collection = collectionAndVersion.split(".")[0];
	var version = collectionAndVersion.split(".")[1];
	var tempPath = ns + "/" + collection + "/" + version + "/";
	return tempPath
}

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
