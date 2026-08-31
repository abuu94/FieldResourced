<?php 
session_start();
include("includes/header.php"); 
include("config/db.php");

if (isset($_POST['login'])) {
    $email    = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM students WHERE email='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);

        if (password_verify($password, $row['password'])) {
            $_SESSION['student_id'] = $row['id'];
            $_SESSION['student_name'] = $row['first_name'] . " " . $row['last_name'];
            header("Location: home.php");
            exit();
        } else {
            echo "Invalid password.";
        }
    }else {
        echo "No user found with that email.";
    }

}
?>





<div class="container mt-5">
  <h2 class="mb-4">Login</h2>
  <?php if (!empty($error)): ?>
    <div class="alert alert-danger"><?= $error ?></div>
  <?php endif; ?>
  
  <form method="POST" class="card p-4 shadow-sm">
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" name="email" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" name="password" class="form-control" required />
    </div>

    <button type="submit" name="login" class="btn btn-success">Login</button>
    <p class="mt-3">Don't have an account? <a href="signup.php">Signup here</a></p>
  </form>
</div>


        <!-- <h2 class="mb-4">Login</h2>
        <form method="POST" class="card p-4 shadow-sm">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" name="username" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" name="password" class="form-control" />
          </div>

          <a href="home.php" class="btn btn-success">Login</a>
          <p>Don't have an account? <a href="/signup">Signup here</a></p>
        </form> -->
  <?php include("includes/footer.php"); ?>