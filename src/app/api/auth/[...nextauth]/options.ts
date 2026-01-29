import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";   
import UserModel from "@/model/User";

export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "Credentials",
            name : "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials : any) : Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email : credentials.identifier},
                            {username : credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No User found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please Verify your account before login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('Incorrect Password')
                    }
                } catch (err : any) {
                    throw new Error(err)
                }
            }
        })
    ],
    callbacks: {
        // Callback to include custom properties in the JWT token 
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage
                token.username = user.username
            }
            return token
        },
        // Callback to include custom properties in the session object
        async session({ session, token }) {
            if(token) { 
                session.user._id = token._id 
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        },
    },
    pages: {
        // Custom sign-in page instead of the default NextAuth.js page which includes /auth/signin
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },
    // Secret for encrypt JWT and protect session integrity
    secret: process.env.NEXTAUTH_SECRET
}
//* NextAuth handles login + session; authorize decides WHO logs in; callbacks decide WHAT data is stored and exposed.