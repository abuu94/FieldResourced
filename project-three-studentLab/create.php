<?php // include("../includes/auth_check.php"); ?>
<?php include("includes/header.php"); ?>

<div class="container mt-4">
  <h2>Add New Student</h2>
  <form id="createForm">
    <input type="text" name="first_name" class="form-control mb-2" placeholder="First Name" required>
    <input type="text" name="last_name" class="form-control mb-2" placeholder="Last Name" required>
    <input type="text" name="studentlevel" class="form-control mb-2" placeholder="Level" required>
    <input type="text" name="university" class="form-control mb-2" placeholder="University" required>
    <input type="email" name="email" class="form-control mb-2" placeholder="Email" required>
    <input type="text" name="address" class="form-control mb-2" placeholder="Address" required>
    <input type="text" name="phonenumber" class="form-control mb-2" placeholder="Phone" required>
    <input type="password" name="password" class="form-control mb-2" placeholder="Password" required>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</div>

<?php include("includes/footer.php"); ?>

<script>
document.getElementById("createForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "create_action.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert("Student added successfully!");
            // Refresh table on index.php without reload
            window.location.href = "index.php";
        }
    };
    xhr.send(formData);
});
</script>
