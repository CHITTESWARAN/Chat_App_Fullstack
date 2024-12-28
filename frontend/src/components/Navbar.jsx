import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import {LogOut, MessageSquare, Settings, SettingsIcon, User } from 'lucide-react'

const Navbar = () => {
    const {logout,authUser}=useAuthStore()
  return (
    <div className='bg-slate-800  flex justify-between'>
       <Link to={"/"} className='flex items-center gap-2.5  hover:opacity-80 transition-all'>
      <div className='logo flex p-2 gap-0.5'>
       
        <div className='bg-[white] bg-opacity-15'>
       <MessageSquare className='text-white'></MessageSquare>
       </div>
        <h1 className='text-lg font-bold text-white'>Chatty</h1>

      </div>
      </Link>

      

      <div className='flex items-center justify-center gap-2 p-2'>
      
      <Link to={"/Settings"} className="hover:opacity-80 transition-all">
        <div className='flex gap-2 text-white'>
        <SettingsIcon className="w-5 h-5"></SettingsIcon>
        <span className='hidden sm:inline'>Settings</span>
        </div>
        </Link>
        
        {authUser?(
        <div className='flex justify-center gap-2 items-center'>
          
          <Link to={"/profile"} className="hover:opacity-80 transition-all">
          <div className='flex gap-2 text-white'>
           <User className="w-5 h-5"></User>
           <span className='hidden sm:inline'>Profile</span>
          </div>
          </Link>
          
          
          <button onClick={logout} className='flex gap-2 text-white'>
           <LogOut className="w-5 h-5"></LogOut>
           <span className='hidden sm:inline'>Logout</span>
          </button>
        
        </div> ):""}

      </div>
    </div>
  )
}

export default Navbar