import React, { useEffect } from "react";
import SideBarItems from "./SideBarItems";
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, FireIcon, UserGroupIcon, LibraryIcon,
  ShoppingCartIcon, CashIcon, PencilAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { sidebarOpen } from "../../atoms/sidebarOpenAtom";


const SideBar = () => {

  const [isSidebarOpen, setisSidebarOpen] = useRecoilState<boolean>(sidebarOpen);


  useEffect(() => {
    if(window !== undefined) {
      const isOpen: string = window.localStorage.getItem('IS_SIDEBAR_OPEN') || '';
      setisSidebarOpen(JSON.parse(isOpen || 'true'))
    }
  }, []);

  const setOnLocalStorage = (value: boolean) => {
    if(window !== undefined) {
      window.localStorage.setItem('IS_SIDEBAR_OPEN', JSON.stringify(value));
    }
  }

  return (
    <div className="md:flex flex-col items-start px-2 fixed h-full hidden z-0">
      <div className="space-y-1 overflow-y-auto mb-40 scrollbar-hide">
        <SideBarItems text='Home' Icon={HomeIcon} location="/" />
        <SideBarItems text='Write' Icon={PencilAltIcon} location="/write" />
        <SideBarItems text='Clan' Icon={LibraryIcon} location="/clan" />
        <SideBarItems text='Go' Icon={VideoCameraIcon} location="/go" />
        <SideBarItems text='Podcast' Icon={MicrophoneIcon} location="/podcast" />
        <SideBarItems text='Work' Icon={BriefcaseIcon} location="/work" />
        <SideBarItems text='Shop' Icon={ShoppingCartIcon} location="/shop" />
        <SideBarItems text='Nft' Icon={FireIcon} location="/nft" />
        <SideBarItems text='Sponsor' Icon={CashIcon} location="/sponsor" />
        <SideBarItems text='Vote' Icon={UserGroupIcon} location="/vote" />

        {
          isSidebarOpen ? <AiOutlineDoubleLeft className="text-gray-600 h-8 w-8 m-1 cursor-pointer" 
            onClick={() => {
              setisSidebarOpen(false);
              setOnLocalStorage(false);
            }} /> : 
          <AiOutlineDoubleRight className="text-gray-600 h-8 w-8 m-1 cursor-pointer"
            onClick={() => {
              setisSidebarOpen(true);
              setOnLocalStorage(true);
            }} />
        }
      </div>
      
    </div>
  );
};

export default SideBar;
