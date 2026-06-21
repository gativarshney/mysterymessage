'use client'
import React from 'react'
import Link from 'next/link'
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
import { Mail, ArrowRight, PlayCircle, EyeOff, Sparkles, Zap } from 'lucide-react'
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

const features = [
  {
    icon: EyeOff,
    iconClass: "text-violet-300",
    title: "Fully anonymous",
    description: "Senders are never identified, ever.",
  },
  {
    icon: Sparkles,
    iconClass: "text-pink-300",
    title: "AI prompts",
    description: "Stuck? Get a question to send.",
  },
  {
    icon: Zap,
    iconClass: "text-emerald-300",
    title: "Instant inbox",
    description: "Messages land in real time.",
  },
]

const Home = () => {
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
            <Link href="/sign-up">
              <Button className="h-11 gap-2 rounded-xl bg-neutral-100 px-6 text-sm font-semibold tracking-tight text-neutral-950 shadow-md transition-all hover:bg-neutral-200 active:scale-95">
                Create your link
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="h-11 gap-2 rounded-xl border-white/10 bg-transparent px-5 text-sm font-medium text-neutral-300 hover:bg-white/[0.05]"
            >
              <PlayCircle className="h-4 w-4" />
              See how it works
            </Button>
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

        {/* FEATURE STRIP */}
        <section className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 px-4 text-left sm:grid-cols-3">
          {features.map(({ icon: Icon, iconClass, title, description }) => (
            <div key={title} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
              <Icon className={`h-[18px] w-[18px] ${iconClass}`} />
              <p className="mt-2.5 text-sm font-medium text-neutral-200">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{description}</p>
            </div>
          ))}
        </section>

        {/* FOOTER METRICS BRAND */}
        <footer className="mt-16 text-center text-xs uppercase tracking-wide text-neutral-600">
          © {new Date().getFullYear()} Mystery Message. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

export default Home
