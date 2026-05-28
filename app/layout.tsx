import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NutriCoach — Personalized nutrition coaching",
  description:
    "A conversation, not a tracker. Your AI coach helps you build sustainable habits one small choice at a time.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
