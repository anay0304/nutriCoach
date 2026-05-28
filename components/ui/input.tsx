import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-11 rounded-md bg-surface border border-hairline-strong px-3.5",
          "text-sm text-ink placeholder:text-ink-4",
          "outline-none transition-all duration-150",
          "focus:border-ink-3 focus:ring-2 focus:ring-ink/6",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// Textarea variant
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex w-full rounded-md bg-surface border border-hairline-strong px-3.5 py-3",
        "text-sm text-ink placeholder:text-ink-4 leading-relaxed",
        "outline-none transition-all duration-150 resize-vertical",
        "focus:border-ink-3 focus:ring-2 focus:ring-ink/6",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export { Input, Textarea }
