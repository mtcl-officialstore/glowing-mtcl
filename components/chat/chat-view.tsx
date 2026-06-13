"use client"

import { useState, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Copy, Check, Menu, Sparkles, PenLine, Code2, Lightbulb, GraduationCap } from "lucide-react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion"
import { Button } from "@/components/ui/button"
import { ModelSelector } from "@/components/chat/model-selector"
import { DEFAULT_MODEL } from "@/lib/models"

const SUGGESTIONS = [
  { icon: PenLine, label: "Write a polite follow-up email to a client" },
  { icon: Code2, label: "Explain async/await in JavaScript with examples" },
  { icon: Lightbulb, label: "Give me 5 creative ideas for a weekend project" },
  { icon: GraduationCap, label: "Explain quantum computing like I'm 12" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])
  return (
    <MessageAction tooltip={copied ? "Copied" : "Copy"} onClick={onCopy}>
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </MessageAction>
  )
}

function getText(message: UIMessage): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join("")
}

export function ChatView({
  conversationId,
  initialMessages,
  onMessagesChange,
  onOpenSidebar,
}: {
  conversationId: string
  initialMessages: UIMessage[]
  onMessagesChange: (id: string, messages: UIMessage[]) => void
  onOpenSidebar: () => void
}) {
  const [model, setModel] = useState(DEFAULT_MODEL)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status, stop } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages: msgs }) => ({
        body: { messages: msgs, model },
      }),
    }),
    onFinish: ({ messages: msgs }) => onMessagesChange(conversationId, msgs),
  })

  const isBusy = status === "submitted" || status === "streaming"

  const submit = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isBusy) return
      sendMessage({ text: trimmed })
      setInput("")
    },
    [isBusy, sendMessage],
  )

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      submit(message.text ?? input)
    },
    [submit, input],
  )

  const isEmpty = messages.length === 0

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center gap-1 border-b border-border px-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </Button>
        <ModelSelector value={model} onChange={setModel} />
      </header>

      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Sparkles className="size-6" />
              </div>
              <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                How can I help you today?
              </h1>
              <p className="mt-2 text-pretty text-sm text-muted-foreground">
                Ask me anything — from writing and coding to research and brainstorming.
              </p>
            </div>

            <PromptInput onSubmit={handleSubmit} className="rounded-2xl shadow-sm">
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Nova..."
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools />
                <PromptInputSubmit status={status} onStop={stop} disabled={!input.trim() && !isBusy} />
              </PromptInputFooter>
            </PromptInput>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => submit(s.label)}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-accent"
                >
                  <s.icon className="size-4 shrink-0 text-primary" />
                  <span className="text-pretty text-muted-foreground">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Conversation>
            <ConversationContent className="mx-auto w-full max-w-3xl">
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      if (part.type === "text") {
                        return (
                          <MessageResponse key={`${message.id}-${i}`}>{part.text}</MessageResponse>
                        )
                      }
                      return null
                    })}
                    {message.role === "assistant" && (
                      <MessageActions className="mt-1">
                        <CopyButton text={getText(message)} />
                      </MessageActions>
                    )}
                  </MessageContent>
                </Message>
              ))}
              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                      <span className="size-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                      <span className="size-2 animate-bounce rounded-full bg-current" />
                    </div>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="mx-auto w-full max-w-3xl px-4 pb-4">
            <Suggestions className="mb-2">
              {SUGGESTIONS.map((s) => (
                <Suggestion key={s.label} suggestion={s.label} onClick={submit} />
              ))}
            </Suggestions>
            <PromptInput onSubmit={handleSubmit} className="rounded-2xl shadow-sm">
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Nova..."
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools />
                <PromptInputSubmit status={status} onStop={stop} disabled={!input.trim() && !isBusy} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Nova can make mistakes. Consider checking important information.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
