/**
* Created with JetBrains PhpStorm.
* User: Pritesh
* Date: 11/17/13
* Time: 12:19 AM
* To change this template use File | Settings | File Templates.
*/


// Function to read files
$(function() {


    

    for (var i = 0; i < data.length; i++) {
        if (data[i -1] !== undefined) {
            if (data[i].id !== data[i -1].id) {
                var obj = {
                    ob : data[i].lat,
                    pb : data[i].long
                };

                new google.maps.Marker({
                    position: obj,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });
            }
        } else {
            var obj = {
                ob : data[i].lat,
                pb : data[i].long
            };

            new google.maps.Marker({
                position: obj,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP
            });
        }
    }

});

// Function to post files
$(function() {

        $.post( "../server/php/insert.php?type=file", {
            fname: "FILE_NAME",
            lat: "LAT",
            long: "LONG"
        } );

});
