'use client'
import React, { useCallback, useEffect, useState } from 'react'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
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

  const { register, watch, setValue } = form
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
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-neutral-400 text-sm">
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-neutral-400 text-sm">Manage your anonymous inbox and link sharing.</p>
        </div>

        {/* COPY LINK SECTION */}
        <div className="space-y-3 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm">
          <h2 className="text-sm font-medium text-neutral-300">Your Unique Mystery Link</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 h-11 text-sm text-neutral-300 select-all"
            />
            <Button 
              onClick={copyToClipboard}
              className="bg-neutral-100 text-neutral-950 hover:bg-neutral-200 h-11 px-5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </div>

        {/* STATUS SETTINGS */}
        <div className="flex items-center gap-3 bg-neutral-900/20 border border-neutral-800/60 p-4 rounded-xl w-fit">
          <Switch
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="text-sm font-medium text-neutral-300">
            Accept Messages: {acceptMessages ? 'ON' : 'OFF'}
          </span>
          {isSwitchLoading && <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />}
        </div>

        <Separator className="bg-neutral-800" />

        {/* MESSAGES SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Your Inbox</h2>
            <Button
              variant="outline"
              size="icon"
              disabled={isLoading}
              onClick={() => fetchMessages(true)}
              className="border-neutral-800 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 h-9 w-9 rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl text-neutral-500 text-sm">
              No anonymous messages received yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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