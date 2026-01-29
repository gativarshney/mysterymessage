import mongoose, {Schema, Document} from "mongoose"; 

export interface Message extends Document {
    content : String;
    createdAt : Date
}
const MessageSchema : Schema <Message> = new Schema ({
    content: {
        type : String,
        required: true
    },
    createdAt : {
        type: Date,
        required : true,
        default: Date.now
    }
})
export interface User extends Document {
    username : string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: Message[]     // Array of messages
}
const UserSchema : Schema <User> = new Schema ({
    username : {
        type: String,
        required: [true, "Username is required"], // custom error message
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],  
        trim: true,
        unique: true,
        // regex for email validation
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false
    },
    messages : [MessageSchema]
})

// Next.js hot reloads files during development
// If model is already created, reuse it
// Otherwise create a new model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel;
