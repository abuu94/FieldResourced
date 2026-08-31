
<?php

include("includes/auth_check.php");
include("config/db.php");

$result = mysqli_query($conn, "SELECT * FROM students");
?>
<?php include("../includes/header.php"); ?>

<h2>Students List</h2>
<a href="create.php" class="btn btn-primary">Add Student</a>
<table class="table table-bordered">
  <thead>
    <tr>
      <th>#</th><th>First</th><th>Last</th><th>Level</th><th>University</th><th>Email</th><th>Address</th><th>Phone</th><th>Action</th>
    </tr>
  </thead>
  <tbody>
    <?php while($row = mysqli_fetch_assoc($result)): ?>
    <tr>
      <td><?= $row['id'] ?></td>
      <td><?= $row['first_name'] ?></td>
      <td><?= $row['last_name'] ?></td>
      <td><?= $row['studentlevel'] ?></td>
      <td><?= $row['university'] ?></td>
      <td><?= $row['email'] ?></td>
      <td><?= $row['address'] ?></td>
      <td><?= $row['phonenumber'] ?></td>
      <td>
        <a href="edit.php?id=<?= $row['id'] ?>" class="btn btn-success btn-sm">Edit</a>
        <a href="delete.php?id=<?= $row['id'] ?>" class="btn btn-danger btn-sm">Delete</a>
      </td>
    </tr>
    <?php endwhile; ?>
  </tbody>
</table>

