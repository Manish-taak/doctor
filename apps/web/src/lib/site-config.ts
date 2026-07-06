import type { NavLink } from "@/types"

export const siteConfig = {
  name: "Vitalis",
  tagline: "Healthcare, on your schedule",
  description:
    "Book trusted doctors, manage prescriptions, and see specialists online — all from one calm, beautifully simple platform.",
}

export const mainNav: NavLink[] = [
  { label: "Find Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Find Doctors", href: "/doctors" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "For Doctors", href: "/for-doctors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/faq" },
      { label: "Patient Guide", href: "/about" },
      { label: "Trust & Safety", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "HIPAA Notice", href: "/privacy" },
    ],
  },
]
