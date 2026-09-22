import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-border bg-transparent",
        variant === "ghost" && "bg-transparent",
        size === "default" && "h-10 px-4",
        size === "sm" && "h-8 px-3 text-sm",
        size === "lg" && "h-11 px-6",
        className,
      )}
      {...props}
    />
  );
}
