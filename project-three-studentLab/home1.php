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
                    <thead class="table-primary text-center">
                      <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th>Instructor</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">1</td>
                        <td>Introduction to Linux</td>
                        <td>Operating Systems</td>
                        <td>Beginner</td>
                        <td>Mr. Ali</td>
                        <td>
                          Learn the basics of Linux commands and environment.
                        </td>
                        <td class="text-center">
                          <div class="btn-group btn-group-sm">
                            <button class="btn btn-info">View</button>
                            <button class="btn btn-success">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">2</td>
                        <td>Web Development Basics</td>
                        <td>Programming</td>
                        <td>Intermediate</td>
                        <td>Ms. Mariam</td>
                        <td>
                          HTML, CSS, and JavaScript fundamentals for beginners.
                        </td>
                        <td class="text-center">
                          <div class="btn-group btn-group-sm">
                            <button class="btn btn-info">View</button>
                            <button class="btn btn-success">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-center">3</td>
                        <td>Docker & Containers</td>
                        <td>DevOps</td>
                        <td>Advanced</td>
                        <td>Mr. Hassan</td>
                        <td>
                          Hands-on introduction to containerization using
                          Docker.
                        </td>
                        <td class="text-center">
                          <div class="btn-group btn-group-sm">
                            <button class="btn btn-info">View</button>
                            <button class="btn btn-success">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Pagination -->
                  <nav>
                    <ul class="pagination justify-content-center">
                      <li class="page-item">
                        <a class="page-link" href="#">&laquo;</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">1</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">2</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">3</a>
                      </li>
                      <li class="page-item">
                        <a class="page-link" href="#">&raquo;</a>
                      </li>
                    </ul>
                  </nav>

                  <!-- Modal for Add Subject -->
                  <div
                    class="modal fade"
                    id="addSubjectModal"
                    tabindex="-1"
                    aria-labelledby="addSubjectModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="addSubjectModalLabel">
                            Add New Subject
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="mb-3">
                              <label class="form-label">Subject Name</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Category</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Level</label>
                              <select class="form-select">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Instructor</label>
                              <input type="text" class="form-control" />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Description</label>
                              <textarea
                                class="form-control"
                                rows="3"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary btn-sm"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary btn-sm">
                            Save Subject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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


               <div class="table-responsive">
                   <table class="table table-striped table-hover table-bordered ">
                     <thead class="table-primary">
                       <tr>
                         <th>#</th>
                         <th>First</th>
                         <th>Last</th>
                         <th>Level</th>
                         <th>University</th>
                         <th>Email</th>
                         <th>Address</th>
                         <th>Phonenumber</th>
                         <th>Action</th>
                       </tr>
                     </thead>
                     <tbody>

                     <?php  if (mysqli_num_rows($result) > 0): ?>
                         <?php while ($row = mysqli_fetch_assoc($result)): ?>
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
                            <div class="btn-group btn-group-sm">
                                <a href="view.php?id=<?= $row['id'] ?>" class="btn btn-info">View</a>
                                <a href="edit.php?id=<?= $row['id'] ?>" class="btn btn-success">Edit</a>
                                <a href="delete.php?id=<?= $row['id'] ?>" class="btn btn-danger"
                                onclick="return confirm('Are you sure you want to delete this record?');">
                                Delete
                                </a>
                            </div>
                        </td>
                       </tr>
                        <?php endwhile; ?>
                        <?php else: ?>
                            <tr><td colspan="9" class="text-center">No records found</td></tr>
                        <?php endif; ?>
                      
                     </tbody>
                   </table>
                  </div>
                  <!-- Pagination -->

                  <!-- Dynamic Pagination -->
                    <nav>
                      <ul class="pagination justify-content-center">
                        <?php if ($page > 1): ?>
                          <li class="page-item"><a class="page-link" href="?page=<?= $page-1 ?>">&laquo;</a></li>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                          <li class="page-item <?= ($i == $page) ? 'active' : '' ?>">
                            <a class="page-link" href="?page=<?= $i ?>"><?= $i ?></a>
                          </li>
                        <?php endfor; ?>

                        <?php if ($page < $total_pages): ?>
                          <li class="page-item"><a class="page-link" href="?page=<?= $page+1 ?>">&raquo;</a></li>
                        <?php endif; ?>
                      </ul>
                    </nav>
                  

              <div
                class="modal fade"
                id="staticBackdropLive"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLiveLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLiveLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label class="form-label">Username</label>
                        <input
                          type="text"
                          name="username"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Understood
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="resources">
              <div class="container px-4 py-5" id="custom-cards">
                <h2 class="pb-2 border-bottom">Subjects and Resources</h2>

                <div
                  class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5"
                >
                  <div class="col">
                    <div
                      class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                      style="
                        background-image: url(&quot;assets/images/unsplash-photo-1.jpg&quot;);
                      "
                    >
                      <div
                        class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"
                      >
                        <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                          HTML ESSENTIALS
                        </h2>
                        <ul class="d-flex list-unstyled mt-auto">
                          <li class="me-auto">
                            <img
                              src="https://github.com/twbs.png"
                              alt="Bootstrap"
                              width="32"
                              height="32"
                              class="rounded-circle border border-white"
                            />
                          </li>
                          <li class="d-flex align-items-center me-3">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#geo-fill" />
                            </svg>
                            <small>Developer : Abubakar</small>
                          </li>
                          <li class="d-flex align-items-center">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#calendar3" />
                            </svg>
                            <small>3d</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col">
                    <div
                      class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                      style="
                        background-image: url(&quot;assets/images/unsplash-photo-2.jpg&quot;);
                      "
                    >
                      <div
                        class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"
                      >
                        <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                          Networks Essentials
                        </h2>
                        <ul class="d-flex list-unstyled mt-auto">
                          <li class="me-auto">
                            <img
                              src="https://github.com/twbs.png"
                              alt="Bootstrap"
                              width="32"
                              height="32"
                              class="rounded-circle border border-white"
                            />
                          </li>
                          <li class="d-flex align-items-center me-3">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#geo-fill" />
                            </svg>
                            <small>Engineer Abdulhamid</small>
                          </li>
                          <li class="d-flex align-items-center">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#calendar3" />
                            </svg>
                            <small>4d</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col">
                    <div
                      class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                      style="
                        background-image: url(&quot;assets/images/unsplash-photo-3.jpg&quot;);
                      "
                    >
                      <div
                        class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"
                      >
                        <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                          Security Essentials
                        </h2>
                        <ul class="d-flex list-unstyled mt-auto">
                          <li class="me-auto">
                            <img
                              src="https://github.com/twbs.png"
                              alt="Bootstrap"
                              width="32"
                              height="32"
                              class="rounded-circle border border-white"
                            />
                          </li>
                          <li class="d-flex align-items-center me-3">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#geo-fill" />
                            </svg>
                            <small>Engineer Salma</small>
                          </li>
                          <li class="d-flex align-items-center">
                            <svg class="bi me-2" width="1em" height="1em">
                              <use xlink:href="#calendar3" />
                            </svg>
                            <small>5d</small>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
