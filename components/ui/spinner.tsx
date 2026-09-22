import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("size-4 animate-spin", className)}
      aria-label="Loading"
    />
  );
}
