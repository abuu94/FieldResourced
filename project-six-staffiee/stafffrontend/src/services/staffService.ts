import api from "@/utils/http";
import type { Staff } from "@/types/staff";

export const staffService = {
  // GET /api/staff/
  getAll: async (): Promise<Staff[]> => {
    const response = await api.get<Staff[]>("/staff/");
    return response.data;
  },

  // GET /api/staff/:id/
  getById: async (id: number): Promise<Staff> => {
    const response = await api.get<Staff>(`/staff/${id}/`);
    return response.data;
  },

  // POST /api/staff/
  create: async (formData: FormData): Promise<Staff> => {
    const response = await api.post<Staff>("/staff/", formData);
    return response.data;
  },

  // PUT /api/staff/:id/
  update: async (id: number, formData: FormData): Promise<Staff> => {
    const response = await api.put<Staff>(`/staff/${id}/`, formData);
    return response.data;
  },

  // PATCH /api/staff/:id/
  patch: async (id: number, formData: FormData): Promise<Staff> => {
    const response = await api.patch<Staff>(`/staff/${id}/`, formData);
    return response.data;
  },

  // DELETE /api/staff/:id/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/staff/${id}/`);
  },
};
