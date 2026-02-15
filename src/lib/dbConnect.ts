import mongoose from "mongoose";

type ConnectionObject = {
    isConnected ?: number   // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
}
const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Database already connected")
        return
    }
    try { 
        const db = await mongoose.connect(process.env.MONGODB_URI as string)
        connection.isConnected = db.connections[0].readyState
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("Database Connection Failed", error)
        process.exit(1)
    }
}

export default dbConnect