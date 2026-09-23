import * as React from "react";

import { cn } from "@/lib/utils";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}

function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-2xl",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
    >
      {children}
    </div>
  );
}

function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <div className="space-y-2">{children}</div>;
}

function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}

function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return <h2 className="text-lg font-semibold tracking-tight">{children}</h2>;
}

function AlertDialogDescription({ children }: AlertDialogDescriptionProps) {
  return <p className="text-sm leading-6 text-muted-foreground">{children}</p>;
}

function AlertDialogAction({
  children,
  className,
  ...props
}: AlertDialogActionProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg",
        "bg-destructive px-4 text-sm font-medium text-destructive-foreground",
        "transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function AlertDialogCancel({
  children,
  className,
  ...props
}: AlertDialogCancelProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg",
        "border border-input bg-background px-4 text-sm font-medium",
        "transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
};
