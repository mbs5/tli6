import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("container mx-auto p-4", className)} {...props} />
    );
  }
);

Container.displayName = "Container";

export { Container };