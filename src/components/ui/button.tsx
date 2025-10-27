import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outline:
        "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
