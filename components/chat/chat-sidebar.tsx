"use client"

import { MessageSquarePlus, MessageSquare, Trash2, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/chat/theme-toggle"
import { cn } from "@/lib/utils"

export type Conversation = {
  id: string
  title: string
}

export function ChatSidebar({
  conversations,
  activeId,
  open,
  onClose,
  onNew,
  onSelect,
  onDelete,
}: {
  conversations: Conversation[]
  activeId: string | null
  open: boolean
  onClose: () => void
  onNew: () => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Nova</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose} aria-label="Close sidebar">
            <X className="size-5" />
          </Button>
        </div>

        <div className="px-3">
          <Button
            onClick={onNew}
            className="w-full justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
            variant="secondary"
          >
            <MessageSquarePlus className="size-4" />
            New chat
          </Button>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Recent</p>
          {conversations.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">No conversations yet</p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <div
                    className={cn(
                      "group flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                      conv.id === activeId
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/60",
                    )}
                  >
                    <button
                      onClick={() => onSelect(conv.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    >
                      <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{conv.title}</span>
                    </button>
                    <button
                      onClick={() => onDelete(conv.id)}
                      className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="flex items-center justify-between border-t border-sidebar-border px-4 py-3">
          <span className="text-xs text-muted-foreground">Nova AI Assistant</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}
