import Link from "next/link"
import { LifeBuoy } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqs } from "@/lib/mock/faqs"
import type { Faq } from "@/types"

function getFaq(id: string): Faq {
  const found = faqs.find((faq) => faq.id === id)
  return (
    found ?? {
      id,
      question: "",
      answer: "",
    }
  )
}

const billingFaqs: Faq[] = [
  getFaq("f-insurance"),
  {
    id: "f-billing-cycle",
    question: "When am I charged for my subscription?",
    answer:
      "Paid plans are billed monthly on the date you first subscribed. You can see your next billing date anytime from your account settings.",
  },
  {
    id: "f-billing-refund",
    question: "Can I get a refund if I cancel mid-cycle?",
    answer:
      "We prorate refunds for annual plans canceled within 30 days. Monthly plans are not refunded for partial months, but you keep access until the period ends.",
  },
  {
    id: "f-billing-methods",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, along with HSA and FSA cards for eligible visit types.",
  },
]

const appointmentFaqs: Faq[] = [
  getFaq("f-how-booking-works"),
  getFaq("f-telehealth"),
  getFaq("f-cancel"),
  {
    id: "f-appt-late",
    question: "What happens if I'm running late to a video visit?",
    answer:
      "Your doctor will wait up to 10 minutes past your scheduled time. After that, you may need to rebook, so we recommend joining a few minutes early.",
  },
  {
    id: "f-appt-followup",
    question: "Can I book a follow-up with the same doctor?",
    answer:
      "Yes, you can rebook with any doctor you've previously seen directly from your appointment history in your dashboard.",
  },
]

const accountFaqs: Faq[] = [
  {
    id: "f-account-family",
    question: "Can I manage appointments for my children or parents?",
    answer:
      "Plus and Family plans support linked family profiles, so you can book and manage appointments for dependents from one account.",
  },
  {
    id: "f-account-change-email",
    question: "How do I update my email or phone number?",
    answer:
      "Go to Account Settings in your dashboard to update your contact details at any time. We'll send a confirmation to verify the change.",
  },
  {
    id: "f-account-doctor",
    question: "How do I switch my primary care doctor?",
    answer:
      "You're never locked into one doctor. Search for a new specialist anytime and your records carry over automatically.",
  },
  {
    id: "f-account-delete",
    question: "Can I delete my account?",
    answer:
      "Yes. You can permanently delete your account and data from Account Settings, or contact support if you'd like help exporting your records first.",
  },
]

const privacyFaqs: Faq[] = [
  getFaq("f-records"),
  {
    id: "f-privacy-share",
    question: "Do you sell my health data?",
    answer:
      "Never. Vitalis does not sell patient data to advertisers or third parties. Your records are only shared with doctors you choose to see.",
  },
  {
    id: "f-privacy-hipaa",
    question: "Is Vitalis HIPAA compliant?",
    answer:
      "Yes. All data is encrypted in transit and at rest, and our systems undergo regular third-party security audits to stay HIPAA compliant.",
  },
  {
    id: "f-privacy-download",
    question: "Can I download a copy of my medical records?",
    answer:
      "Yes, you can export a full copy of your records, prescriptions, and visit history as a PDF from the Medical Records section of your dashboard.",
  },
]

const categories: { value: string; label: string; items: Faq[] }[] = [
  { value: "billing", label: "Billing", items: billingFaqs },
  { value: "appointments", label: "Appointments", items: appointmentFaqs },
  { value: "account", label: "Account", items: accountFaqs },
  { value: "privacy", label: "Privacy", items: privacyFaqs },
]

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">FAQ</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Answers to your questions
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              Browse by category, or reach out if you can&apos;t find what you&apos;re looking for.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="max-w-3xl">
          <Reveal>
            <Tabs defaultValue="billing">
              <TabsList className="w-full sm:w-fit">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.value} value={category.value} className="mt-8">
                  <div className="rounded-2xl border border-border bg-card px-6 shadow-sm">
                    <Accordion>
                      {category.items.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="py-5 text-base">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <Card className="ring-foreground/5">
              <CardContent className="flex flex-col items-center gap-4 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <LifeBuoy className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">
                      Still need help?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our support team responds within one business day.
                    </p>
                  </div>
                </div>
                <Button render={<Link href="/contact" />}>Contact support</Button>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
