import React from "react";
import SideBarItems from "./SideBarItems";
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, 
  ShoppingCartIcon, CashIcon, UserGroupIcon, PencilAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'

const SideBar = () => {

  return (
    <div className="md:flex flex-col items-start w-full px-2 fixed h-full hidden z-0">
      <div className="space-y-1">
        <SideBarItems text='Home' Icon={HomeIcon} />
        <SideBarItems text='Write' Icon={PencilAltIcon} />
        <SideBarItems text='Ask' Icon={QuestionMarkCircleIcon} />
        <SideBarItems text='Go' Icon={VideoCameraIcon} />
        <SideBarItems text='Podcast' Icon={MicrophoneIcon} />
        <SideBarItems text='Work' Icon={BriefcaseIcon} />
        <SideBarItems text='Shop' Icon={ShoppingCartIcon} />
        <SideBarItems text='Sponsor' Icon={CashIcon} />
        <SideBarItems text='Vote' Icon={UserGroupIcon} />
      </div>
      
    </div>
  );
};

export default SideBar;
