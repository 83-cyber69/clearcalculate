import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full min-w-0 items-center justify-center whitespace-normal break-words rounded-xl text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-orange text-white shadow-[0_10px_22px_rgba(255,106,0,0.28)] hover:bg-brand-orangeHover hover:shadow-[0_14px_28px_rgba(255,106,0,0.32)]",
        outline:
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-orange-300 hover:bg-orange-50/70 hover:text-orange-700",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      },
      size: {
        default: "h-11 px-4",
        sm: "h-10 rounded-lg px-3",
        lg: "h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
