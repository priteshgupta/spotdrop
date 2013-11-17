/*
 Global
 */
/*
 onLoad
 */
$(function () {
    navigator.geolocation.getCurrentPosition(initialize);
});

var map;
var newPins = new Array();
var iconBase = 'https://maps.google.com/mapfiles';

function initialize(position) {

    /*
     Basic Setup
     */

    console.log("Lat is " + position.coords.latitude);
    console.log("Long is " + position.coords.longitude);

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
        zoom: 6,
        center: latLng,
        mapTypeControl: {mapTypeId: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']},
        mapTypeId: google.maps.MapTypeId.HYBRID //   ROADMAP; SATELLITE; HYBRID; TERRAIN;
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var mapType = new google.maps.StyledMapType(stylez, {name: "Grayscale"});
    map.mapTypes.set('tehgrayz', mapType);
    map.setMapTypeId('tehgrayz')

    /*
     MARKER
     */

    /*
     //for custom image
     var image = 'yourflag.png';
     icon: image

     //for animation marker drop
     animation: google.maps.Animation.DROP

     */
    var markerlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
    var marker = new google.maps.Marker({
        position: markerlatlng,
        title: "I am here!",
		icon: iconBase + 'arrow.png'
    });

    marker.setMap(map);

    /*
     INFO Bubble
     */

    myInfoWindowOptions = {
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

    infoWindow.open(map, marker);

    google.maps.event.addListener(map, 'mousemove', function (event) {
        updateCurLatLong(event);
    });

    $("#zo").click(function (event) {
        event.preventDefault();
        map.setZoom(map.getZoom() - 1);
        //map.setCenter(new google.maps.LatLng(9.825183,15.1975769));
    });

    $("#zi").click(function (event) {
        event.preventDefault();
        map.setZoom(map.getZoom() + 1);
    });

    $("#gt").click(function (event) {
        event.preventDefault();
        var lt1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //map.setZoom( 16 );
        map.panTo(lt1);
    });


}//end initialize

function allowDrop(ev) {
    ev.preventDefault();
    updateCurLatLong(ev);
}


function drop(ev) {
    ev.preventDefault();
    var marker = new google.maps.Marker({
        position: curLatLng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });
    //newPins.push(marker);
    console.log(curLatLng);

    $('#fileupload').bind('fileuploadfail', function (e, data) {
            console.log(e);
            console.log(data);
        }
    );
}

function updateCurLatLong(event) {
    curLatLng = event.latLng;
}