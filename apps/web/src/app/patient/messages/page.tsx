"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { accentGradient } from "@/lib/accent"
import { conversations, messages } from "@/lib/mock/messages"
import { cn } from "@/lib/utils"

export default function PatientMessagesPage() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? "")
  const [draft, setDraft] = useState("")
  const selectedConversation = conversations.find((c) => c.id === selectedId)
  const thread = messages.filter((m) => m.conversationId === selectedId)

  return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground">Chat with your doctors and the Vitalis care team.</p>
      </div>

      <Card className="grid h-[calc(100vh-14rem)] min-h-[28rem] grid-cols-1 gap-0 overflow-hidden p-0 ring-foreground/5 md:grid-cols-[19rem_1fr]">
        <div className="flex flex-col border-b border-border md:border-r md:border-b-0">
          <div className="border-b border-border p-4">
            <h2 className="font-heading text-sm font-semibold text-foreground">Conversations</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={cn(
                    "flex items-center gap-3 border-b border-border/60 p-4 text-left transition-colors hover:bg-muted/50",
                    conversation.id === selectedId && "bg-muted"
                  )}
                >
                  <Avatar className="shrink-0">
                    <AvatarFallback
                      className={cn("bg-linear-to-br font-semibold text-white", accentGradient[conversation.accent])}
                    >
                      {conversation.initials}
                    </AvatarFallback>
                    {conversation.online && (
                      <AvatarBadge className="bg-primary ring-2 ring-card" aria-label="Online" />
                    )}
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{conversation.name}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{conversation.lastMessageAt}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <Badge className="shrink-0 bg-primary text-primary-foreground">{conversation.unreadCount}</Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Avatar>
                  <AvatarFallback
                    className={cn("bg-linear-to-br font-semibold text-white", accentGradient[selectedConversation.accent])}
                  >
                    {selectedConversation.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">{selectedConversation.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.role} · {selectedConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-3">
                  {thread.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex flex-col gap-1", message.sender === "me" ? "items-end" : "items-start")}
                    >
                      <div
                        className={cn(
                          "max-w-md rounded-2xl px-3.5 py-2 text-sm",
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {message.text}
                      </div>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                  ))}
                  {thread.length === 0 && (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                      No messages yet in this conversation.
                    </p>
                  )}
                </div>
              </ScrollArea>

              <div className="flex items-center gap-2 border-t border-border p-4">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  className="h-9 flex-1"
                />
                <Button
                  size="icon"
                  aria-label="Send message"
                  onClick={() => {
                    if (!draft.trim()) return
                    toast.success(`Message sent to ${selectedConversation.name}`)
                    setDraft("")
                  }}
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </Card>
    </>
  )
}
