import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function GET() {
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

    try {
        const foundUser = await UserModel.findById(user._id);

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found!"
                },
                { status: 404 }
            )
        }

        const messages = [...foundUser.messages].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        return Response.json(
                {
                    success: true,
                    message: "Messages retrieved successfully!",
                    messages
                },
                { status: 200 }
            )
    } catch (error) {
        console.error("Error in get messages route", error)
        return Response.json(
            {
                success: false,
                message: "Failed to retrieve messages acceptance status!",
            },
            { status: 500 }
        )
    }
}
