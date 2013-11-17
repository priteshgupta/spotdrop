<?php

// Include the database config
include_once "db.php";

// The query; no PDO for this app :-(
$sql    = "select * from sdrop";
$result = mysql_query($sql, $link);

// Master array to return
$return = array();

// Loop through them
while ($row = mysql_fetch_assoc($result)) {
    $data = array(
        'file' => $row['fname'],
        'lat'  => $row['lat'],
        'long' => $row['lng']
    );

    // Push to master array
    array_push($return, $data);
}

// echo json encoded array
echo json_encode($return);

// Free the memory
mysql_free_result($result);

// Close the connection
mysql_close($link);