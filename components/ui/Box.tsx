import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-4 border rounded", className)} {...props} />
    );
  }
);

Box.displayName = "Box";

export { Box };