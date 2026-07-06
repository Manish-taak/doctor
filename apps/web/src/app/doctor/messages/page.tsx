"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/dashboard/page-header"
import { accentGradient } from "@/lib/accent"
import { conversations, messages } from "@/lib/mock/messages"
import { cn } from "@/lib/utils"

export default function DoctorMessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "")
  const [draft, setDraft] = useState("")

  const activeConversation = conversations.find((c) => c.id === activeId)
  const thread = messages.filter((m) => m.conversationId === activeId)

  return (
    <>
      <PageHeader title="Messages" description="Stay in touch with your patients and care team." />

      <Card className="grid grid-cols-1 gap-0 overflow-hidden py-0 ring-foreground/5 md:grid-cols-[280px_1fr]">
        <div className="flex flex-col border-b border-border md:border-r md:border-b-0">
          <ScrollArea className="h-[520px]">
            <div className="flex flex-col">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActiveId(conversation.id)}
                  className={cn(
                    "flex items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-0 hover:bg-muted/50",
                    activeId === conversation.id && "bg-muted"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar>
                      <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[conversation.accent])}>
                        {conversation.initials}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-primary ring-2 ring-background" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{conversation.name}</p>
                      <span className="shrink-0 text-[0.65rem] text-muted-foreground">{conversation.lastMessageAt}</span>
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

        <div className="flex h-[520px] flex-col">
          {activeConversation ? (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Avatar>
                  <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[activeConversation.accent])}>
                    {activeConversation.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">{activeConversation.name}</p>
                  <p className="text-xs text-muted-foreground">{activeConversation.role}</p>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-3 px-4 py-4">
                  {thread.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex flex-col gap-1", message.sender === "me" ? "items-end" : "items-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {message.text}
                      </div>
                      <span className="px-1 text-[0.65rem] text-muted-foreground">{message.time}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex items-center gap-2 border-t border-border p-3">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1"
                />
                <Button
                  size="icon"
                  className="shrink-0"
                  aria-label="Send message"
                  onClick={() => {
                    if (!draft.trim()) return
                    toast.success(`Message sent to ${activeConversation.name}`)
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
