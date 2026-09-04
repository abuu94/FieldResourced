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

<script>
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Restore tab from hash
    if (window.location.hash) {
      const activeTab = document.querySelector(
        `a[data-bs-target="${window.location.hash}"]`
      );
      if (activeTab) {
        new bootstrap.Tab(activeTab).show();
      }
    }

    // 2. Update hash when switching tabs
    document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', function (e) {
        const target = e.target.getAttribute('data-bs-target');
        history.replaceState(null, null, target);
      });
    });

    // 3. Create user via modal form
    const createForm = document.getElementById('createFormModal');
    if (createForm) {
      createForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(createForm);

        fetch('create_action.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.text())
          .then(result => {
            if (result.trim() === 'success') {
              const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
              modal.hide();
              createForm.reset();
              location.reload();
            } else {
              alert('Failed to add user: ' + result);
            }
          })
          .catch(error => {
            console.error('Create user error:', error);
            alert('An error occurred while adding the user.');
          });
      });
    }

    // 4. Create subject via modal form
    const createSubjectForm = document.getElementById('createSubjectFormModal');
    if (createSubjectForm) {
      createSubjectForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const subjectformData = new FormData(createSubjectForm);

        fetch('create_subject_action.php', {
          method: 'POST',
          body: subjectformData
        })
          .then(subjectresponse => subjectresponse.json())
          .then(data => {
            if (data.status === 'success') {
              const modal = bootstrap.Modal.getInstance(document.getElementById('addSubjectModal'));
              modal.hide();
              createSubjectForm.reset();
              location.reload();
            } else {
              alert(data.message || 'Failed to add subject.');
            }
          })
          .catch(error => {
            console.error('Create subject error:', error);
            alert('An error occurred while adding the subject.');
          });
      });
    }

    // 5. Edit user via modal form
    document.querySelectorAll('form[id^="editForm"]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formId = (typeof form.id === "string") ? form.id.replace(/^editForm/, '') : '';

        fetch('edit_action.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal' + formId));
              if (modal) modal.hide();
              location.reload();
            } else {
              alert(data.message || 'Failed to update user.');
            }
          })
          .catch(error => {
            console.error('Update user error:', error);
            alert('An error occurred while updating the user.');
          });
      });
    });

    // 6. Edit subject via modal form
    document.querySelectorAll('form[id^="editSubjectForm"]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const formId = (typeof form.id === "string") ? form.id.replace(/^editSubjectForm/, '') : '';

        fetch('edit_subject_action.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              const modal = bootstrap.Modal.getInstance(document.getElementById('editSubjectModal' + formId));
              if (modal) modal.hide();
              location.reload();
            } else {
              alert(data.message || 'Failed to update subject.');
            }
          })
          .catch(error => {
            console.error('Update subject error:', error);
            alert('An error occurred while updating the subject.');
          });
      });
    });




  // Search Subjects
  const searchSubjectBox = document.getElementById("searchSubjectBox");
  if (searchSubjectBox) {
    searchSubjectBox.addEventListener("keyup", function () {
      const filter = searchSubjectBox.value.toLowerCase();
      document.querySelectorAll("#subjectsTable tbody tr").forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }

  // Search Students
  const searchStudentBox = document.getElementById("searchStudentBox");
  if (searchStudentBox) {
    searchStudentBox.addEventListener("keyup", function () {
      const filter = searchStudentBox.value.toLowerCase();
      document.querySelectorAll("#studentsTable tbody tr").forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }


    // Search Resources
  const searchResourceBox = document.getElementById("searchResourceBox");
  if (searchResourceBox) {
    searchResourceBox.addEventListener("keyup", function () {
      const filter = searchResourceBox.value.toLowerCase();
      document.querySelectorAll("#resourcesTable tbody tr").forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }


  

  

  });
</script>


<script>
  document.addEventListener("DOMContentLoaded", function () {
  // Create Resource
  const createResourceForm = document.getElementById("createResourceFormModal");
  if (createResourceForm) {
    createResourceForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(createResourceForm);

      fetch("create_resource_action.php", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            const modal = bootstrap.Modal.getInstance(document.getElementById("addResourceModal"));
            modal.hide();
            createResourceForm.reset();
            location.reload();
          } else {
            alert(data.message || "Failed to add resource.");
          }
        })
        .catch(error => {
          console.error("Create resource error:", error);
          alert("An error occurred while adding the resource.");
        });
    });
  }

  // Edit Resource
  document.querySelectorAll('form[id^="editResourceForm"]').forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const formId = (typeof form.id === "string") ? form.id.replace(/^editResourceForm/, "") : "";

      fetch("edit_resource_action.php", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            const modal = bootstrap.Modal.getInstance(document.getElementById("editResourceModal" + formId));
            if (modal) modal.hide();
            location.reload();
          } else {
            alert(data.message || "Failed to update resource.");
          }
        })
        .catch(error => {
          console.error("Update resource error:", error);
          alert("An error occurred while updating the resource.");
        });
    });
  });


});

</script>




  </body>
</html>



