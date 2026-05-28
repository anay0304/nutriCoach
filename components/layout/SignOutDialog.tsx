"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SignOutDialogProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function SignOutDialog({ open, onCancel, onConfirm }: SignOutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="w-[420px]">
        <div className="p-8 pr-10">
          <div
            className="text-[10.5px] tracking-[0.14em] uppercase text-ink-3 mb-2.5"
            style={{ fontFamily: "var(--mono)" }}
          >
            Signing out
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2.5">
              See you when you&apos;re ready.
            </DialogTitle>
            <DialogDescription className="text-sm text-ink-3 leading-relaxed mb-6">
              Your conversation is saved. Your coach will be here, exactly where you left off.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2.5 justify-end">
            <Button variant="ghost" onClick={onCancel}>Stay</Button>
            <Button variant="secondary" onClick={onConfirm}>Sign out</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
