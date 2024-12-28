import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div>
        <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
        <div className='max-w-md text-center space-y-6'>
         <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex justify-center items-center animate-bounce">
                <MessageSquare className="w-8 h-8 text-primary" />
                </div>


              <h1 className="text-2xl font-bold mt-2">Welcome to chatty!</h1>
              <p className="text-base-content/60">
               select the conversation from the sidebar to start charting
              </p>
            </div>
          </div>
          </div>
          </div>
    </div>
  )
}

export default NoChatSelected