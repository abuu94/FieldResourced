import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { staffService } from "@/services/staffService";

export const STAFF_QUERY_KEY = ["staff"];

// GET ALL STAFF
export const useStaff = () => {
  return useQuery({
    queryKey: STAFF_QUERY_KEY,
    queryFn: staffService.getAll,
  });
};

// GET SINGLE STAFF
export const useStaffById = (id: number) => {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => staffService.getById(id),
    enabled: !!id,
  });
};

// CREATE STAFF
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STAFF_QUERY_KEY,
      });
    },
  });
};

// UPDATE STAFF
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      staffService.update(id, formData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: STAFF_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: ["staff", variables.id],
      });
    },
  });
};

// DELETE STAFF
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STAFF_QUERY_KEY,
      });
    },
  });
};
