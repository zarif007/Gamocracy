import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilState } from 'recoil';
import { currentNavItem } from '../atoms/currentNavItemAtom';
import { sidebarOpen } from '../atoms/sidebarOpenAtom';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbTrendingUp } from "react-icons/tb";
import { HiOutlineLibrary } from "react-icons/hi";


const SideBarItems: React.FC<{ Icon: any, text: string, location: string }> = ({ Icon, text, location }) => {

  const [currentNav, setCurrentNav] = useRecoilState<string>(currentNavItem);

  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);


  const router = useRouter();

  return (
    <>
      <div 
        className={`text-white flex items-center justify-start text-xl space-x-2 
        ${isSidebarOpen && 'w-full'} hoverAnimation p-1 md:p-2 ${currentNav === text && 'selected'} `}
        onClick={() => {
          setCurrentNav(text)
          router.push(`/${location}`)
        }}>
        <Icon className='h-7'/>
        {
          isSidebarOpen && <span className='font-bold'>{text}</span>
        }
      </div>
      {
        currentNav === text && 
        <div className='text-gray-300 font-semibold ml-6 flex-col hidden md:flex'>

          <SubSideBar SideIcon={AiOutlinePlus} text='Create' />

          <SubSideBar SideIcon={TbTrendingUp} text='Trending' />

          <SubSideBar SideIcon={HiOutlineLibrary} text="Clan's" />
          
        </div>
      }
    </>
  )
}

const SubSideBar: React.FC<{ SideIcon: any, text: string }> = ({ SideIcon, text }) => {

  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);

  return (
    <div className='flex flex-row hoverAnimation rounded-md py-1 px-1 space-x-1 w-full'>
      <div className=''>
        <SideIcon className='h-5 w-5' />
      </div>
      {
        isSidebarOpen && <span className='font-semibold'>{text}</span>
      }
    </div>
  )
}

export default SideBarItems
