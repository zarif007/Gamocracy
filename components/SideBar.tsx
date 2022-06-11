import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import SideBarItems from "./SideBarItems";
import { HomeIcon } from '@heroicons/react/outline'

const SideBar = () => {
  return (
    <div className="md:flex flex-col items-start xl:w-[340px] p-2 fixed h-full hidden">
      <div className="flex items-center justify-center w-14 h-14 p-0 xl:ml-4 hoverAnimation">
        <Image src={logo} objectFit="contain" />
      </div>
      <div className="space-y-3 mt-4 mb-2.5 xl:ml-4 ml-3 xl:w-1/2 hidden">
        <SideBarItems text='Home' Icon={HomeIcon} />
      </div>
    </div>
  );
};

export default SideBar;
