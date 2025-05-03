import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TimelineProps {
  children: ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("relative ml-3", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      {children}
    </div>
  )
}

interface TimelineItemProps {
  children: ReactNode
  className?: string
}

function TimelineItem({ children, className }: TimelineItemProps) {
  return <div className={cn("relative pl-6", className)}>{children}</div>
}

interface TimelineIndicatorProps {
  children: ReactNode
  className?: string
}

function TimelineIndicator({ children, className }: TimelineIndicatorProps) {
  return (
    <div
      className={cn(
        "absolute left-0 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-background border",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface TimelineContentProps {
  children: ReactNode
  className?: string
}

function TimelineContent({ children, className }: TimelineContentProps) {
  return <div className={cn("pb-2", className)}>{children}</div>
}

TimelineItem.Indicator = TimelineIndicator
TimelineItem.Content = TimelineContent

export { TimelineItem }
