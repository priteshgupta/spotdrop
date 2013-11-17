<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pritesh
 * Date: 11/16/13
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */

$link = mysql_connect('162.243.50.75', 'root', 'password');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';
mysql_close($link);