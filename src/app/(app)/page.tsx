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
import { Mail } from 'lucide-react'
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

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-neutral-950 text-neutral-100 px-4 py-12">
      
      {/* HERO HERO TITLE HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-[1.15]">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto">
          Mystery Message allows your audience to send you honest, unmapped, and completely anonymous insights safely.
        </p>
        <div className="pt-2">
          <Link href="/sign-up">
            <Button className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200 h-11 px-6 rounded-xl font-medium tracking-tight text-sm shadow-md transition-all active:scale-95">
              Create Your Link
            </Button>
          </Link>
        </div>
      </section>

      {/* RE-USABLE CAROUSEL CONTAINER */}
      <section className="w-full max-w-lg md:max-w-xl mx-auto px-4">
        <Carousel 
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full"
        >
          <CarouselContent>
            {messagesTemplate.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-neutral-900/40 border-neutral-800 backdrop-blur-sm text-neutral-100 rounded-2xl shadow-xl">
                    <CardHeader className="flex flex-row items-center gap-3 pb-3">
                      <Mail className="w-5 h-5 text-neutral-400 shrink-0" />
                      <div className="space-y-0.5">
                        <CardTitle className="text-base font-semibold tracking-tight text-neutral-200">
                          {message.title}
                        </CardTitle>
                        <p className="text-neutral-500 text-xs">{message.time}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed break-words">
                        "{message.content}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100" />
          <CarouselNext className="hidden md:flex border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100" />
        </Carousel>
      </section>

      {/* FOOTER METRICS BRAND */}
      <footer className="mt-16 text-center text-xs text-neutral-600 tracking-wide uppercase">
        © {new Date().getFullYear()} Mystery Message. All rights reserved.
      </footer>
    </main>
  )
}

export default Home