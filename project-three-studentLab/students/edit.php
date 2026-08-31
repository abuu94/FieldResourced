<?php
include("../includes/header.php");
include("../includes/auth_check.php");
include("../config/db.php");

$id = $_GET['id'];
$result = mysqli_query($conn, "SELECT * FROM students WHERE id=$id");
$row = mysqli_fetch_assoc($result);

if (isset($_POST['update'])) {
    $first = mysqli_real_escape_string($conn, $_POST['first']);
    $last  = mysqli_real_escape_string($conn, $_POST['last']);
    $level = mysqli_real_escape_string($conn, $_POST['studentlevel']);
    $uni   = mysqli_real_escape_string($conn, $_POST['university']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $addr  = mysqli_real_escape_string($conn, $_POST['address']);
    $phone = mysqli_real_escape_string($conn, $_POST['phonenumber']);

    $sql = "UPDATE students SET first_name='$first', last_name='$last', studentlevel='$level',
            university='$uni', email='$email', address='$addr', phonenumber='$phone' WHERE id=$id";
    if (mysqli_query($conn, $sql)) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>

<?php include("../includes/header.php"); ?>
<h2>Edit Student</h2>
<form method="post">
  <input type="text" name="first" value="<?= $row['first_name'] ?>" required><br>
  <input type="text" name="last" value="<?= $row['last_name'] ?>" required><br>
  <input type="text" name="studentlevel" value="<?= $row['studentlevel'] ?>" required><br>
  <input type="text" name="university" value="<?= $row['university'] ?>" required><br>
  <input type="email" name="email" value="<?= $row['email'] ?>" required><br>
  <input type="text" name="address" value="<?= $row['address'] ?>" required><br>
  <input type="text" name="phonenumber" value="<?= $row['phonenumber'] ?>" required><br>
  <button type="submit" name="update">Update</button>
</form>
<?php include("../includes/footer.php"); ?>
