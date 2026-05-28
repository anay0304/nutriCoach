export interface User {
  name: string
  fullName: string
  email: string
  joinedDays: number
}

export interface Goal {
  id: string
  title: string
  detail: string
  cadence: string
  progress: number // 0–1
}

export interface ActionStep {
  id: string
  text: string
  done: boolean
}

export interface Session {
  id: string
  title: string
  date: string
  type: "intake" | "session" | "check-in"
  duration: number // minutes
  preview: string
}

export interface LastSession {
  id: string
  when: string
  title: string
  sessionNumber: number
  durationMin: number
  summary: string
  actionSteps: ActionStep[]
  struggles: string[]
  backupPlans: string[]
}

export interface Resource {
  id: string
  title: string
  kind: "Guide" | "Worksheet" | "Audio"
  pages: number | null
  time: string
  tag: string
  desc: string
}

export interface Message {
  role: "coach" | "user"
  text: string
}

export type DashboardLayout = "hero" | "focus" | "split"
export type ChatStyle = "bubble" | "minimal" | "paper"
export type Density = "compact" | "regular" | "spacious"
