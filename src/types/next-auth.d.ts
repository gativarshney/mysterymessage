import NextAuth, { DefaultSession } from "next-auth";
declare module 'next-auth' {
    interface User{
        _id ?: string;
        isVerified ?: boolean;
        isAcceptingMessage ?: boolean;
        username ?: string
    }
    interface Session{
        user : {
            _id ?: string;
            isVerified ?: boolean;
            isAcceptingMessage ?: boolean;
            username ?: string
        } & DefaultSession['user']  
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }
}
// By default, NextAuth.js does not know about the custom properties we added to the User, Session, and JWT interfaces.
// This file extends the default types to include those properties, ensuring type safety throughout the application.