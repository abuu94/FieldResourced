<?php
session_start();

// Check kama user ame-login   user_id
if (!isset($_SESSION['user_id'])) {
    // Ikiwa hajalogin, rudisha kwenye login page
    // header("Location: login.php");
    header("Location: login.php");
    // header("Location: ../auth/login.php");
    exit();
}
?>




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
              <table class="table table-striped table-hover table-bordered">
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
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Certificate</td>
                    <td>SUZA</td>
                    <td>student@example.com</td>
                    <td>Mombasa</td>
                    <td>+2556666778899</td>
                    <td>
                      <div class="btn-group btn-group-sm">
                        <button
                          class="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropLive"
                        >
                          View
                        </button>
                        <button
                          class="btn btn-success"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropLive"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropLive"
                        >
                          Delete
                        </button>
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
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                  </li>
                </ul>
              </nav>
              
            </div>