import { LayoutDashboard, Settings, Users } from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/staff",
    icon: LayoutDashboard,
  },
  {
    name: "Staff",
    href: "/staff/list",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  return (
    <aside
      className={[
        "min-h-screen w-64 shrink-0 flex-col bg-neutral-950 text-white",
        mobile ? "flex" : "hidden md:flex",
      ].join(" ")}
    >
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            Staff<span className="text-primary">.</span>
          </h1>

          <p className="text-xs text-neutral-400">Management System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "group flex items-center gap-3 rounded-xl px-4 py-3",
                  "text-sm font-medium transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-white/10",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-neutral-300 hover:text-white",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="text-xs text-neutral-500">Staff Management System</p>

        <p className="mt-1 text-xs text-neutral-600">v1.0.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
