/*
 Global
 */
/*
 onLoad
 */
$(function () {
    navigator.geolocation.getCurrentPosition(initialize);

    setInterval(function () {
        //console.log(allMarkers);

        $.get("server/php/return.php?type=file", function (Data) {
            data = JSON.parse(Data);
            //console.log(data);
            updateView(data);

        });
    }, 3000);

});

var data;
var map;
var newPins = new Array();
var iconBase = 'https://maps.google.com/mapfiles/';
var allMarkers = [];

var bluMarker = {
	url: 'https://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
    //size: new google.maps.Size(64, 64),
    //origin: new google.maps.Point(0, 0),
    //anchor: new google.maps.Point(16, 32),
    scaledSize: new google.maps.Size(32, 32)
};

var redMarker = {
    url: 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png',
    //size: new google.maps.Size(64, 64),
    //origin: new google.maps.Point(0, 0),
    //anchor: new google.maps.Point(16, 32),
    scaledSize: new google.maps.Size(32, 32)
};

var grnMarker = {
    url: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
    //size: new google.maps.Size(64, 64),
    //origin: new google.maps.Point(0, 0),
    //anchor: new google.maps.Point(16, 32),
    scaledSize: new google.maps.Size(32, 32)
};

var homeMarker = {
    url: 'http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png',
    scaledSize: new google.maps.Size(32, 32)
}

function initialize(position) {
    /*
     Basic Setup
     */
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var stylez = [
        {
            featureType: "all",
            elementType: "all",
            stylers: [
                { saturation: -100 }, // <-- THIS
                { lightness: -20 }
            ]
        }
    ];

    var myOptions = {
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        draggable: true,
        disableDoubleClickZoom: true,     //disable zooming
        scrollwheel: true,
        zoom: 14,
        center: latLng,
        mapTypeControl: {mapTypeId: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']},
        mapTypeId: google.maps.MapTypeId.HYBRID //   ROADMAP; SATELLITE; HYBRID; TERRAIN;
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var mapType = new google.maps.StyledMapType(stylez, {name: "Grayscale"});
    map.mapTypes.set('tehgrayz', mapType);
    map.setMapTypeId('tehgrayz')

    var markerlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var marker = new google.maps.Marker({
        position: markerlatlng,
        title: "I am here!",
        icon: homeMarker,
        zIndex: 1000
    });

    addInfoWindow(marker, "<h3>Me</h3>");

    allMarkers.push(marker);

    marker.setMap(map);

    /*
     INFO Bubble
     */

    /*myInfoWindowOptions = {
     content: '<div class="info-window-content"><h4>Hello! I am a Google Map custom marker</h4></div>',
     maxWidth: 275
     };

     infoWindow = new google.maps.InfoWindow(myInfoWindowOptions);

     google.maps.event.addListener(marker, 'click', function () {
     infoWindow.open(map, marker);
     });

     google.maps.event.addListener(marker, 'dragstart', function () {
     infoWindow.close();
     });

     infoWindow.open(map, marker); */

    google.maps.event.addListener(map, 'mousemove', function (event) {
        updateCurLatLong(event);
    });

    $("#zo").click(function (event) {
        event.preventDefault();
        map.setZoom(map.getZoom() - 1);
    });

    $("#zi").click(function (event) {
        event.preventDefault();
        map.setZoom(map.getZoom() + 1);
    });

    $("#gt").click(function (event) {
        event.preventDefault();
        var lt1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.panTo(lt1);
    });


}//end initialize

function allowDrop(ev) {
    ev.preventDefault();
    updateCurLatLong(ev);
}

function updateCurLatLong(event) {
    curLatLng = event.latLng;
}

$('#fileupload').bind('fileuploadadd', function (e, addData) {
    var marker = addMarker(curLatLng, true, addData.files[0].name);
    marker.setIcon(redMarker);
    if(marker !== null){

        $('#fileupload').bind('fileuploadfail', function (e, failData) {
            if (addData.files[0] === failData.files[0]) {
                removeMarker(marker);
            }
        });

        $('#fileupload').bind('fileuploaddone', function (e, data) {
            marker.setDraggable(false);
			if(isWithinBounds(allMarkers[0], marker))
			{
				marker.setIcon(bluMarker);
                console.log("adding download listener");
                addDownload(marker, data.files[0].name);
			}
			else
			{
				marker.setIcon(grnMarker);
			}
            $.post("http://162.243.50.75/spotdrop/server/php/insert.php?type=file", { fname: data.files[0].name,
                lat: marker.position.lat(), long: marker.position.lng()
            });
        });
    }

});

function isWithinBounds(marker1, marker2){
    var sw = new google.maps.LatLng(marker1.getPosition().lat() - 0.025, marker1.getPosition().lng() - 0.025);
    var ne = new google.maps.LatLng(marker1.getPosition().lat() + 0.025, marker1.getPosition().lng() + 0.025);
    var marker1Bounds = new google.maps.LatLngBounds(sw, ne);
    return marker1Bounds.contains(marker2.getPosition());
}

function removeMarker(marker) {
    marker.setMap(null);
    marker = null;
}

function addMarker(obj, draggable, filename) {
    for (var j = 0; j < allMarkers.length; j++) {
        if (allMarkers[j].position.equals(obj)) {
            return null;
        }
    }

    var marker = new google.maps.Marker({
        position: obj,
        map: map,
        draggable: draggable,
        animation: google.maps.Animation.DROP,
        icon: grnMarker
    });

    if(isWithinBounds(allMarkers[0], marker)){
        marker.setIcon(bluMarker);
        console.log("adding download listener");
        addDownload(marker, filename);
    }

    allMarkers.push(marker);
    addInfoWindow(marker, "<p>" + filename + "</p>");
    return marker;
}

function updateView(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = new google.maps.LatLng(data[i].lat, data[i].long);
        addMarker(obj, false, data[i].file);
    }
}

$("#hidden-text").delay(5000).fadeOut(400);

function addInfoWindow(marker, html){
    var iWin = new google.maps.InfoWindow({disableAutoPan: true, content: html, });

    google.maps.event.addListener(marker, 'mouseover', function() {
        iWin.open(map,marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        iWin.close();
    });
}

function addDownload(marker, filename){
    console.log("adding download listener for " + filename);
    google.maps.event.addListener(marker, 'mouseover', function () {
        console.log("trying to download "+filename);
        //window.location = 'server/php/files/' + filename;
    });
}
/** STATUS STUFF GOES HERE **/

$('.status_push').bind('click', function(event) {

    var status = $('.status').val();

    console.log(status);

    $.post('server/php/insert.php?type=text', {statusText:status, lat: allMarkers[0].position.lat(), long: allMarkers[0].position.lng()});

    event.preventDefault();
});
