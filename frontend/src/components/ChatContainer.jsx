import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import { Loader2 } from 'lucide-react';
import { formatMessageTime } from '../lib/utils'; // Assuming you have this function
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages} = useChatStore();
  const {authUser}=useAuthStore();
  const messageEndRef=useRef(null)


  

  useEffect(() => {
    // Ensure selectedUser and its _id exist before calling getMessages
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      console.log("Received messages:", messages); 
      subscribeToMessages();
    }

    return() => unsubscribeFromMessages();
  }, [selectedUser, getMessages,subscribeToMessages,unsubscribeFromMessages]);
  
  useEffect(()=>{
    if(messageEndRef.current && messages)
    {
      messageEndRef.current.scrollIntoView({behavior:"smooth"});
    }
    
  },[messages])

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {console.log("hi")}
      <ChatHeader/>
      {isMessagesLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex-1   mt-2 gap-4 overflow-auto">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser?._id ? 'chat-end' : 'chat-start'} `}
                  ref={messageEndRef}
                >
                  {/* Sender or Receiver Profile Pic */}
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser?._id
                          ? authUser.profilePic ||
                            'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
                          : selectedUser?.profilePic||
                            'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
                      }
                      alt="Profile"
                      className="w-10 h-10  object-cover rounded-full" // Make the profile picture round and consistent size
                    />
                  </div>

                  {/* Message Header - Time */}
                  <div className="chat-header mb-1">
                    <time className="text-xs text-gray-500 ml-2">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`chat-bubble flex flex-col ${
                      message.senderId === authUser?._id
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-black' 
                    } rounded-lg p-3 max-w-[80%]`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="p-2 text-center text-zinc-400">No messages yet.</p>
            )}
          </div>
          <MessagesInput />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
