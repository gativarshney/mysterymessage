import { render } from "@react-email/render";
import { mailer } from "@/lib/mailer";

import VerificationEmail from "../../emails/verificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{
        const html = await render(VerificationEmail({userName: username, otp: verifyCode}));
        await mailer.sendMail({
            from: `Mystery Message <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Mystery Message | Verification Code',
            html,
        });
        return { success: true, message: "verification Email send successfully" }
    }
    catch(emailError){
        console.log("Error sending Verification Email ", emailError)
        return{success : false, message: "Failed to send verification Email"}
    }
}
// This function sends a verification email using the Resend service. It takes the recipient's email, username, and a verification code as parameters, and returns an ApiResponse indicating success or failure.