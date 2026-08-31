<?php
include("../includes/header.php");
include("../includes/auth_check.php");
include("../config/db.php");

$id = $_GET['id'];

$sql = "DELETE FROM students WHERE id=$id";
if (mysqli_query($conn, $sql)) {
    header("Location: index.php");
    exit();
} else {
    echo "Error: " . mysqli_error($conn);
}
?>
