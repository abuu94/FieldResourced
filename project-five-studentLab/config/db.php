<?php
// Database connection (MySQLi Procedural)
$host = "127.0.0.1";
$user = "root";
$pass = "";
$db   = "openclass";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
