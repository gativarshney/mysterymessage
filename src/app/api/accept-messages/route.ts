import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
         return Response.json(
            {
                success: false,
                message: "Unauthenticated!"
            },
            { status: 401 }
        )
    }

    const userId = user._id;
    const {acceptMessages} : {acceptMessages: boolean} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message: "Failed to update messages acceptance!"
                },
                { status: 500 }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Messages acceptance updated successfully!",
                user: updatedUser
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error in accept messages route", error)
        return Response.json(
            {
                success: false,
                message: "Failed to update messages acceptance!"
            },
            { status: 500 }
        )
    }
}

export async function GET(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
         return Response.json(
            {
                success: false,
                message: "Unauthenticated!"
            },
            { status: 401 }
        )
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found!"
                },
                { status: 500 }
            )
        }
        return Response.json(
                {
                    success: true,
                    message: "Messages acceptance status retrieved successfully!",
                    isAcceptingMessage: foundUser.isAcceptingMessage
                },
                { status: 200 }
            )
    } catch (error) {
        console.error("Error in get messages acceptance route", error)
        return Response.json(
            {
                success: false,
                message: "Failed to retrieve messages acceptance status!",
            },
            { status: 500 }
        )
    }
}