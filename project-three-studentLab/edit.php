<?php
// include("../includes/auth_check.php");
include("config/db.php");

$id = $_GET['id'] ?? 0;
$sql = "SELECT * FROM students WHERE id=$id";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
?>

<?php include("includes/header.php"); ?>

<div class="container mt-4">
  <h2>Edit Student</h2>
  <form id="editForm">
    <input type="hidden" name="id" value="<?= $row['id'] ?>">
    <input type="text" name="first_name" class="form-control mb-2" value="<?= $row['first_name'] ?>" required>
    <input type="text" name="last_name" class="form-control mb-2" value="<?= $row['last_name'] ?>" required>
    <input type="text" name="studentlevel" class="form-control mb-2" value="<?= $row['studentlevel'] ?>" required>
    <input type="text" name="university" class="form-control mb-2" value="<?= $row['university'] ?>" required>
    <input type="email" name="email" class="form-control mb-2" value="<?= $row['email'] ?>" required>
    <input type="text" name="address" class="form-control mb-2" value="<?= $row['address'] ?>" required>
    <input type="text" name="phonenumber" class="form-control mb-2" value="<?= $row['phonenumber'] ?>" required>
    <!-- Optional: password update -->
    <input type="password" name="password" class="form-control mb-2" placeholder="New Password (leave blank if unchanged)">
    <button type="submit" class="btn btn-success">Update</button>
  </form>
</div>

<?php include("includes/footer.php"); ?>

<script>
//   document.getElementById("editForm").addEventListener("submit", function(e) {
//     e.preventDefault();
//     let formData = new FormData(this);

//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "edit_action.php", true);
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             if (xhr.responseText.includes("success")) {
//                 alert("Student updated successfully!");
//                 window.location.href = "index.php";
//             } else {
//                 alert("Update failed: " + xhr.responseText);
//             }
//         }
//     };
//     xhr.send(formData);
// });

document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "edit_action.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Student updated successfully!");
            window.location.href = "index.php"; // refresh list
        }
    };
    xhr.send(formData);
});
</script>
