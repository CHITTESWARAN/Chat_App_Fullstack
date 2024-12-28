import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser,setSelectedUser}=useChatStore();
    const {onlineUsers}=useAuthStore();
  return (
    <div className=' border-b h-16 border-base-300  border p-2 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
             {/*Avathar*/}
            </div>
            <div className='avathar'>
                <div className='h-10 w-10  rounded-full relative'>
                    <img src={selectedUser.profilePic|| "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"} alt={selectedUser.fullName} className='object-cover bg-white overflow-hidden rounded-full' />

                </div>

            </div>
            {/*User info*/}
            <div>
                <h3 className='font-medium'>{selectedUser.fullName}</h3>
                <p>{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</p>
            </div>

        </div>
        {/*Close button*/}
        <button onClick={()=>setSelectedUser(null)} className='text-gray-500 hover:text-gray-300 transition'>
           <X size={20}/> 
        </button>
         
    </div>
  )
}

export default ChatHeader