<?php
// Database connection (MySQLi Procedural)
$host = "localhost";
$user = "root";
$pass = "";
$db   = "openclass";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
