import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";  // For hashing passwords
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";    

export async function POST(request : Request){
    await dbConnect() // Ensure DB is connected

    try {
        const {username, email, password} = await request.json()    // Parse request body

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,     // User already exists, cannot register
                message: "Username is already taken"
            }, {status: 400}
            )
        }
        const existingUserByEmail = await UserModel.findOne({email}, {status: 400})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()   // Generate 6-digit code

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                }, {status: 400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        }
        else{
            // Create new user
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }

        //* send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }
        return Response.json({
            success: true,
            message: "User registered successsfully. Please verify your email"
        }, {status: 201})

    } catch (error) {
        console.log("Error Registering User", error);
        return Response.json(
            {
                success: false,
                message: "Error Registering User"
            },
            {status: 500}
        )
    }
}
// This is the API route handler for user sign-up. It connects to the database, checks for existing users, hashes passwords, creates or updates user records, and sends verification emails.
// It returns appropriate JSON responses based on the outcome of each operation.
// The function handles errors gracefully and ensures that only verified users can register with a given username or email.
// It uses bcryptjs for password hashing and a helper function to send verification emails.
// The verification code expires in one hour.
// The response status codes indicate success (201), client errors (400), and server errors (500).
// The request body is expected to contain username, email, and password fields. 