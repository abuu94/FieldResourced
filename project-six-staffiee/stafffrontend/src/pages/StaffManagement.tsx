import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Image,
  ImageOff,
  MapPin,
  Phone,
  Plus,
  Users,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useStaff } from "@/hooks/useStaff";

function StaffManagement() {
  const navigate = useNavigate();

  const {
    data: staff = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useStaff();

  const statistics = useMemo(() => {
    const totalStaff = staff.length;

    const totalAge = staff.reduce((sum, member) => sum + member.age, 0);

    const averageAge =
      totalStaff > 0 ? Math.round((totalAge / totalStaff) * 10) / 10 : 0;

    const staffWithImages = staff.filter((member) =>
      Boolean(member.staff_image),
    ).length;

    const staffWithoutImages = totalStaff - staffWithImages;

    return {
      totalStaff,
      averageAge,
      staffWithImages,
      staffWithoutImages,
    };
  }, [staff]);

  const recentStaff = useMemo(() => {
    return [...staff].sort((a, b) => b.id - a.id).slice(0, 5);
  }, [staff]);

  const getStaffImageUrl = (image: string | null): string | null => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_MEDIA_URL}${image}`;
  };

  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Dashboard Header */}
        {/* Dashboard Header */}

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BriefcaseBusiness className="h-6 w-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Staff Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Manage your staff records, view staff information, and keep
                employee details organized in one place.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/staff/create")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <BriefcaseBusiness className="h-6 w-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Staff Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Manage your staff records, view staff information, and keep
                employee details organized in one place.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => navigate("/staff/create")}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Staff
            </Button>
          </div>
        </div> */}

        {/* Statistics */}

        {/* mwanzo */}
        {/* Statistics */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Overview</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              A quick overview of your staff records.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {/* Total Staff */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Staff
                  </p>

                  {isLoading ? (
                    <div className="mt-3 h-9 w-20 animate-pulse rounded-md bg-muted" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold leading-none">
                      {isError ? "—" : statistics.totalStaff}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                All staff records
              </p>
            </div>
            {/* Average Age */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Age
                  </p>

                  {isLoading ? (
                    <div className="mt-3 h-9 w-20 animate-pulse rounded-md bg-muted" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold leading-none">
                      {isError ? "—" : statistics.averageAge}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <CalendarDays className="h-5 w-5 text-foreground" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Average staff age
              </p>
            </div>
            {/* With Images */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    With Images
                  </p>

                  {isLoading ? (
                    <div className="mt-3 h-9 w-20 animate-pulse rounded-md bg-muted" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold leading-none">
                      {isError ? "—" : statistics.staffWithImages}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                  <Image className="h-5 w-5 text-foreground" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Staff with profile images
              </p>
            </div>
            {/* Without Images */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Without Images
                  </p>

                  {isLoading ? (
                    <div className="mt-3 h-9 w-20 animate-pulse rounded-md bg-muted" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold leading-none">
                      {isError ? "—" : statistics.staffWithoutImages}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                  <ImageOff className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Staff without profile images
              </p>
            </div>
          </div>

          {/* API Error */}
          {isError && (
            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              {" "}
              <div>
                {" "}
                <p className="font-medium text-destructive">
                  Unable to load staff data.{" "}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We couldn't retrieve the latest staff information. Please try
                  again.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="shrink-0"
              >
                {isFetching ? "Retrying..." : "Try Again"}
              </Button>
            </div>
          )}
        </section>

        {/* mwisho */}

        {/* Quick Actions */}

        <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Quick Actions</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Quickly access common staff management actions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Add Staff */}
            <button
              type="button"
              onClick={() => navigate("/staff/create")}
              className="group flex items-center justify-between gap-4 rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Plus className="h-5 w-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">Add New Staff</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Create a new staff record.
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Staff List */}
            <button
              type="button"
              onClick={() => navigate("/staff/list")}
              className="group flex items-center justify-between gap-4 rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                  <Users className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">View Staff List</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    View and manage all staff records.
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Recent Staff */}

        <section className="rounded-2xl border bg-card shadow-sm">
          <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Recent Staff</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Recently added staff members will appear here.
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/staff/list")}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="p-5 sm:p-6">
            {/* Loading */}
            {isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border bg-background p-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar Skeleton */}
                      <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-muted" />

                      {/* Staff Information Skeleton */}
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded-md bg-muted sm:w-40" />

                        <div className="h-3 w-24 animate-pulse rounded-md bg-muted sm:w-28" />

                        <div className="flex flex-wrap gap-2">
                          <div className="h-3 w-20 animate-pulse rounded-md bg-muted" />

                          <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
                        </div>
                      </div>
                      {/* Arrow Skeleton */}
                      <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Error */}
            {!isLoading && isError && (
              <div className="flex min-h-32 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center">
                <div>
                  <Users className="mx-auto h-8 w-8 text-destructive/60" />

                  <p className="mt-3 text-sm font-medium text-destructive">
                    Unable to load recent staff.
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Please refresh the page and try again.
                  </p>
                </div>
              </div>
            )}
            {/* Empty */}
            {!isLoading && !isError && recentStaff.length === 0 && (
              <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed bg-muted/10 p-5 text-center">
                <div>
                  <Users className="mx-auto h-8 w-8 text-muted-foreground/50" />

                  <p className="mt-3 text-sm font-medium">
                    No staff records yet
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Add your first staff member to see them here.
                  </p>

                  <Button
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate("/staff/create")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Staff
                  </Button>
                </div>
              </div>
            )}
            {/* Staff Records */}
            {!isLoading && !isError && recentStaff.length > 0 && (
              <div className="space-y-3">
                {recentStaff.map((member) => {
                  const imageUrl = getStaffImageUrl(member.staff_image);

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => navigate(`/staff/${member.id}`)}
                      className="group w-full rounded-xl border bg-background p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        {/* Avatar */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted sm:h-12 sm:w-12">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Users className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>

                        {/* Main Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="truncate text-sm font-semibold">
                              {member.name}
                            </h3>

                            <span className="max-w-full truncate rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              {member.payroll_number}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                            <span className="flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5" />
                              {member.phone_number}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />
                              Age {member.age}
                            </span>

                            <span className="hidden items-center gap-1.5 md:flex">
                              <MapPin className="h-3.5 w-3.5" />

                              <span className="max-w-xs truncate">
                                {member.address}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StaffManagement;
