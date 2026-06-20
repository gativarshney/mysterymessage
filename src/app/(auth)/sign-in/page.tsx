'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { toast } from "sonner"
import { signIn } from 'next-auth/react'
import { signInSchema } from '@/schemas/signInSchema'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast.error("Login Failed", {
            description: "Incorrect username/email or password",
          })
        } else {
          toast.error("Error", {
            description: result.error,
          })
        }
      }

      if (result?.url) {
        toast.success("Welcome back!")
        router.replace('/dashboard')
      }
    } catch (error) {
      console.error("Authentication submission error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-neutral-950 text-neutral-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl backdrop-blur-md shadow-xl'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-2 tracking-tight'>Welcome Back</h1>
          <p className='text-neutral-400 text-sm'>Sign in to continue your anonymous adventure</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* IDENTIFIER FIELD (EMAIL/USERNAME) */}
          <Controller
            control={form.control}
            name="identifier"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel>Email or Username</FieldLabel>
                <Input
                  {...field}
                  placeholder="Enter your email or username"
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
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-neutral-400">
          Not a member yet?{' '}
          <Link href="/sign-up" className="text-neutral-200 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page