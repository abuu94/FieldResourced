import { Bell, Menu, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick?: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Heading */}
          <div>
            <h2 className="text-lg font-bold tracking-tight md:text-xl">
              Staff Management
            </h2>

            <p className="hidden text-sm text-muted-foreground sm:block">
              Manage your staff records efficiently.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />

            {/* Notification indicator */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>

          {/* User */}
          <div className="ml-2 hidden items-center gap-3 border-l border-border pl-4 sm:flex">
            <UserCircle className="h-9 w-9 text-muted-foreground" />

            <div className="hidden lg:block">
              <p className="text-sm font-semibold">Administrator</p>

              <p className="text-xs text-muted-foreground">Staff Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
