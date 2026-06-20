'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from "sonner"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const VerifyAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const params = useParams() as { username: string }

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true)
    try {
      const res = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code
      })
      toast.success(res.data.message)
      router.replace(`/sign-in`)
    } catch (error) {
      console.log("Error in verifying code : ", error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast.error(errorMessage || "Error verifying code", {
        description: "Please try again",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-neutral-950 text-neutral-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl backdrop-blur-md shadow-xl'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-2 tracking-tight'>Verify Account</h1>
          <p className='text-neutral-400 text-sm'>Enter the verification code sent to your email</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Verification Code</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter your 6-digit code"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Please check your inbox or spam folder.
                </FieldDescription>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default VerifyAccount