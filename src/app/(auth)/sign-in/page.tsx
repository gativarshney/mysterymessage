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
import AuthShell from '@/components/ui/auth-shell'
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
    <AuthShell
      badge="welcome back"
      title="Sign in"
      subtitle="Continue your anonymous adventure"
      footer={
        <>
          Not a member yet?{' '}
          <Link href="/sign-up" className="font-medium text-violet-300 hover:underline">
            Sign Up
          </Link>
        </>
      }
    >
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-neutral-200"
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
    </AuthShell>
  )
}

export default Page
