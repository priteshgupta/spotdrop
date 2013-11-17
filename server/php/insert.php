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
        $sql   = "INSERT INTO sdrop (fname, lat, lng) VALUES ('Hello','World','Foo')";
        if (!mysqli_query($link,$sql))
        {
            die('Error: ' . mysqli_error($link));
        }
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