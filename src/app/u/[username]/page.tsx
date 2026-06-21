'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Loader2, Send, Sparkles, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { messageSchema } from '@/schemas/messageSchema'
import { ApiResponse } from '@/types/ApiResponse'

const CONTENT_MAX = 300

const UserProfilePage = () => {
  const params = useParams<{ username: string }>()
  const username = params.username

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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="space-y-2 text-center">
          <p className="text-sm text-neutral-500">Send an anonymous message to</p>
          <h1 className="text-4xl font-bold tracking-tight">@{username}</h1>
        </div>

        {/* COMPOSE CARD */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm"
        >
          <div className="space-y-2">
            <textarea
              {...register('content')}
              placeholder={`What's on your mind? Send @${username} something anonymously...`}
              rows={5}
              maxLength={CONTENT_MAX}
              className="w-full resize-none bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-400">{errors.content?.message}</span>
              <span className="text-neutral-600">{content?.length || 0}/{CONTENT_MAX}</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSending || !content}
            className="w-full bg-neutral-100 text-neutral-950 hover:bg-neutral-200 h-11 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Anonymously
              </>
            )}
          </Button>
        </form>

        <Separator className="bg-neutral-800" />

        {/* SUGGESTED MESSAGES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
              <MessageCircleQuestion className="w-4 h-4 text-neutral-500" />
              Need inspiration?
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSuggesting}
              onClick={fetchSuggestedMessages}
              className="border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 rounded-xl gap-1.5"
            >
              {isSuggesting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              Suggest Messages
            </Button>
          </div>

          {hasFetchedSuggestions && !isSuggesting && suggestions.length === 0 && (
            <div className="text-center py-8 border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-sm">
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
                  className="text-left bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 rounded-xl px-4 py-3 text-sm text-neutral-300 transition-all active:scale-[0.99]"
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

export default UserProfilePage
