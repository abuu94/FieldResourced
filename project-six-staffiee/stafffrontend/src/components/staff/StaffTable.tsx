import { Eye, Pencil, Trash2, UserRound } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { Staff } from "@/types/staff";

interface StaffTableProps {
  staff: Staff[];
  onDelete?: (staff: Staff) => void;
}

function StaffTable({ staff, onDelete }: StaffTableProps) {
  const navigate = useNavigate();

  const handleView = (id: number) => {
    navigate(`/staff/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/staff/${id}/edit`);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Staff
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payroll Number
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Age
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Address
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {staff.map((member) => (
              <tr
                key={member.id}
                className="transition-colors hover:bg-muted/40"
              >
                {/* Staff */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
                      {member.staff_image ? (
                        <img
                          src={member.staff_image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-foreground">
                        {member.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        ID: {member.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Payroll Number */}
                <td className="px-6 py-4 text-sm font-medium">
                  {member.payroll_number}
                </td>

                {/* Age */}
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {member.age}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {member.phone_number}
                </td>

                {/* Address */}
                <td className="max-w-xs px-6 py-4 text-sm text-muted-foreground">
                  <p className="truncate" title={member.address}>
                    {member.address}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* View */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleView(member.id)}
                      aria-label={`View ${member.name}`}
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleEdit(member.id)}
                      aria-label={`Edit ${member.name}`}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {/* Delete */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete?.(member)}
                      aria-label={`Delete ${member.name}`}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffTable;
