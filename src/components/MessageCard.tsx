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
import { X } from 'lucide-react'
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
        <Card className="w-full bg-neutral-900/50 border-neutral-800 backdrop-blur-sm text-neutral-100">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-medium leading-none tracking-tight">
                        Anonymous Message
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                    </CardDescription>
                </div>

                {/* DELETE DIALOG CONTAINER */}
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button 
                            variant="destructive" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900 hover:text-white transition-colors"
                        > 
                            <X className='w-4 h-4' />
                        </Button>
                    </AlertDialogTrigger>
                    
                    <AlertDialogContent className="bg-neutral-900 border-neutral-800 text-neutral-100">
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
                            <AlertDialogCancel className="bg-transparent border-neutral-700 hover:bg-neutral-800 text-neutral-300">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>

            {/* MESSAGE BODY CONTENT */}
            <CardContent>
                <p className="text-sm text-neutral-300 leading-relaxed break-words">
                    {message.content}
                </p>
            </CardContent>
        </Card>
    )
}

export default MessageCard