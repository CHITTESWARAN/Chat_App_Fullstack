import { Camera, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { axiosInstance } from '../lib/axios';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser,isUpdatingProfile,updateProfile } = useAuthStore();
  const[image,setImage]=useState(false)
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const maxSize = (10 * 1024 * 1024); // 10MB in bytes
    
    if (file.size > maxSize) {
      toast.error("The file size should be less than 10 MB");
    } 
    console.log(file);
  
    if (!file) return;
  
    const formData = new FormData();
    formData.append('profilePic', file);
    
    try{
        const res=await updateProfile(formData)
      .then(console.log("data successfully"));

    }
    catch(error)
    {
       console.log(error);
       
    }
  };
  
  return (
    <div className="bg-gray-800 min-h-screen py-10">
      <div className="w-[65%] m-auto bg-gray-900 shadow-lg p-8 rounded-xl">
        

        {/* Profile Header */}
        <div className="flex flex-col   bg-gray-900 items-center text-center text-gold gap-4 mb-8">
          <h1 className="font-bold  mt-2 text-4xl text-yellow-700">Profile </h1>
          <h3 className="text-md  text-yellow-700">Your profile information</h3>
        </div>
        <div className="flex flex-col items-center gap-4 mb-10">
  <div className="relative h-32 w-32 border-4 border-white rounded-full overflow-hidden">

    {/* Camera icon for file input trigger */}
    <label htmlFor="avatar-upload" className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center cursor-pointer">
      <i className="fas fa-camera text-white text-2xl"></i> {/* Use a camera icon */}
    </label>
    <input
      type="file"
      id="avatar-upload"
      accept="image/*"
      onChange={handleImageUpload}
      disabled={isUpdatingProfile}
      className={`absolute inset-0 opacity-0 cursor-pointer ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
      title="Click to upload a photo"
    />
    <img
      src={authUser.profilePic || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
      alt="Profile"
      className="h-full w-full object-cover"
    />
  </div>
  <h4 className="text-white text-sm">Click the camera icon to update the photo</h4>
</div>

        {/* Profile Information */}
        <div className=" p-6 rounded-lg text-gold space-y-6">
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="flex items-center mb-2 gap-2 text-white text-sm font-medium">
                <User className="h-5 w-5" />
                Full Name
              </label>
              <input
                type="text"
                value={authUser.fullName}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md   text-yellow-700"
                disabled
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-white text-sm font-medium">
                <Mail className="h-5 w-5" />
                Email Address
              </label>
              <input
                type="text"
                value={authUser.email}
                className="w-full text-start bg-gray-800 h-12 p-3 border-2 rounded-md   text-yellow-700"
                disabled
              />
            </div>
          </div>
        </div>
        
        

        {/* Account Information */}
        <div className="mt-10 text-yellow-700 p-6 rounded-b-lg text-gold">
          <h1 className="font-bold text-xl mb-6 text-gold">Account Information</h1>


          {/* Member Since */}
          <div className="flex justify-between mb-4">
            <h2 className="text-md">Member Since</h2>
            <h2 className="text-md">{authUser.createdAt.slice(0, 10)}</h2>
          </div>
          <hr className='text-yellow-700 p-4' />

          {/* Account Status */}
          <div className="flex justify-between">
            <h2 className="text-md">Account Status</h2>
            <h2 className="text-md text-green-500">Active</h2>
          </div>
        </div>
        </div>
    </div>
  );
};

export default ProfilePage;
