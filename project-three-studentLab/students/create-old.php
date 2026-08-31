<?php
include("../includes/header.php");
// include("../includes/auth_check.php");
include("../config/db.php");

if (isset($_POST['add'])) {
    $first = mysqli_real_escape_string($conn, $_POST['first']);
    $last  = mysqli_real_escape_string($conn, $_POST['last']);
    $level = mysqli_real_escape_string($conn, $_POST['studentlevel']);
    $uni   = mysqli_real_escape_string($conn, $_POST['university']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $addr  = mysqli_real_escape_string($conn, $_POST['address']);
    $phone = mysqli_real_escape_string($conn, $_POST['phonenumber']);

    $sql = "INSERT INTO students (first_name,last_name,studentlevel,university,email,address,phonenumber)
            VALUES ('$first','$last','$level','$uni','$email','$addr','$phone')";
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

<?php include("../includes/header.php"); ?>
<h2>Add Student</h2>
<form method="post">
  <input type="text" name="first" placeholder="First Name" required><br>
  <input type="text" name="last" placeholder="Last Name" required><br>
  <input type="text" name="studentlevel" placeholder="Level" required><br>
  <input type="text" name="university" placeholder="University" required><br>
  <input type="email" name="email" placeholder="Email" required><br>
  <input type="text" name="address" placeholder="Address" required><br>
  <input type="text" name="phonenumber" placeholder="Phone" required><br>
  <button type="submit" name="add">Save</button>
</form>
<?php include("../includes/footer.php"); ?>
