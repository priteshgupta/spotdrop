<?php

// Include the database config
include_once "db.php";

// File name
$fname = $_POST['fname'];

// Latitude
$lat   = $_POST['lat'];

// Longitude
$long  = $_POST['long'];

// The query; no PDO for this app :-(
// ... No sanitizing too. :'(
$sql   = "insert into sdrop (fname, lat, lng) values ($fname, $lat, $long)";

// Close the link
mysql_close($link);