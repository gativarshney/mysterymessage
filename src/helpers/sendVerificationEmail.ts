import {resend} from "@/lib/resend";

import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({userName: username, otp: verifyCode}),
        });
        return{success : true, message: "verification Email send successfully"}
    }
    catch(emailError){
        console.log("Error sending Verification Email ", emailError)
        return{success : false, message: "Failed to send verification Email"}
    }
}