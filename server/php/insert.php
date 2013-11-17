<?php

// Include the database config
include_once "db.php";

// Type of request
$type = $_GET['type'];

var_dump($_GET);
echo "\n";
var_dump($_POST);

switch ($type) {
    case 'file':    // If a file upload
        $fname = $_POST['fname'];   // File name
        $lat   = $_POST['lat'];     // Latitude
        $long  = $_POST['long'];    // Longitude

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(
        $sql   = "insert into sdrop (fname, lat, lng) values ('herp derp', '2', '1212')";
        break;

    case 'text':    // Else if a status upload
        $st_text = $_POST['status'];    // File name
        $lat     = $_POST['lat'];       // Latitude
        $long    = $_POST['long'];      // Longitude

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(
        $sql   = "insert into sdrop_2 (text, lat, lng) values ($st_text, $lat, $long)";
        break;
}

mysql_query($sql, $link);

// Close the link
mysql_close($link);