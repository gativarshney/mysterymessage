'use client'
import React, { useCallback, useEffect, useState } from 'react'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import PageAura from '@/components/ui/page-aura'
import MonoBadge from '@/components/ui/mono-badge'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from 'sonner'
import { Loader2, RefreshCw, Copy } from 'lucide-react'

interface Message {
  _id: string;
  content: string;
  createdAt: Date | string;
}

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: true
    }
  })

  const { watch, setValue } = form
  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessageStatus = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessage as boolean)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch message settings")
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages as Message[] || [])
      if (refresh) {
        toast.success("Refreshed messages")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      if (axiosError.response?.status !== 404) {
        toast.error(axiosError.response?.data.message || "Failed to fetch messages")
      }
    } finally {
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setMessages, setIsLoading])

  useEffect(() => {
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessageStatus()
  }, [session, setValue, fetchMessages, fetchAcceptMessageStatus])

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages
      })
      setValue('acceptMessages', !acceptMessages)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to update status")
    } finally {
      setIsSwitchLoading(false)
    }
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId))
  }

  if (!session || !session.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-sm text-neutral-400">
        Please sign in to view your dashboard.
      </div>
    )
  }

  const { username } = session.user as { username: string }
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success("URL copied to clipboard")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 py-12 text-neutral-100 sm:px-6 lg:px-8">
      <PageAura />

      <div className="relative z-10 mx-auto max-w-5xl space-y-8">

        <div className="space-y-3">
          <MonoBadge>your inbox</MonoBadge>
          <h1 className="font-heading text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-neutral-400">Manage your anonymous inbox and link sharing.</p>
        </div>

        {/* COPY LINK SECTION */}
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="text-sm font-medium text-neutral-300">Your Unique Mystery Link</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="h-11 flex-1 select-all rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-neutral-300"
            />
            <Button
              onClick={copyToClipboard}
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-100 px-5 font-medium text-neutral-950 transition-all hover:bg-neutral-200 active:scale-95"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </div>

        {/* STATUS SETTINGS */}
        <div className="flex w-fit items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
          <Switch
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="text-sm font-medium text-neutral-300">
            Accept Messages: {acceptMessages ? 'ON' : 'OFF'}
          </span>
          {isSwitchLoading && <Loader2 className="h-4 w-4 animate-spin text-neutral-500" />}
        </div>

        <Separator className="bg-white/10" />

        {/* MESSAGES SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold tracking-tight">Your Inbox</h2>
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading}
              onClick={() => fetchMessages(true)}
              className="h-9 w-9 rounded-xl border-white/10 bg-white/[0.03] text-neutral-400 transition-all hover:bg-white/[0.07] hover:text-neutral-200"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>

          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center text-sm text-neutral-500">
              No anonymous messages received yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
