<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pritesh
 * Date: 11/16/13
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */

$link = mysql_connect('localhost', 'root', 'password');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';

if (!mysql_select_db('spotdrop', $link)) {
    echo 'Could not select database';
    exit;
}

$sql    = 'SELECT * FROM sdrop';
$result = mysql_query($sql, $link);

if (!$result) {
    echo "DB Error, could not query the database\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
}

while ($row = mysql_fetch_assoc($result)) {
    echo $row['foo'];
}

echo "\nHello World";

mysql_free_result($result);

//mysql_close($link);