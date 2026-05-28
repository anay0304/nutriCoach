import { cn } from "@/lib/utils"

// Abstract coach identity — concentric circles, NO human photo/avatar
export function CoachMark({ size = "md", className }: { size?: "xs" | "md" | "lg"; className?: string }) {
  return (
    <div
      className={cn("coach-mark", `size-${size}`, className)}
      aria-label="Your coach"
    />
  )
}
