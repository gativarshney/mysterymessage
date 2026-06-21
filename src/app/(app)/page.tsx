'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import PageAura from '@/components/ui/page-aura'
import MonoBadge from '@/components/ui/mono-badge'
import { Mail, ArrowRight, PlayCircle, EyeOff, Sparkles, Zap, UserPlus, Link2, Inbox } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'

const messagesTemplate = [
  {
    title: "From Secret Admirer",
    content: "I've been noticing your work lately. You have an incredible eye for clean designs!",
    time: "2 hours ago"
  },
  {
    title: "From Anonymous Teammate",
    content: "Hey, thanks for helping out during the server crunch yesterday. You're a lifesaver.",
    time: "5 hours ago"
  },
  {
    title: "From Ghost User",
    content: "If you could change one thing about this project without telling anyone, what would it be?",
    time: "Yesterday"
  }
]

const steps = [
  {
    icon: UserPlus,
    iconClass: "text-violet-300",
    step: "01",
    title: "Create your account",
    description: "Sign up with a username, email, and password — verified in seconds.",
  },
  {
    icon: Link2,
    iconClass: "text-pink-300",
    step: "02",
    title: "Share your link",
    description: "Your unique mystery-message.app/u/username link goes anywhere — bio, story, DMs.",
  },
  {
    icon: Inbox,
    iconClass: "text-emerald-300",
    step: "03",
    title: "Read what they really think",
    description: "Anonymous messages land in your private dashboard, with full control to delete or toggle them off.",
  },
]

const features = [
  {
    icon: EyeOff,
    iconClass: "text-violet-300",
    badgeClass: "border-violet-500/20 bg-violet-500/10",
    title: "Fully anonymous",
    description: "No usernames, no IPs, no metadata. Senders are never identified — not even to us.",
  },
  {
    icon: Sparkles,
    iconClass: "text-pink-300",
    badgeClass: "border-pink-500/20 bg-pink-500/10",
    title: "AI-assisted prompts",
    description: "Stuck on what to say? Generate a thoughtful conversation starter in one tap, powered by Gemini.",
  },
  {
    icon: Zap,
    iconClass: "text-emerald-300",
    badgeClass: "border-emerald-500/20 bg-emerald-500/10",
    title: "Instant inbox",
    description: "Messages land in your dashboard the moment they're sent — no refresh, no delay.",
  },
]

const Home = () => {
  const { data: session } = useSession()

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4 py-16 text-neutral-100">
      <PageAura variant="mixed" />

      <div className="relative z-10 flex w-full flex-col items-center">

        {/* HERO HEADER */}
        <section className="mb-12 max-w-2xl space-y-6 text-center">
          <div className="flex justify-center">
            <MonoBadge>end-to-end anonymous</MonoBadge>
          </div>

          <h1 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
            Say what you mean.<br />Stay who you are.
          </h1>

          <p className="mx-auto max-w-md text-base text-neutral-400 sm:text-lg">
            Mystery Message gives your audience a direct line to send honest, anonymous feedback — no account, no trace, just the message.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href={session ? "/dashboard" : "/sign-up"}>
              <Button className="h-11 gap-2 rounded-xl bg-neutral-100 px-6 text-sm font-semibold tracking-tight text-neutral-950 shadow-md transition-all hover:bg-neutral-200 active:scale-95">
                {session ? "Go to dashboard" : "Create your link"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-xl border-white/10 bg-transparent px-5 text-sm font-medium text-neutral-300 hover:bg-white/[0.05]"
              >
                <PlayCircle className="h-4 w-4" />
                See how it works
              </Button>
            </a>
          </div>
        </section>

        {/* RE-USABLE CAROUSEL CONTAINER */}
        <section className="w-full max-w-lg px-4 md:max-w-xl">
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full"
          >
            <CarouselContent>
              {messagesTemplate.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="rounded-2xl border-white/10 bg-white/[0.025] text-neutral-100 shadow-xl backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-center gap-3 pb-3">
                        <Mail className="h-5 w-5 shrink-0 text-neutral-400" />
                        <div className="space-y-0.5">
                          <CardTitle className="text-base font-semibold tracking-tight text-neutral-200">
                            {message.title}
                          </CardTitle>
                          <p className="text-xs text-neutral-500">{message.time}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="break-words text-sm leading-relaxed text-neutral-300 sm:text-base">
                          &quot;{message.content}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden border-white/10 bg-white/[0.04] text-neutral-400 hover:bg-white/10 hover:text-neutral-100 md:flex" />
            <CarouselNext className="hidden border-white/10 bg-white/[0.04] text-neutral-400 hover:bg-white/10 hover:text-neutral-100 md:flex" />
          </Carousel>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="mt-20 flex w-full min-h-screen scroll-mt-16 flex-col items-center justify-center px-4"
        >
          <div className="w-full max-w-4xl">
            <div className="mb-14 space-y-4 text-center">
              <div className="flex justify-center">
                <MonoBadge>how it works</MonoBadge>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Three steps. Zero identity.
              </h2>
              <p className="mx-auto max-w-md text-sm text-neutral-400 sm:text-base">
                From sign-up to your first anonymous message, in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map(({ icon: Icon, iconClass, step, title, description }) => (
                <div key={step} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className={`h-5 w-5 ${iconClass}`} />
                    </div>
                    <span className="font-mono text-xs text-neutral-600">{step}</span>
                  </div>
                  <p className="mt-6 text-base font-medium text-neutral-200">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <Link href={session ? "/dashboard" : "/sign-up"}>
                <Button className="h-11 gap-2 rounded-xl bg-neutral-100 px-6 text-sm font-semibold text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95">
                  {session ? "Go to dashboard" : "Get your link"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* WHY MYSTERY MESSAGE */}
        <section className="mt-28 w-full max-w-4xl px-4">
          <div className="mb-14 space-y-4 text-center">
            <div className="flex justify-center">
              <MonoBadge>why mystery message</MonoBadge>
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Built for honesty, not noise.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, iconClass, badgeClass, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 text-left transition-all hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${badgeClass}`}>
                  <Icon className={`h-5 w-5 ${iconClass}`} />
                </div>
                <p className="mt-6 text-base font-medium text-neutral-200">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER METRICS BRAND */}
        <footer className="mt-24 text-center text-xs uppercase tracking-wide text-neutral-600">
          © {new Date().getFullYear()} Mystery Message. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

export default Home
