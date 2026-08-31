<?php
include("config/db.php");

// $id     = (int) $_POST['id']; // sanitize id
$id     = mysqli_real_escape_string($conn, $_POST['id']);
$first  = mysqli_real_escape_string($conn, $_POST['first_name']);
$last   = mysqli_real_escape_string($conn, $_POST['last_name']);
$level  = mysqli_real_escape_string($conn, $_POST['studentlevel']);
$uni    = mysqli_real_escape_string($conn, $_POST['university']);
$email  = mysqli_real_escape_string($conn, $_POST['email']);
$addr   = mysqli_real_escape_string($conn, $_POST['address']);
$phone  = mysqli_real_escape_string($conn, $_POST['phonenumber']);
$password = $_POST['password'];

// Build query
if (!empty($password)) {
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $sql = "UPDATE students SET 
            first_name='$first', last_name='$last', studentlevel='$level',
            university='$uni', email='$email', address='$addr',
            phonenumber='$phone', password='$hashed'
            WHERE id=$id";
} else {
    $sql = "UPDATE students SET 
            first_name='$first', last_name='$last', studentlevel='$level',
            university='$uni', email='$email', address='$addr',
            phonenumber='$phone'
            WHERE id=$id";
}

if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "error: " . mysqli_error($conn);
}
?>
