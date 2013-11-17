/*
 Global
 */
/*
 onLoad
 */
$(function () {
    navigator.geolocation.getCurrentPosition(initialize);

    setInterval(function () {
        console.log(allMarkers);

        $.get("server/php/return.php?type=file", function (Data) {
            data = JSON.parse(Data);
            updateView(data);

        });
    }, 3000);
});

var data;
var map;
var newPins = new Array();
var iconBase = 'https://maps.google.com/mapfiles/';
var allMarkers = [];

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
        zoom: 6,
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
        icon: iconBase + 'arrow.png'
    });

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

function updateCurLatLong(event) {
    curLatLng = event.latLng;
}

$('#fileupload').bind('fileuploadadd', function (e, addData) {
    var marker = addMarker(curLatLng, true);

    if(marker !== null){

        $('#fileupload').bind('fileuploadfail', function (e, failData) {
            if (addData.files[0] === failData.files[0]) {
                removeMarker(marker);
            }
        });

        $('#fileupload').bind('fileuploaddone', function (e, data) {
            console.log("setting draggable to false");
            marker.draggable = false;
            console.log("now updating server");
            $.post("http://162.243.50.75/spotdrop/server/php/insert.php?type=file", { fname: data.files[0].name,
                lat: marker.position.lat(), long: marker.position.lng()
            });
        });
    }

});

function removeMarker(marker) {
    marker.setMap(null);
    marker = null;
}

function addMarker(obj, draggable) {
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
        icon: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png'
    });

    allMarkers.push(marker);

    return marker;
}

function updateView(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = new google.maps.LatLng(data[i].lat, data[i].long);
        //console.log(allMarkers);
        //console.log(data);
        addMarker(obj, false);
    }
}