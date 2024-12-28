import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/users`);
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true }); // Start loading state
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false }); // End loading state
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // Log the error details to understand what went wrong
      console.error("Error sending message:", error.response || error.message);
  
      toast.error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
  
    const socket = useAuthStore.getState().socket;
    
    if (socket?.connected) {  // Ensure socket is connected before subscribing
      socket.on("newMessage", (newMessage) => {
        if(newMessage.senderId != selectedUser._id) return;
        set({
          messages: [...get().messages, newMessage],  // Update the messages state
        });
      });
    } else {
      console.error("Socket is not connected.");
    }
  },
  
  unsubscribeFromMessages:()=>{
    const socket =useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
