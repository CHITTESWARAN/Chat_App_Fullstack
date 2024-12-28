import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/index.js";
import { useAuthStore } from "../store/useAuthStore";

const PreviewMessage = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I am going great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const {authUser}=useAuthStore()

  return (
    <div className="min-h-screen container mx-auto  px-4 pt-20 max-w-5xl">
      <div className="space-y-6 pb-12">
        {/* Title Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        {/* Theme Selector Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
              data-theme={t}
            >
              
              {/* Theme Preview */}
              <div className="relative w-full aspect-square grid grid-cols-4 h-8 gap-px p-1"  data-theme={t} >
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>

              {/* Theme Name */}
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Messages */}
        <div>
          <h1 className="text-xl  font-semibold">Preview</h1>
          <div className="rounded-xl  border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              

              
        <div className="space-y-2 ">
          <div className="flex bg-accent gap-4 rounded-md p-2 mb-12">
            <h3 className="flex gap-2">
            <div className=" bg-base-200 border-2 h-8 w-8 rounded-full justify-center items-center">
              <h1 className="font-semibold ml-2  items-center justify-center">{authUser.fullName.charAt(0).toUpperCase()}</h1>
              </div>
              <div className="flex flex-col  justify-center gap-0.5">
                <div>{authUser.fullName}</div>
              <div className="flex gap-0.5">
              <div className=" bg-green-500 mt-2 ml-2 border-1 h-2 w-2 rounded-full justify-center items-center"></div>
              <h3>Online</h3>
             </div>

             </div>
            </h3>
            
          </div>
          {PreviewMessage.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg mb-3 ${
                msg.isSent ? "bg-primary text-primary-content ml-[60%] self-end" : "bg-secondary mr-[60%] "
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        
        </div>

        </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;

