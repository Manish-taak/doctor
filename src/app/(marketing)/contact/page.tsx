"use client"

import Link from "next/link"
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import { toast } from "sonner"

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/social-icons"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const offices: {
  id: string
  city: string
  address: string
  phone: string
  hours: string
}[] = [
  {
    id: "office-boston",
    city: "Boston, MA",
    address: "220 Clarendon Street, Suite 900, Boston, MA 02116",
    phone: "(617) 555-0190",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM ET",
  },
  {
    id: "office-austin",
    city: "Austin, TX",
    address: "88 East Sixth Street, Floor 4, Austin, TX 78701",
    phone: "(512) 555-0134",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM CT",
  },
  {
    id: "office-sf",
    city: "San Francisco, CA",
    address: "455 Market Street, Suite 1200, San Francisco, CA 94105",
    phone: "(415) 555-0177",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM PT",
  },
]

const socials = [
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
]

const topics = [
  { value: "general", label: "General question" },
  { value: "billing", label: "Billing & payments" },
  { value: "appointments", label: "Appointments" },
  { value: "partnership", label: "Partnership inquiry" },
  { value: "press", label: "Press" },
]

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">Contact</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              We&apos;d love to hear from you
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              Questions about billing, partnerships, or just want to say hello? Reach out and our team
              will get back to you within one business day.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Card className="h-full ring-foreground/5">
              <CardContent className="flex h-full flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-heading text-xl font-semibold text-foreground">Send a message</h2>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we&apos;ll route it to the right team.
                  </p>
                </div>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    toast.success("Message sent — we'll get back to you soon.")
                    event.currentTarget.reset()
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" name="name" placeholder="Jordan Miller" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" name="email" type="email" placeholder="jordan@email.com" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="topic">Topic</Label>
                    <Select name="topic" defaultValue="general">
                      <SelectTrigger id="topic" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button size="lg" type="submit" className="gap-1.5 sm:w-fit">
                    Send message <Send className="size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal delay={0.08}>
              <div
                aria-hidden
                className="relative flex h-40 items-center justify-center overflow-hidden rounded-sm bg-linear-to-br from-primary/20 via-secondary to-coral/10 ring-1 ring-foreground/5"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_30%_20%,color-mix(in_oklch,var(--color-primary)_25%,transparent),transparent)]"
                />
                <MapPin className="size-8 text-primary/60" strokeWidth={1.5} />
              </div>
            </Reveal>

            <StaggerGroup className="flex flex-col gap-4">
              {offices.map((office) => (
                <StaggerItem key={office.id}>
                  <Card className="ring-foreground/5">
                    <CardContent className="flex flex-col gap-3">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {office.city}
                      </h3>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <span className="flex items-start gap-2">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                          {office.address}
                        </span>
                        <span className="flex items-center gap-2">
                          <Phone className="size-4 shrink-0 text-primary" />
                          {office.phone}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="size-4 shrink-0 text-primary" />
                          {office.hours}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.16}>
              <Card className="ring-foreground/5">
                <CardContent className="flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Mail className="size-4 text-primary" /> support@vitalis.health
                  </span>
                  <div className="flex items-center gap-2">
                    {socials.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        <social.icon className="size-4" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
