
import express from "express"
import multer from"multer"
import path from "path"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"; // This is used to parse cookies from the client
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { app,server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
   
}
))


const PORT=process.env.PORT;
const _dirname=path.resolve();
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV=="production")
{
    app.use(express.static(path.join(_dirname,"../frontend/dist"))) 

    app.get("*",(req,res)=>{
      res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));  
    })
}



server.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:5001 `);
    connectDB(); 
      
}) 