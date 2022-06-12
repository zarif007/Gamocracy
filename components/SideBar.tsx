import React from "react";
import SideBarItems from "./SideBarItems";
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, ShoppingCartIcon, CashIcon, UserGroupIcon } from '@heroicons/react/outline'

const SideBar = () => {
  return (
    <div className="md:flex flex-col items-start w-full px-2 fixed h-full hidden z-0">
      <div className="space-y-3">
        <SideBarItems text='Home' Icon={HomeIcon} />
        <SideBarItems text='Get Paid' Icon={BriefcaseIcon} />
        <SideBarItems text='Go' Icon={VideoCameraIcon} />
        <SideBarItems text='Podcast' Icon={MicrophoneIcon} />
        <SideBarItems text='Shop' Icon={ShoppingCartIcon} />
        <SideBarItems text='Sponsor' Icon={CashIcon} />
        <SideBarItems text='Vote' Icon={UserGroupIcon} />
      </div>
    </div>
  );
};

export default SideBar;
