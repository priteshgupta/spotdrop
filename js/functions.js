/*
 Global
 */
/*
 onLoad
 */
 $(function () {
    navigator.geolocation.getCurrentPosition(initialize);



    setInterval(function(){
        $.get( "server/php/return.php?type=file", function(Data) {
            data = JSON.parse(Data);
            console.log("updating view");
            console.log(data);
            updateView(data);
        });
    }, 500);
});

 var data;
 var map;
 var newPins = new Array();
 var iconBase = 'https://maps.google.com/mapfiles/';
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

$('#fileupload').bind('fileuploadadd', function(e, addData){
    var marker = new google.maps.Marker({
        position: curLatLng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    $('#fileupload').bind('fileuploadfail', function (e, failData) {
        if(addData.files[0] === failData.files[0]){
            //console.log("removing file " + failData.files[0].name);
            removeMarker(marker);
        }
    });

    $('#fileupload').bind('fileuploaddone', function (e, data) {
        console.log("successful upload of "+data.files[0].name);
        //console.log(e);
        //console.log(data);
        $.post( "http://162.243.50.75/spotdrop/server/php/insert.php?type=file", { fname: data.files[0].name, 
            lat: marker.position.lat(), long: marker.position.lng() 
        });
        marker.icon = iconBase + 'kml/paddle/grn-circle.png';

    });

});

function removeMarker(marker){
    marker.setMap(null);
    marker = null;
}

function updateView(data){
    for (var i = 0; i < data.length; i++) {
        var obj = new google.maps.LatLng(data[i].lat, data[i].long);

        if (data[i -1] !== undefined) {
            if (data[i].id !== data[i -1].id) {

                new google.maps.Marker({
                    position: obj,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
            }
        } else {
            new google.maps.Marker({
                position: obj,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP
            });
        }
    }
}