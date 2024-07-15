// src/components/Sidebar.tsx
"use client";

import Image from "next/image";
import Logo from "../../../src/assets/images/RobyLogo.svg";
import Link from "next/link";

import {
  Home,
  TreasureChest,
  Stats,
  CommentAlt,
  Calendar,
  SettingsSliders,
  Portrait,
  AddressBook,
} from "react-flaticons";
const Sidebar = () => {
  return (
    <div className="bg-lightGray my-4 ml-4 w-14 h-[calc(100vh-3rem)] text-white  flex-col rounded-[10px] float-left">
      <div className="mb-16 pt-6 px-2">
        <Image
          src={Logo}
          alt={"Logo"}
          onMouseOver={(e) =>
            (e.currentTarget.style.color = "var(--icon-hover-color)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "var(--icon-color)")
          }
        />
      </div>

      <div
        className="flex flex-col items-center justify-center space-y-6 mt-4 "
        onMouseOver={(e) =>
          (e.currentTarget.style.color = "var(--icon-hover-color)")
        }
        onMouseOut={(e) => (e.currentTarget.style.color = "var(--icon-color)")}
      >
        <Link
          href="/dashboard"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <Home className="icon" size={24} />
        </Link>
        <Link
          href="/courses"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <TreasureChest className="icon" size={24} />
        </Link>
        <Link
          href="/reports"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <Stats className="icon" size={24} />
        </Link>
        <Link
          href="/messages"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <CommentAlt className="icon" size={24} />
        </Link>
        <Link
          href="/events"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <Calendar className="icon" size={24} />
        </Link>
        <Link
          href="/settings"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <SettingsSliders className="icon" size={24} />
        </Link>
        <Link
          href="/user-management"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <AddressBook className="icon" size={24} />
        </Link>
        <Link
          href="/profile"
          className="link-hover w-full flex justify-center hover:border-l-4 hover:border-primary hover:cursor-pointer"
        >
          <Portrait className="icon" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
