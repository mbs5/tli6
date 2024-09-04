import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1 ref={ref} className={cn("text-2xl font-bold", className)} {...props} />
    );
  }
);

Heading.displayName = "Heading";

export { Heading };