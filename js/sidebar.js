/**
* Created with JetBrains PhpStorm.
* User: Pritesh
* Date: 11/17/13
* Time: 12:19 AM
* To change this template use File | Settings | File Templates.
*/

/*
// Function to read status texts
$(function() {
    var data;

    setInterval(function(){
        $.get( "../server/php/return.php?type=text", function(Data) {
            data = JSON.parse(Data);
            console.log("text data");
            console.log(data);
        });
        console.log("asdf text");
    }, 500);

    for (var i = 0; i < data.length; i++) {
        if (data[i -1] !== undefined) {
            if (data[i].id !== data[i -1].id) {
                var item = "<li>" + data[i].status + "</li>";
                $("ul#somelist").append(item);
            }
        } else {
            var item = "<li>" + data[i].status + "</li>";
            $("ul#somelist").append(item);
        }
    }

});
*/

// Function to read files
$(function() {
    var data;

    setInterval(function(){
        $.get( "server/php/return.php?type=file", function(Data) {
            data = JSON.parse(Data);
            console.log("file data");
            console.log(data);
        });


        console.log("asdf file");
    }, 500);

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
