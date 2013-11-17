<?php

// Include the database config
//include_once "db.php";

// Type of request
$type = $_GET['type'];

var_dump($_GET);
echo "\n";
var_dump($_POST);

switch ($type) {
    case 'file':    // If a file upload

// Connect to the database
        $link = mysql_connect('localhost', 'root', 'password');

// No error handling; assume everything is alright. ;-)
        mysql_select_db('spotdrop', $link);

        $fname = $_POST['fname'];   // File name
        $lat   = $_POST['lat'];     // Latitude
        $long  = $_POST['long'];    // Longitude

        // The query; no PDO for this app :-(
        // ... No sanitizing too. :'(
        $sql = "INSERT INTO sdrop (fname, lat, long) VALUES ('$fname', '$lat', '$long')";
        $result = mysqli_query($link, $sql) or die(mysqli_error($link)); ;

        echo mysqli_errno($this->db_link);


        if($result){
            echo "Successful";
            echo "<BR>";
            echo "<a href='insert.php'>Back to main page</a>";
        }

        else {
            echo "ERROR";
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