import { ArrowLeft, ImagePlus, Pencil, User } from "lucide-react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useStaffById, useUpdateStaff } from "@/hooks/useStaff";
import { getApiErrorMessage } from "@/utils/apiError";

const staffEditSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required.")
    .max(100, "Full name must not exceed 100 characters."),

  age: z
    .string()
    .min(1, "Age is required.")
    .refine(
      (value) => {
        const age = Number(value);
        return Number.isInteger(age) && age > 0;
      },
      {
        message: "Age must be a positive whole number.",
      },
    ),

  phone_number: z
    .string()
    .min(1, "Phone number is required.")
    .max(15, "Phone number must not exceed 15 characters."),

  payroll_number: z
    .string()
    .min(1, "Payroll number is required.")
    .max(50, "Payroll number must not exceed 50 characters."),

  address: z.string().min(1, "Address is required."),

  staff_image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0].type.startsWith("image/");
      },
      {
        message: "Please select a valid image file.",
      },
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0].size <= 5 * 1024 * 1024;
      },
      {
        message: "Image size must not exceed 5MB.",
      },
    ),
});

type StaffEditFormValues = z.infer<typeof staffEditSchema>;

function StaffEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const staffId = Number(id);

  const { data: staff, isLoading, isError } = useStaffById(staffId);

  const updateStaffMutation = useUpdateStaff();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffEditFormValues>({
    resolver: zodResolver(staffEditSchema),
    defaultValues: {
      name: "",
      age: "",
      phone_number: "",
      payroll_number: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!staff) return;

    reset({
      name: staff.name,
      age: String(staff.age),
      phone_number: staff.phone_number,
      payroll_number: staff.payroll_number,
      address: staff.address,
    });
  }, [staff, reset]);

  const onSubmit = (data: StaffEditFormValues) => {
    if (!staff) return;

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("payroll_number", data.payroll_number);

    if (data.staff_image && data.staff_image.length > 0) {
      formData.append("staff_image", data.staff_image[0]);
    }

    updateStaffMutation.mutate(
      {
        id: staff.id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Staff updated successfully.", {
            description: `${data.name}'s information has been updated.`,
          });

          navigate("/staff/list");
        },

        onError: (error) => {
          const message = getApiErrorMessage(error);

          toast.error("Failed to update staff.", {
            description: message,
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-72 rounded bg-muted" />

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="space-y-5">
              <div className="h-11 rounded-lg bg-muted" />
              <div className="h-11 rounded-lg bg-muted" />
              <div className="h-11 rounded-lg bg-muted" />
              <div className="h-28 rounded-lg bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !staff) {
    return (
      <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <User className="h-7 w-7 text-destructive" />
            </div>

            <h2 className="text-xl font-semibold">Staff member not found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              We could not find the staff member you are trying to edit.
            </p>

            <Button className="mt-6" onClick={() => navigate("/staff/list")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Staff List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Pencil className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Edit Staff
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Update {staff.name}'s information.
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={() => navigate("/staff/list")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Staff List
          </Button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-hidden rounded-2xl border bg-card shadow-sm"
        >
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter full name"
                />

                {errors.name && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="mb-2 block text-sm font-medium">
                  Age
                </label>

                <input
                  id="age"
                  type="number"
                  {...register("age")}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter age"
                />

                {errors.age && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>

                <input
                  id="phone_number"
                  type="text"
                  {...register("phone_number")}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter phone number"
                />

                {errors.phone_number && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Payroll */}
              <div>
                <label
                  htmlFor="payroll_number"
                  className="mb-2 block text-sm font-medium"
                >
                  Payroll Number
                </label>

                <input
                  id="payroll_number"
                  type="text"
                  {...register("payroll_number")}
                  className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter payroll number"
                />

                {errors.payroll_number && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.payroll_number.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  rows={4}
                  {...register("address")}
                  className="w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter address"
                />

                {errors.address && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Current Image */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Current Staff Image
                </label>

                <div className="flex flex-col gap-4 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-background">
                    {staff.staff_image ? (
                      <img
                        src={
                          staff.staff_image.startsWith("http")
                            ? staff.staff_image
                            : `${import.meta.env.VITE_MEDIA_URL}${staff.staff_image}`
                        }
                        alt={staff.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {staff.staff_image
                        ? "Current profile image"
                        : "No profile image"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Choose a new image below only if you want to replace the
                      current one.
                    </p>
                  </div>
                </div>
              </div>

              {/* New Image */}
              <div className="md:col-span-2">
                <label
                  htmlFor="staff_image"
                  className="mb-2 block text-sm font-medium"
                >
                  Replace Staff Image
                </label>

                <div className="rounded-xl border border-dashed bg-muted/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <ImagePlus className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <input
                        id="staff_image"
                        type="file"
                        accept="image/*"
                        {...register("staff_image")}
                        className="block w-full text-sm"
                      />

                      <p className="mt-1 text-xs text-muted-foreground">
                        Maximum file size: 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {errors.staff_image && (
                  <p className="mt-1.5 text-sm text-destructive">
                    {errors.staff_image.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t bg-muted/20 p-5 sm:flex-row sm:justify-end sm:p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/staff/list")}
              disabled={updateStaffMutation.isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={updateStaffMutation.isPending}>
              <Pencil className="mr-2 h-4 w-4" />

              {updateStaffMutation.isPending ? "Updating..." : "Update Staff"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffEditPage;
