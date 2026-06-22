'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Loader2, Send, Sparkles, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageAura from '@/components/ui/page-aura'
import MonoBadge from '@/components/ui/mono-badge'
import { messageSchema } from '@/schemas/messageSchema'
import { ApiResponse } from '@/types/ApiResponse'

const CONTENT_MAX = 300

const ProfileComposer = ({ username }: { username: string }) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuggesting, setIsSuggesting] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasFetchedSuggestions, setHasFetchedSuggestions] = useState(false)

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  })

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = form
  const content = watch('content')

  const fetchSuggestedMessages = async () => {
    setIsSuggesting(true)
    try {
      const response = await axios.post<ApiResponse & { questions?: string[] }>('/api/suggest-messages')
      setSuggestions(response.data.questions || [])
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch suggested messages")
    } finally {
      setIsSuggesting(false)
      setHasFetchedSuggestions(true)
    }
  }

  const onSubmit = async (data: { content: string }) => {
    setIsSending(true)
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        username,
        content: data.content
      })
      toast.success(response.data.message || "Message sent successfully!")
      reset({ content: '' })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 py-12 text-neutral-100 sm:px-6 lg:px-8">
      <PageAura variant="mixed" />

      <div className="relative z-10 mx-auto max-w-2xl space-y-8">

        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <MonoBadge>anonymous · untraceable</MonoBadge>
          </div>
          <p className="text-sm text-neutral-500">Send a message to</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight">@{username}</h1>
        </div>

        {/* COMPOSE CARD */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
        >
          <div className="space-y-2">
            <textarea
              {...register('content')}
              placeholder={`What's on your mind? Send @${username} something anonymously...`}
              rows={5}
              maxLength={CONTENT_MAX}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-400">{errors.content?.message}</span>
              <span className="text-neutral-600">{content?.length || 0}/{CONTENT_MAX}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSending || !content}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neutral-100 font-medium text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Anonymously
              </>
            )}
          </Button>
        </form>

        {/* SUGGESTED MESSAGES */}
        <div className="space-y-4 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.03] to-fuchsia-500/[0.05] p-6 shadow-[0_0_30px_-10px_rgba(167,139,250,0.25)]">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-100">
                <MessageCircleQuestion className="h-5 w-5 text-violet-300" />
                Need inspiration?
              </h2>
              <p className="text-sm text-neutral-400">
                Let AI suggest a few engaging questions to send anonymously.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              disabled={isSuggesting}
              onClick={fetchSuggestedMessages}
              className="gap-1.5 rounded-xl bg-violet-500 font-medium text-white shadow-[0_0_20px_-5px_rgba(167,139,250,0.6)] transition-all hover:bg-violet-400 active:scale-95"
            >
              {isSuggesting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              Suggest Messages
            </Button>
          </div>

          {hasFetchedSuggestions && !isSuggesting && suggestions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 py-8 text-center text-sm text-neutral-500">
              Couldn&apos;t generate suggestions right now. Try again.
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="flex flex-col gap-3">
              {suggestions.map((question, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setValue('content', question, { shouldValidate: true })}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-neutral-200 transition-all hover:border-violet-500/40 hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ProfileComposer
