'use client'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername, 500)
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const res = await axios.get(`/api/check-username-unique?username=${username}`)
          setUsernameMessage(res.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message as string || "Error checking username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>('/api/sign-up', data)
      toast.success(res.data.message);
      router.replace(`/verify/${data.username}`)
    } catch (error) {
      console.log("Error in sign up of user : ", error)
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast.error(errorMessage || "Error signing up user", {
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
          <h1 className='text-4xl font-bold mb-2 tracking-tight'>Join Mystery Message</h1>
          <p className='text-neutral-400 text-sm'>Sign up to start your anonymous adventure</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* USERNAME FIELD */}
          <Controller
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Username</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Pick a unique username"
                    onChange={(e) => {
                      field.onChange(e)
                      debounced(e.target.value)
                    }}
                    aria-invalid={fieldState.invalid}
                  />
                  {isCheckingUsername && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-neutral-400" />
                  )}
                </div>
                {/* Custom feedback message for database uniqueness check */}
                {usernameMessage && !fieldState.error && (
                  <p className={`text-xs ${usernameMessage === 'Username is unique' ? 'text-green-500' : 'text-red-500'}`}>
                    {usernameMessage}
                  </p>
                )}
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* EMAIL FIELD */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* PASSWORD FIELD */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-neutral-400">
          Already a member?{' '}
          <Link href="/sign-in" className="text-neutral-200 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page