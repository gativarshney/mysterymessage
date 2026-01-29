'use client'
import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
} : {children : React.ReactNode} ) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
// AuthProvider component to wrap the application and provide authentication session context using NextAuth.js.
// It is typically used in the root layout or main application component to ensure that all child components have access to authentication state and session data. In simple words, it enables user login state management across the app.