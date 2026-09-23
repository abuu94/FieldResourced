import { useEffect, useMemo, useState } from "react";

import { AlertCircle, RefreshCw, Search, Trash2, Users, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import StaffTable from "@/components/staff/StaffTable";
// import { useStaff } from "@/hooks/useStaff";
import { useDeleteStaff, useStaff } from "@/hooks/useStaff";

type SortField = "name" | "age" | "payroll_number";

type SortDirection = "asc" | "desc";

function StaffListPage() {
  const {
    data: staff = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useStaff();

  const deleteStaffMutation = useDeleteStaff();

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<SortField>("name");

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // Reset pagination when search or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortField, sortDirection]);

  // Filter staff based on search query
  const filteredStaff = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return staff;
    }

    return staff.filter((member) => {
      return (
        member.name.toLowerCase().includes(query) ||
        member.payroll_number.toLowerCase().includes(query) ||
        member.phone_number.toLowerCase().includes(query) ||
        member.address.toLowerCase().includes(query)
      );
    });
  }, [staff, search]);

  // Sort filtered staff
  const sortedStaff = useMemo(() => {
    return [...filteredStaff].sort((a, b) => {
      let comparison = 0;

      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      if (sortField === "age") {
        comparison = a.age - b.age;
      }

      if (sortField === "payroll_number") {
        comparison = a.payroll_number.localeCompare(b.payroll_number);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredStaff, sortField, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedStaff.length / ITEMS_PER_PAGE);

  const paginatedStaff = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedStaff.slice(startIndex, endIndex);
  }, [sortedStaff, currentPage]);

  // Prevent current page from exceeding total pages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));

      return;
    }

    setSortField(field);
    setSortDirection("asc");
  };

  const [staffToDelete, setStaffToDelete] = useState<
    (typeof staff)[number] | null
  >(null);

  const handleDelete = (member: (typeof staff)[number]) => {
    setStaffToDelete(member);
  };

  const confirmDelete = () => {
    if (!staffToDelete) {
      return;
    }

    deleteStaffMutation.mutate(staffToDelete.id, {
      onSuccess: () => {
        setStaffToDelete(null);
      },
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff List</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View all staff members in the system.
            </p>
          </div>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

            <p className="font-medium">Loading staff...</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Please wait while we fetch staff records.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff List</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View all staff members in the system.
            </p>
          </div>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-destructive/20 bg-card p-6 shadow-sm">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">Unable to load staff</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't retrieve the staff records. Please check your
              connection and try again.
            </p>

            <Button
              className="mt-5"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty database state
  if (staff.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff List</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View all staff members in the system.
            </p>
          </div>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              No staff records found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no staff members in the system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff List</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View all staff members in the system.
          </p>
        </div>
      </div>

      {/* Search, Sorting and Count */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search staff..."
            className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-10 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>

          <Button
            variant={sortField === "name" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("name")}
          >
            Name
            {sortField === "name" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </Button>

          <Button
            variant={sortField === "age" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("age")}
          >
            Age
            {sortField === "age" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </Button>

          <Button
            variant={sortField === "payroll_number" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSort("payroll_number")}
          >
            Payroll
            {sortField === "payroll_number" && (
              <span className="ml-1">
                {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </Button>
        </div>

        {/* Record Count */}
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {sortedStaff.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">{staff.length}</span>{" "}
          staff
        </p>
      </div>

      {/* Search Empty State / Staff Table */}
      {filteredStaff.length === 0 ? (
        <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              No matching staff found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              No staff member matches your search for{" "}
              <span className="font-medium text-foreground">"{search}"</span>.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => setSearch("")}
            >
              Clear Search
            </Button>
          </div>
        </div>
      ) : (
        <>
          <StaffTable staff={paginatedStaff} onDelete={handleDelete} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-semibold text-foreground">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    {
                      length: totalPages,
                    },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="min-w-9"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog
        open={!!staffToDelete}
        onOpenChange={(open) => {
          if (!open && !deleteStaffMutation.isPending) {
            setStaffToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>

            <AlertDialogTitle>Delete staff member?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {staffToDelete?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleteStaffMutation.isPending}
              onClick={() => setStaffToDelete(null)}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={deleteStaffMutation.isPending}
              onClick={confirmDelete}
            >
              {deleteStaffMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* End Alert for Delete Confirmation */}
    </div>
  );
}

export default StaffListPage;
