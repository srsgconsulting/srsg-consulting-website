import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  FileSignature,
  HeartPulse,
  ShieldCheck,
  Users,
  ScrollText,
  Briefcase,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { client } from "@/tina/__generated__/client";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ServicesGrid />
      <WhyChoose />
      <StatsBar />
      <BlogPreview />
      <CtaStrip />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-text-inverse) 0px, var(--color-text-inverse) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          animation: "srsgHeroFloat 10s ease-in-out infinite",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-text-inverse/80">
              SRSG CONSULTING
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-text-inverse">
              Empowering Your Business with Expert Compliance Solutions
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-inverse/85">
              Simplify, Comply, and Grow with SRSG Consulting
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-3 text-base font-semibold text-text-inverse shadow-cta transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
                style={{
                  boxShadow: "var(--shadow-cta)",
                }}
              >
                Request Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-text-inverse/50 px-8 py-3 text-base font-semibold text-text-inverse backdrop-blur-sm transition-colors hover:bg-text-inverse/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              >
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes srsgHeroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(2px); }
        }
      `}</style>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    {
      title: "ESI (Employees' State Insurance)",
      description:
        "Registration, monthly compliance, and end-to-end guidance for ESI coverage and filings.",
      href: "/esi",
      icon: ShieldCheck,
    },
    {
      title: "EPFO (Provident Fund)",
      description:
        "PF registration, returns, challans, and ongoing compliance to keep your payroll smooth.",
      href: "/epfo",
      icon: Users,
    },
    {
      title: "Factories Act Compliance",
      description:
        "Compliance support, records, and advisory for factory licensing and statutory requirements.",
      href: "/factories-act",
      icon: Building2,
    },
    {
      title: "Compliance Consulting",
      description:
        "Practical compliance strategy and support tailored to your business operations.",
      href: "/compliance-consulting",
      icon: Briefcase,
    },
    {
      title: "Digital Signature Certificate",
      description:
        "DSC procurement and renewal support for secure online filings and submissions.",
      href: "/digital-signature",
      icon: FileSignature,
    },
    {
      title: "Health Insurance",
      description:
        "Support with corporate health insurance selection, renewals, and employee coverage needs.",
      href: "/health-insurance",
      icon: HeartPulse,
    },
  ] as const;

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-cta">
              OUR SERVICES
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary">
              Comprehensive Compliance Solutions
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.href}>
                <div className="h-full rounded-2xl border border-border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:border-cta">
                  <div className="p-7">
                    <div className="h-12 w-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-primary">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-text leading-relaxed">
                      {s.description}
                    </p>
                    <Link
                      href={s.href}
                      className="mt-5 inline-flex items-center font-semibold text-cta hover:text-cta-hover transition-colors"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const points = [
    { label: "Years of Expertise", icon: BadgeCheck },
    { label: "End-to-End Compliance Support", icon: ScrollText },
    { label: "Dedicated Client Service", icon: Users },
    { label: "Transparent & Affordable Pricing", icon: Megaphone },
  ] as const;

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why We Stand Out
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.label}>
                <div className="rounded-2xl border border-border bg-surface p-7 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-cta/15 text-cta flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-primary">
                        {p.label}
                      </p>
                      <p className="mt-2 text-text-muted">
                        Trusted support designed to keep your business compliant and confident.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "500+", label: "Clients Served" },
    { value: "10+", label: "Years Experience" },
    { value: "100%", label: "Compliance Rate" },
  ] as const;

  return (
    <section className="bg-primary text-text-inverse py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold">{s.value}</p>
              <p className="mt-2 text-text-inverse/80 font-medium">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

async function BlogPreview() {
  const res = await client.queries.postConnection({
    sort: "publishDate",
    last: 3,
  });
  const posts = (res.data.postConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-cta">
            LATEST INSIGHTS
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary">
            News & Articles
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const tag = post.tags?.[0] ?? "";
            const date = post.publishDate
              ? new Date(post.publishDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "";
            const excerpt =
              post.excerpt?.trim() || "Read the full article →";

            return (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-2xl border border-border bg-background shadow-soft transition-all hover:-translate-y-1 hover:shadow-card hover:border-cta"
                >
                  <div className="p-7">
                    {tag && (
                      <span className="inline-flex items-center rounded-full bg-cta/15 px-3 py-1 text-xs font-semibold text-cta">
                        {tag}
                      </span>
                    )}
                    <h3 className="mt-4 text-xl font-semibold text-primary group-hover:text-primary-light transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted">{date}</p>
                    <p className="mt-4 text-text-muted leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center font-semibold text-cta hover:text-cta-hover transition-colors"
          >
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="bg-cta text-text-inverse py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Simplify Your Compliance Journey?
            </h2>
            <p className="mt-3 text-text-inverse/85 text-lg">
              Get expert guidance from our team today.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-background px-8 py-3 text-base font-semibold text-primary shadow-soft transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse"
          >
            Request Free Consultation
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
