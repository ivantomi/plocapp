// src/components/Sidebar.tsx
"use client"

import Image from "next/image";
import Logo from "../../../src/assets/images/RobyLogo.svg"

import {Home, TreasureChest, Stats, CommentAlt, Calendar, SettingsSliders} from "react-flaticons"
const Sidebar = () => {
  return (
    <div className='bg-lightGray my-4 ml-4 w-14 h-[calc(100vh-2rem)] text-white  flex-col rounded-[10px] float-left'>
      <div className="mb-16 pt-6 px-2">
        <Image src={Logo} alt={"Logo"} />
      </div>

      <div className='flex flex-col items-center justify-center space-y-6 mt-4 '>
        <div className="w-full flex justify-center hover:border-l-4 hover:border-white ">
          <Home size={24} style={{color: "var(--icon-color)"}} onMouseOver={(e) => e.currentTarget.style.color = "var(--icon-hover-color)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--icon-color)"} />
        </div>
        <div className="w-full flex justify-center hover:border-l-4 hover:border-white ">
          <TreasureChest size={24} style={{color: "var(--icon-color)"}} onMouseOver={(e) => e.currentTarget.style.color = "var(--icon-hover-color)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--icon-color)"} />
        </div>
        <div className="w-full flex justify-center hover:border-l-4 hover:border-white ">
          <Stats size={24} style={{color: "var(--icon-color)"}} onMouseOver={(e) => e.currentTarget.style.color = "var(--icon-hover-color)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--icon-color)"} />
        </div>
        <div className="w-full flex justify-center hover:border-l-4 hover:border-white ">
          <CommentAlt size={24} style={{color: "var(--icon-color)"}} onMouseOver={(e) => e.currentTarget.style.color = "var(--icon-hover-color)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--icon-color)"} />
        </div>
        <div className="w-full flex justify-center hover:border-l-4 hover:border-white ">
          <Calendar size={24} style={{color: "var(--icon-color)"}} onMouseOver={(e) => e.currentTarget.style.color = "var(--icon-hover-color)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--icon-color)"} />
        </div>
        
      </div>
    </div>
  );
}

export default Sidebar;