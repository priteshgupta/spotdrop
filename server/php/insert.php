<?php

// Include the database config
include_once "db.php";

// Type of request
$type = $_GET['type'];

switch ($type) {
    case 'file': // If a file upload

        $fname = $_POST['fname']; // File name
        $lat = $_POST['lat']; // Latitude
        $long = $_POST['long']; // Longitude

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(
        $sql = "insert into sdrop (fname, lat, lng) values ('$fname', '$lat', '$long')";
        $result = mysql_query($sql, $link);

        if ($result) {
            echo "Successful";
            echo "<BR>";
            echo "<a href='insert.php'>Back to main page</a>";
        } else {
            echo "ERROR";
        }

        break;

    case 'text': // Else if a status upload
        $ststext = $_POST['statusText']; // File name
        $lat = $_POST['lat']; // Latitude
        $long = $_POST['long']; // Longitude

        var_dump($_POST);

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(

        $sql = "insert into sdrop_2 (text, lat, lng) values ('I am awesome', '$lat', '$long')";
        $result = mysql_query($sql, $link);

        if ($result) {
            echo "Successful";
            echo "<BR>";
            echo "<a href='insert.php'>Back to main page</a>";
        } else {
            echo "ERROR";
        }

        break;
}


// Close the link
mysql_close($link);