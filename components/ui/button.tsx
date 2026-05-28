"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles — match the design's .btn
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium transition-all duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // amber CTA
        primary:
          "bg-amber text-white hover:bg-amber-hover shadow-[0_1px_0_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.18)]",
        // dark navy
        secondary:
          "bg-ink text-surface hover:bg-ink-2",
        // bordered outline
        ghost:
          "border border-hairline-strong bg-transparent text-ink hover:bg-surface-2",
        // soft fill
        subtle:
          "bg-surface-2 text-ink hover:bg-hairline",
        // destructive (sign-out confirm etc.)
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-8 px-3.5 text-[13px]",
        default: "h-10 px-[18px] text-[14px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
