<?php
// include("includes/auth_check.php");
include("includes/header.php");
include("config/db.php");

// $result = mysqli_query($conn, "SELECT * FROM students LIMIT 10");


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


        <div class="alert alert-info d-flex align-items-center" role="alert">
          <strong>Student Management</strong>
        </div>

        <div class="row align-items-center">
                 <!-- Search + Add User on same line -->
              <div class="d-flex justify-content-between mb-3">
                <!-- Search box -->
                <div class="input-group me-2" style="max-width: 800px">
                  <input
                    type="text"
                    id="searchBox"
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
         

         
        </div>

<?php include("includes/footer.php"); ?>

<script>
function loadData(page=1, query="") {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "search.php?page=" + page + "&q=" + encodeURIComponent(query), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            document.getElementById("tableData").innerHTML = response.rows;
            document.getElementById("pagination").innerHTML = response.pagination;
        }
    };
    xhr.send();
}

// Initial load
loadData();

// Search event
document.getElementById("searchBox").addEventListener("keyup", function() {
    let query = this.value;
    loadData(1, query); // reset to page 1 when searching
});

// Pagination click event (delegation)
document.getElementById("pagination").addEventListener("click", function(e) {
    if (e.target.tagName === "A") {
        e.preventDefault();
        let page = e.target.getAttribute("data-page");
        let query = document.getElementById("searchBox").value;
        loadData(page, query);
    }
});
</script>

<!-- <script>
document.getElementById("searchBox").addEventListener("keyup", function() {
    let query = this.value;

    // AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "search.php?q=" + encodeURIComponent(query), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.querySelector("tbody").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});
</script> -->
