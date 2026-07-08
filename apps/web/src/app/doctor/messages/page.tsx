import { getConversations } from "@/lib/api/conversations"
import { MessagesView } from "@/app/patient/messages/messages-view"

export default async function DoctorMessagesPage() {
  const conversations = await getConversations()

  return <MessagesView conversations={conversations} description="Chat with your patients and the Vitalis care team." />
}
