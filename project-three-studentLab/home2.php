<?php
session_start();
if (!isset($_SESSION['student_id'])) {
    header("Location: login.php");
    exit();
}
include("includes/header.php");
?>

<div class="container mt-4">
  <h2>Welcome, <?= $_SESSION['student_name'] ?>!</h2>
  <p>You are now logged in to the system.</p>
  <a href="logout.php" class="btn btn-danger">Logout</a>
</div>

<?php include("includes/footer.php"); ?>





<?php
// include("includes/auth_check.php");
include("config/db.php");

session_start();
if (!isset($_SESSION['student_id'])) {
    header("Location: login.php");
    exit();
}


// Pagination settings
$limit = 5; // records per page
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
if ($page < 1) $page = 1;
$offset = ($page - 1) * $limit;

// Fetch students with LIMIT + OFFSET
$sql = "SELECT * FROM students ORDER BY id ASC LIMIT $limit OFFSET $offset";
$result = mysqli_query($conn, $sql);

// Count total records
$total_sql = "SELECT COUNT(*) AS total FROM students";
$total_result = mysqli_query($conn, $total_sql);
$total_row = mysqli_fetch_assoc($total_result);
$total_records = $total_row['total'];
$total_pages = ceil($total_records / $limit);
?>


<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta
      name="author"
      content="Mark Otto, Jacob Thornton, and Bootstrap contributors"
    />
    <meta name="generator" content="Hugo 0.84.0" />
    <title>Dashboard Template · Bootstrap v5.0</title>

    <link
      rel="canonical"
      href="https://getbootstrap.com/docs/5.0/examples/dashboard/"
    />

    <!-- Bootstrap core CSS -->
    <link href="assets/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>

    <!-- Custom styles for this template -->
    <link href="assets/dist/css/dashboard.css" rel="stylesheet" />
    <link href="assets/dist/css/features.css" rel="stylesheet" />
  </head>
  <body>
    <header
      class="navbar navbar-dark text-light py-3 sticky-top bg-primary flex-md-nowrap shadow"
    >
      <span class="col-md-3 col-lg-2 me-0 px-3"> Open Class Portal</span>

       <h5>Welcome, <?= $_SESSION['student_name'] ?>!</h5>

      <div class="d-flex gap-4">
        <a href="login.php" class="btn btn-outline-warning btn-sm">Sign Out</a>
        <p></p>


      </div>
    </header>

    <div class="container-fluid">
      <div class="row">
        <nav
          id="sidebarMenu"
          class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#dashboard"
                  aria-current="page"
                >
                  <span data-feather="home"></span>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#subjects"
                >
                  <span data-feather="file"></span>
                  Subjects
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#students"
                >
                  <span data-feather="users"></span>
                  Students
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#resources"
                >
                  <span data-feather="shopping-cart"></span>

                  Resources</a
                >
              </li>
            </ul>
          </div>
        </nav>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="tab-content mt-3">
            <div class="tab-pane fade show active" id="dashboard">
              <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
              >
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                  <div class="btn-group me-2">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      Export
                    </button>
                  </div>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary dropdown-toggle"
                  >
                    <span data-feather="calendar"></span>
                    This week
                  </button>
                </div>
              </div>

              <canvas
                class="my-4 w-100"
                id="myChart"
                width="900"
                height="380"
              ></canvas>
            </div>
            <div class="tab-pane fade" id="subjects">
              <div class="container px-4 py-5" id="custom-cards">
                <div
                  class="alert alert-info d-flex align-items-center"
                  role="alert"
                >
                  <strong>Subject Management</strong>
                </div>
                <!-- <h2 class="pb-2 border-bottom">Subjects and Resources</h2> -->

                <!-- Search + Add Subject -->
                <div class="d-flex justify-content-between mb-3">
                  <!-- Search box -->
                  <div class="input-group me-2" style="max-width: 400px">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Search subjects..."
                    />
                    <button class="btn btn-outline-primary btn-sm">
                      Search
                    </button>
                  </div>

                  <!-- Add Subject button -->
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#addSubjectModal"
                  >
                    + Add New Subject
                  </button>
                </div>

                <!-- Subjects Table -->
                <div class="table-responsive">
                  <table
                    class="table table-striped table-hover table-bordered align-middle"
                  >
                   
                  </table>
                

                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="students">
              <div
                class="alert alert-info d-flex align-items-center"
                role="alert"
              >
                <strong>User Management</strong>
              </div>

              <!-- Search + Add User on same line -->
              <div class="d-flex justify-content-between mb-3">
                <!-- Search box -->
                <div class="input-group me-2" style="max-width: 800px">
                  <input
                    type="text"
                    class="form-control form-control"
                    placeholder="Search users..."
                  />
                </div>

                <!-- Add User button -->
                <a
                  href="students/create.php"
                  class="btn btn-secondary"
                >
                  + Add New User
                </a>
              </div>

              <!-- Table -->

                  <!-- Pagination -->


            </div>
          
          </div>
        </main>
      </div>
    </div>

    <!-- Fixed Footer -->
    <footer class="bg-primary text-light text-center py-3 fixed-bottom">
      <span>&copy; 2026 Open Class Portal</span>
    </footer>

    <script src="assets/dist/js/bootstrap.bundle.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
      integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
      integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha"
      crossorigin="anonymous"
    ></script>
    <script src="assets/dist/js/dashboard.js"></script>
  </body>
</html>

