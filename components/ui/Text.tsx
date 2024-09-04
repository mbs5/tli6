import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-base", className)} {...props} />
    );
  }
);

Text.displayName = "Text";

export { Text };