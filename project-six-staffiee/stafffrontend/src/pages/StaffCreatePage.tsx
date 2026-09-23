// import axios from "axios";
import { ArrowLeft, ImagePlus, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateStaff } from "@/hooks/useStaff";
import { getApiErrorMessage } from "@/utils/apiError";

const staffCreateSchema = z.object({
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
        if (!files || files.length === 0) {
          return true;
        }

        return files[0].type.startsWith("image/");
      },
      {
        message: "Please select a valid image file.",
      },
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) {
          return true;
        }

        return files[0].size <= 5 * 1024 * 1024;
      },
      {
        message: "Image size must not exceed 5MB.",
      },
    ),
});

type StaffCreateFormValues = z.infer<typeof staffCreateSchema>;

function StaffCreatePage() {
  const navigate = useNavigate();

  const createStaffMutation = useCreateStaff();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffCreateFormValues>({
    resolver: zodResolver(staffCreateSchema),
    defaultValues: {
      name: "",
      age: "",
      phone_number: "",
      payroll_number: "",
      address: "",
    },
  });

  const onSubmit = (data: StaffCreateFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);
    formData.append("payroll_number", data.payroll_number);

    if (data.staff_image && data.staff_image.length > 0) {
      formData.append("staff_image", data.staff_image[0]);
    }

    createStaffMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Staff added successfully.", {
          description: `${data.name} has been added to the staff list.`,
        });

        navigate("/staff/list");
      },

      onError: (error) => {
        const message = getApiErrorMessage(error);

        toast.error("Failed to add staff.", {
          description: message,
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add Staff</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Add a new staff member to the system.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => navigate("/staff/list")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Staff List
        </Button>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-border bg-card shadow-sm"
      >
        {/* Form Header */}
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold">Staff Information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter the staff member's information below.
          </p>
        </div>

        {/* Form Fields */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter full name"
                {...register("name")}
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium">
                Age
              </label>

              <input
                id="age"
                type="number"
                placeholder="Enter age"
                min="1"
                {...register("age")}
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.age && (
                <p className="text-sm text-destructive">{errors.age.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label htmlFor="phone_number" className="text-sm font-medium">
                Phone Number
              </label>

              <input
                id="phone_number"
                type="tel"
                placeholder="+255700000000"
                {...register("phone_number")}
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.phone_number && (
                <p className="text-sm text-destructive">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Payroll Number */}
            <div className="space-y-2">
              <label htmlFor="payroll_number" className="text-sm font-medium">
                Payroll Number
              </label>

              <input
                id="payroll_number"
                type="text"
                placeholder="e.g. PR001"
                {...register("payroll_number")}
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.payroll_number && (
                <p className="text-sm text-destructive">
                  {errors.payroll_number.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>

              <textarea
                id="address"
                rows={4}
                placeholder="Enter staff address"
                {...register("address")}
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Staff Image */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="staff_image" className="text-sm font-medium">
                Staff Image
              </label>

              <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 transition-colors hover:border-primary/50">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <ImagePlus className="h-6 w-6 text-primary" />
                  </div>

                  <p className="mt-3 text-sm font-medium">Upload staff image</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG or JPEG — Maximum 5MB
                  </p>

                  <input
                    id="staff_image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    {...register("staff_image")}
                    className="mt-4 block w-full max-w-sm text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90"
                  />

                  {errors.staff_image && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.staff_image.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-border p-6 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            type="button"
            disabled={createStaffMutation.isPending}
            onClick={() => navigate("/staff/list")}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={createStaffMutation.isPending}>
            <UserPlus className="mr-2 h-4 w-4" />

            {createStaffMutation.isPending ? "Adding..." : "Add Staff"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StaffCreatePage;

// import { ArrowLeft, ImagePlus, UserPlus } from "lucide-react";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";

// import { Button } from "@/components/ui/button";

// const staffCreateSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Full name is required.")
//     .max(100, "Full name must not exceed 100 characters."),

//   age: z
//     .string()
//     .min(1, "Age is required.")
//     .refine(
//       (value) => {
//         const age = Number(value);
//         return Number.isInteger(age) && age > 0;
//       },
//       {
//         message: "Age must be a positive whole number.",
//       },
//     ),

//   phone_number: z
//     .string()
//     .min(1, "Phone number is required.")
//     .max(15, "Phone number must not exceed 15 characters."),

//   payroll_number: z
//     .string()
//     .min(1, "Payroll number is required.")
//     .max(50, "Payroll number must not exceed 50 characters."),

//   address: z.string().min(1, "Address is required."),

//   staff_image: z
//     .custom<FileList>()
//     .optional()
//     .refine(
//       (files) => {
//         if (!files || files.length === 0) {
//           return true;
//         }

//         return files[0].type.startsWith("image/");
//       },
//       {
//         message: "Please select a valid image file.",
//       },
//     )
//     .refine(
//       (files) => {
//         if (!files || files.length === 0) {
//           return true;
//         }

//         return files[0].size <= 5 * 1024 * 1024;
//       },
//       {
//         message: "Image size must not exceed 5MB.",
//       },
//     ),
// });

// type StaffCreateFormValues = z.infer<typeof staffCreateSchema>;

// function StaffCreatePage() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<StaffCreateFormValues>({
//     resolver: zodResolver(staffCreateSchema),
//     defaultValues: {
//       name: "",
//       age: "",
//       phone_number: "",
//       payroll_number: "",
//       address: "",
//     },
//   });

//   const onSubmit = (data: StaffCreateFormValues) => {
//     console.log("Validated form data:", data);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
//             <UserPlus className="h-5 w-5 text-primary" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">Add Staff</h1>

//             <p className="mt-1 text-sm text-muted-foreground">
//               Add a new staff member to the system.
//             </p>
//           </div>
//         </div>

//         <Button variant="outline" onClick={() => navigate("/staff/list")}>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Staff List
//         </Button>
//       </div>

//       {/* Form Card */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="rounded-2xl border border-border bg-card shadow-sm"
//       >
//         {/* Form Header */}
//         <div className="border-b border-border p-6">
//           <h2 className="text-lg font-semibold">Staff Information</h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             Enter the staff member's information below.
//           </p>
//         </div>

//         {/* Form Fields */}
//         <div className="p-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Full Name */}
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-sm font-medium">
//                 Full Name
//               </label>

//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter full name"
//                 {...register("name")}
//                 className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//               {errors.name && (
//                 <p className="text-sm text-destructive">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Age */}
//             <div className="space-y-2">
//               <label htmlFor="age" className="text-sm font-medium">
//                 Age
//               </label>

//               <input
//                 id="age"
//                 type="number"
//                 placeholder="Enter age"
//                 min="1"
//                 {...register("age")}
//                 className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//               {errors.age && (
//                 <p className="text-sm text-destructive">{errors.age.message}</p>
//               )}
//             </div>

//             {/* Phone Number */}
//             <div className="space-y-2">
//               <label htmlFor="phone_number" className="text-sm font-medium">
//                 Phone Number
//               </label>

//               <input
//                 id="phone_number"
//                 type="tel"
//                 placeholder="+255700000000"
//                 {...register("phone_number")}
//                 className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//               {errors.phone_number && (
//                 <p className="text-sm text-destructive">
//                   {errors.phone_number.message}
//                 </p>
//               )}
//             </div>

//             {/* Payroll Number */}
//             <div className="space-y-2">
//               <label htmlFor="payroll_number" className="text-sm font-medium">
//                 Payroll Number
//               </label>

//               <input
//                 id="payroll_number"
//                 type="text"
//                 placeholder="e.g. PR001"
//                 {...register("payroll_number")}
//                 className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//               {errors.payroll_number && (
//                 <p className="text-sm text-destructive">
//                   {errors.payroll_number.message}
//                 </p>
//               )}
//             </div>

//             {/* Address */}
//             <div className="space-y-2 md:col-span-2">
//               <label htmlFor="address" className="text-sm font-medium">
//                 Address
//               </label>

//               <textarea
//                 id="address"
//                 rows={4}
//                 placeholder="Enter staff address"
//                 {...register("address")}
//                 className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
//               />

//               {errors.address && (
//                 <p className="text-sm text-destructive">
//                   {errors.address.message}
//                 </p>
//               )}
//             </div>

//             {/* Staff Image */}
//             <div className="space-y-2 md:col-span-2">
//               <label htmlFor="staff_image" className="text-sm font-medium">
//                 Staff Image
//               </label>

//               <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-6 transition-colors hover:border-primary/50">
//                 <div className="flex flex-col items-center justify-center text-center">
//                   <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
//                     <ImagePlus className="h-6 w-6 text-primary" />
//                   </div>

//                   <p className="mt-3 text-sm font-medium">Upload staff image</p>

//                   <p className="mt-1 text-xs text-muted-foreground">
//                     PNG, JPG or JPEG — Maximum 5MB
//                   </p>

//                   <input
//                     id="staff_image"
//                     type="file"
//                     accept="image/png,image/jpeg,image/jpg"
//                     {...register("staff_image")}
//                     className="mt-4 block w-full max-w-sm text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90"
//                   />

//                   {errors.staff_image && (
//                     <p className="mt-2 text-sm text-destructive">
//                       {errors.staff_image.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex flex-col-reverse gap-3 border-t border-border p-6 sm:flex-row sm:justify-end">
//           <Button
//             variant="outline"
//             type="button"
//             onClick={() => navigate("/staff/list")}
//           >
//             Cancel
//           </Button>

//           <Button type="submit">
//             <UserPlus className="mr-2 h-4 w-4" />
//             Add Staff
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default StaffCreatePage;
