"use client"

import { useState, useCallback } from "react"
import type { UIMessage } from "ai"
import { ChatSidebar, type Conversation } from "@/components/chat/chat-sidebar"
import { ChatView } from "@/components/chat/chat-view"

function makeId() {
  return Math.random().toString(36).slice(2, 10)
}

function titleFromMessages(messages: UIMessage[]): string {
  const first = messages.find((m) => m.role === "user")
  if (!first) return "New chat"
  const text = first.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("")
  return text.slice(0, 40) || "New chat"
}

export function ChatApp() {
  const initialId = makeId()
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: initialId, title: "New chat" },
  ])
  const [messagesById, setMessagesById] = useState<Record<string, UIMessage[]>>({
    [initialId]: [],
  })
  const [activeId, setActiveId] = useState(initialId)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNew = useCallback(() => {
    const id = makeId()
    setConversations((prev) => [{ id, title: "New chat" }, ...prev])
    setMessagesById((prev) => ({ ...prev, [id]: [] }))
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  const handleDelete = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id)
        if (next.length === 0) {
          const newId = makeId()
          setMessagesById({ [newId]: [] })
          setActiveId(newId)
          return [{ id: newId, title: "New chat" }]
        }
        if (id === activeId) setActiveId(next[0].id)
        return next
      })
      setMessagesById((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    },
    [activeId],
  )

  const handleMessagesChange = useCallback((id: string, messages: UIMessage[]) => {
    setMessagesById((prev) => ({ ...prev, [id]: messages }))
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: titleFromMessages(messages) } : c)),
    )
  }, [])

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNew={handleNew}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
      <ChatView
        key={activeId}
        conversationId={activeId}
        initialMessages={messagesById[activeId] ?? []}
        onMessagesChange={handleMessagesChange}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  )
}
