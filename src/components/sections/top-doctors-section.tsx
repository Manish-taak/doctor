import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DoctorCard } from "@/components/cards/doctor-card";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/mock/doctors";

export function TopDoctorsSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-col items-center justify-center sm:justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col items-center sm:items-start gap-4">
            <Badge variant="secondary">Top specialists</Badge>
            <h2 className="font-heading text-center sm:text-left  text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Meet doctors patients love
            </h2>
            <p className="text-lg text-center sm:text-left  text-balance text-muted-foreground">
              Every specialist on Vitalis is licensed, credential-verified, and
              rated by real patients.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-1.5"
            render={<Link href="/doctors" />}
          >
            View all doctors <ArrowRight className="size-4" />
          </Button>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
