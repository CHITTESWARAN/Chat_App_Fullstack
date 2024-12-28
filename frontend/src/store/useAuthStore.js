import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

const BASE_URl=import.meta.env.MODE==="development"?"http://localhost:5001":"/"

export const useAuthStore =create((set,get)=>({
    authUser:null,
    isSigning:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    
    checkAuth:async()=>{
        try{
             const res=await axiosInstance.get("/auth/check");
              set({authUser:res.data})
              get().connectSocket()
        }
        catch(error)
        { console.log("Error in checkAuth:",error);
        
          set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        console.log(data);
        
   set({isSigningUp:true});
        try{
           const res= await axiosInstance.post("/auth/signup",data)
           toast.success("Account created Successfully")
           set({authUser:res.data});
           get().connectSocket()
        }
        catch(error)
        {
          toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },
    

    logout:async(data)=>{
        try{ const res=await axiosInstance.post("auth/logout");
            toast.success("Logout Successfully")
            set({authUser:null})
            get().disconnectSocket();

        }
        catch(error)
        {
          toast.error(error.response.data.message);
        }
    },

    login:async(data)=>{
    try{
        const res=await axiosInstance.post("auth/login",data)
        toast.success("Login a the successful")
        set({authUser:res.data})

        get().connectSocket()

    }
    catch(error)
    {
    toast.error("Unable to login")
    }
    },
    
    updateProfile: async (data) => {
        
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.post("/auth/update-profile", data); 
            
            // After successful profile update
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in the update profile:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket:()=>{
        const {authUser}=get();
        if(!authUser || get().socket?.connected) return;
        const socket=io(BASE_URl,{
            query:{
                userId:authUser._id,
            }
        })
        socket.connect()
        set({socket:socket});
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds});
        })

    },
    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.diconnect();
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }
    
    
    
}))