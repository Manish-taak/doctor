import { getConversations } from "@/lib/api/conversations"

import { MessagesView } from "./messages-view"

export default async function PatientMessagesPage() {
  const conversations = await getConversations()

  return <MessagesView conversations={conversations} />
}
