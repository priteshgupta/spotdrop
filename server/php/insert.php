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
$sql   = "insert into sdrop (fname, lat, lng) values ('yea', '1', '2')";

// Close the link
mysql_close($link);