import React from "react";
import SideBarItems from "./SideBarItems";
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, FireIcon,
  ShoppingCartIcon, CashIcon, UserGroupIcon, PencilAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'

const SideBar = () => {

  return (
    <div className="md:flex flex-col items-start w-full px-2 fixed h-full hidden z-0">
      <div className="space-y-1">
        <SideBarItems text='Home' Icon={HomeIcon} location="/" />
        <SideBarItems text='Write' Icon={PencilAltIcon} location="/write" />
        <SideBarItems text='Ask' Icon={QuestionMarkCircleIcon} location="/ask" />
        <SideBarItems text='Go' Icon={VideoCameraIcon} location="/go" />
        <SideBarItems text='Podcast' Icon={MicrophoneIcon} location="/podcast" />
        <SideBarItems text='Work' Icon={BriefcaseIcon} location="/work" />
        <SideBarItems text='Shop' Icon={ShoppingCartIcon} location="/shop" />
        <SideBarItems text='NFT' Icon={FireIcon} location="/nft" />
        <SideBarItems text='Sponsor' Icon={CashIcon} location="/sponsor" />
        <SideBarItems text='Vote' Icon={UserGroupIcon} location="/vote" />
      </div>
      
    </div>
  );
};

export default SideBar;
