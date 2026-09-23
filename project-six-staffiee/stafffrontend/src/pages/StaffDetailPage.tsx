import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Pencil,
  Phone,
  User,
  UserRound,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useStaffById } from "@/hooks/useStaff";

function StaffDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const staffId = Number(id);

  const { data: staff, isLoading, isError } = useStaffById(staffId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />

          <div className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-56 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff Details</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Unable to load this staff member.
          </p>
        </div>

        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
          <p className="text-sm text-destructive">
            The staff member could not be found or the server returned an error.
          </p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/staff/list")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Staff List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <UserRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff Details</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View staff member information.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => navigate("/staff/list")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Staff List
          </Button>

          <Button onClick={() => navigate(`/staff/${staff.id}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Staff
          </Button>
        </div>
      </div>

      {/* Staff Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Staff Image */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              {staff.staff_image ? (
                <img
                  src={staff.staff_image}
                  alt={staff.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>

            {/* Staff Name */}
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Staff Member
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                {staff.name}
              </h2>

              <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {staff.payroll_number}
              </div>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="p-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Full Name
                </p>

                <p className="mt-1 break-words text-sm font-medium">
                  {staff.name}
                </p>
              </div>
            </div>

            {/* Age */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Age
                </p>

                <p className="mt-1 text-sm font-medium">{staff.age} years</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phone Number
                </p>

                <p className="mt-1 break-words text-sm font-medium">
                  {staff.phone_number}
                </p>
              </div>
            </div>

            {/* Payroll Number */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Payroll Number
                </p>

                <p className="mt-1 break-words text-sm font-medium">
                  {staff.payroll_number}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Address
                </p>

                <p className="mt-1 break-words text-sm font-medium leading-6">
                  {staff.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={() => navigate("/staff/list")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Staff List
        </Button>

        <Button onClick={() => navigate(`/staff/${staff.id}/edit`)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Staff
        </Button>
      </div>
    </div>
  );
}

export default StaffDetailPage;
