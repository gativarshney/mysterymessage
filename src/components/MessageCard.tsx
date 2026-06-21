'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { X, MessageSquareText } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ApiResponse } from '@/types/ApiResponse'

// Message interface template
interface Message {
  _id: string;
  content: string;
  createdAt: Date | string;
}

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
    
    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
            toast.success(response.data.message || "Message deleted successfully")
            onMessageDelete(message._id)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast.error(axiosError.response?.data.message || "Failed to delete message")
        }
    }

    return (
        <Card className="w-full rounded-2xl border-white/10 bg-white/[0.03] text-neutral-100 backdrop-blur-sm transition-colors hover:border-white/20">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-start gap-2.5">
                    <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-medium leading-none tracking-tight">
                            Anonymous Message
                        </CardTitle>
                        <CardDescription className="text-xs text-neutral-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                        </CardDescription>
                    </div>
                </div>

                {/* DELETE DIALOG CONTAINER */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            aria-label="Delete message"
                            className="h-8 w-8 rounded-lg border border-red-900/50 bg-red-950/40 text-red-400 transition-colors hover:bg-red-900 hover:text-white"
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="border-white/10 bg-neutral-900 text-neutral-100">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-neutral-100">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-400">
                                This action cannot be undone. This will permanently remove this
                                anonymous mystery message from your dashboard database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>

            {/* MESSAGE BODY CONTENT */}
            <CardContent>
                <p className="break-words text-sm leading-relaxed text-neutral-300">
                    {message.content}
                </p>
            </CardContent>
        </Card>
    )
}

export default MessageCard