<?php

// Include the database config
include_once "db.php";

// Type of request
$type = $_GET['type'];

echo $type;

switch ($type) {
    case 'file':    // If a file upload
        $fname = $_POST['fname'];   // File name
        $lat   = $_POST['lat'];     // Latitude
        $long  = $_POST['long'];    // Longitude

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(
        $sql   = "insert into sdrop (fname, lat, lng) values ($fname, $lat, $long)";
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

// Close the link
mysql_close($link);