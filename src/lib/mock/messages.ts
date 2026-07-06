import type { Conversation, Message } from "@/types"

export const conversations: Conversation[] = [
  {
    id: "conv-amara-chen",
    name: "Dr. Amara Chen",
    initials: "AC",
    accent: "primary",
    role: "Cardiologist",
    lastMessage: "Your latest results look great — keep up the routine!",
    lastMessageAt: "9:42 AM",
    unreadCount: 2,
    online: true,
  },
  {
    id: "conv-marcus-obi",
    name: "Dr. Marcus Obi",
    initials: "MO",
    accent: "coral",
    role: "Dermatologist",
    lastMessage: "Let's check in again in two weeks.",
    lastMessageAt: "Yesterday",
    unreadCount: 0,
    online: false,
  },
  {
    id: "conv-front-desk",
    name: "Vitalis Front Desk",
    initials: "VD",
    accent: "amber",
    role: "Support",
    lastMessage: "Your insurance verification is complete.",
    lastMessageAt: "Mon",
    unreadCount: 0,
    online: true,
  },
  {
    id: "conv-elena-kova",
    name: "Dr. Elena Kovač",
    initials: "EK",
    accent: "violet",
    role: "Neurologist",
    lastMessage: "Please log any migraine episodes this week.",
    lastMessageAt: "Last week",
    unreadCount: 1,
    online: false,
  },
]

export const messages: Message[] = [
  { id: "m1", conversationId: "conv-amara-chen", sender: "them", text: "Hi James, I reviewed your latest lipid panel.", time: "9:30 AM" },
  { id: "m2", conversationId: "conv-amara-chen", sender: "them", text: "Your LDL has improved nicely since last quarter.", time: "9:31 AM" },
  { id: "m3", conversationId: "conv-amara-chen", sender: "me", text: "That's great to hear! Should I keep the same dosage?", time: "9:35 AM" },
  { id: "m4", conversationId: "conv-amara-chen", sender: "them", text: "Yes, let's keep the current dose and recheck in 3 months.", time: "9:40 AM" },
  { id: "m5", conversationId: "conv-amara-chen", sender: "them", text: "Your latest results look great — keep up the routine!", time: "9:42 AM" },
]
