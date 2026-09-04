  <div class="tab-pane fade" id="resources">
       <div class="container px-4 py-5">
                <h2 class="pb-2 border-bottom">Resources</h2>

                <!-- Search box -->
                <input type="text" id="searchResourceBox" class="form-control mb-3" placeholder="Search resources...">


                <div class="table-responsive">
                    <!-- Resources DataTable -->
                <table id="resourcesTable" class="table table-striped table-hover table-bordered">
                  <thead class="table-primary text-center">
                    <tr>
                      <th>#</th>
                      <th>Resource Name</th>
                      <th>Description</th>
                      <th>Maintainer</th>
                      <th>URL</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
        
                          <tbody>

                        <?php if (mysqli_num_rows($resource_result) > 0): ?>
                            <?php while ($resource_row = mysqli_fetch_assoc($resource_result)): ?>
                          <tr>
                            <td><?= $resource_row['id'] ?></td>
                            <td><?= $resource_row['resource_name'] ?></td>
                            <td><?= $resource_row['description'] ?></td>
                            <td><?= $resource_row['maintainer'] ?></td>
                            <td><a href="<?= $resource_row['url'] ?>" target="_blank">Link</a></td>
                            <td class="text-center">
                                <div class="btn-group btn-group-sm">
                                    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#viewResourceModal<?= $resource_row['id'] ?>">
                                        View
                                    </button>
                                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editResourceModal<?= $resource_row['id'] ?>">
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteResourceModal<?= $resource_row['id'] ?>">
                                        Delete
                                    </button>


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
              

                  <nav>
                      <ul class="pagination justify-content-center">
                        <?php if ($page > 1): ?>
                          <li class="page-item">
                            <a class="page-link" href="?page=<?= $page-1 ?>#resources">&laquo;</a>
                          </li>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                          <li class="page-item <?= ($i == $page) ? 'active' : '' ?>">
                            <a class="page-link" href="?page=<?= $i ?>#resources"><?= $i ?></a>
                          </li>
                        <?php endfor; ?>

                        <?php if ($page < $total_pages): ?>
                          <li class="page-item">
                            <a class="page-link" href="?page=<?= $page+1 ?>#resources">&raquo;</a>
                          </li>
                        <?php endif; ?>
                      </ul>
                    </nav>

                    <!-- Add Resource Modal -->
              <div class="modal fade" id="addResourceModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                  <form id="createResourceFormModal" class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Add Resource</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label class="form-label">Resource Name</label>
                        <input type="text" name="resource_name" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" required></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Maintainer</label>
                        <input type="text" name="maintainer" class="form-control" required>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">URL</label>
                        <input type="url" name="url" class="form-control" required>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn btn-primary">Add Resource</button>
                    </div>
                  </form>
                </div>
              </div>
  
              <?php if (mysqli_num_rows($resource_result) > 0): ?>
                                      <?php mysqli_data_seek($resource_result, 0); ?>
                                      <?php while ($resource_row = mysqli_fetch_assoc($resource_result)): ?>
                                          <!-- View Modal -->
                                          <div class="modal fade" id="viewUserModal<?= $resource_row['id'] ?>" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                              <div class="modal-content">
                                                <div class="modal-header">
                                                  <h5 class="modal-title">View Resource</h5>
                                                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div class="modal-body">
                                                  <dl class="resource_row mb-0">
                                                    <dt class="col-sm-4">Resource Name</dt>
                                                    <dd class="col-sm-8"><?= htmlspecialchars($resource_row['resource_name']) . ' ' . htmlspecialchars($resource_row['last_name']) ?></dd>

                                                    <dt class="col-sm-4">Description</dt>
                                                    <dd class="col-sm-8"><?= htmlspecialchars($resource_row['description']) ?></dd>

                                                    <dt class="col-sm-4">Maintainer</dt>
                                                    <dd class="col-sm-8"><?= htmlspecialchars($resource_row['maintainer']) ?></dd>

                                                    <dt class="col-sm-4">URL</dt>
                                                    <dd class="col-sm-8"><?= htmlspecialchars($resource_row['url']) ?></dd>

                                                  </dl>
                                                </div>
                                                <div class="modal-footer">
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          
                                        <!-- Edit Resource Modal -->
                    <div class="modal fade" id="editResourceModal<?= $resource_row['id'] ?>" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog">
                        <form id="editResourceForm<?= $resource_row['id'] ?>" class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Edit Resource</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <div class="modal-body">
                            <input type="hidden" name="id" value="<?= $resource_row['id'] ?>">
                            <div class="mb-3">
                              <label class="form-label">Resource Name</label>
                              <input type="text" name="resource_name" class="form-control" value="<?= htmlspecialchars($resource_row['resource_name']) ?>" required>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Description</label>
                              <textarea name="description" class="form-control" required><?= htmlspecialchars($resource_row['description']) ?></textarea>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Maintainer</label>
                              <input type="text" name="maintainer" class="form-control" value="<?= htmlspecialchars($resource_row['maintainer']) ?>" required>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">URL</label>
                              <input type="url" name="url" class="form-control" value="<?= htmlspecialchars($resource_row['url']) ?>" required>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-success">Update Resource</button>
                          </div>
                        </form>
                      </div>
                    </div>


                                          
                                          <!-- Delete Resource Modal -->
                    <div class="modal fade" id="deleteResourceModal<?= $resource_row['id'] ?>" tabindex="-1" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Delete Resource</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <div class="modal-body">
                            <p>Are you sure you want to delete 
                              <strong><?= htmlspecialchars($resource_row['resource_name']) ?></strong>?
                            </p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                             <a href="delete_resource_action.php?id=<?= $resource_row['id'] ?>" class="btn btn-danger" >Delete</a>
                           
                           
                            <!-- <button type="button" class="btn btn-danger delete-resource-btn" data-id="<?= $resource_row['id'] ?>">
                              Delete
                            </button> -->
                          </div>
                        </div>
                      </div>
                    </div>

                  <?php endwhile; ?>
              <?php endif; ?>
          </div>
  </div>