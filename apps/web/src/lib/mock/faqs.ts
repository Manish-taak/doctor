import type { Faq } from "@/types"

export const faqs: Faq[] = [
  {
    id: "f-how-booking-works",
    question: "How does booking an appointment work?",
    answer:
      "Search by specialty, location, or symptom, pick a doctor and an open time slot, and confirm. You'll get an instant confirmation plus reminders by email and push notification before your visit.",
  },
  {
    id: "f-insurance",
    question: "Is Vitalis covered by my insurance?",
    answer:
      "Most major insurance providers are supported. During checkout you can add your insurance details and we'll show your estimated copay before you confirm the booking.",
  },
  {
    id: "f-telehealth",
    question: "Can I have a video consultation instead of an in-person visit?",
    answer:
      "Yes. Every doctor profile shows whether they offer telehealth. You can switch between in-person and video visits depending on what the doctor supports and what fits your schedule.",
  },
  {
    id: "f-records",
    question: "Where are my medical records stored?",
    answer:
      "All records, prescriptions, and visit summaries live securely in your patient dashboard, encrypted end-to-end and accessible only to you and the doctors you've seen.",
  },
  {
    id: "f-cancel",
    question: "What if I need to reschedule or cancel?",
    answer:
      "You can reschedule or cancel from your dashboard up to 12 hours before your appointment at no charge. Later changes may include a small fee set by the doctor's office.",
  },
]
