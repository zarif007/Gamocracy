import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilState } from 'recoil';
import { currentNavItem } from '../atoms/currentNavItemAtom';
import { sidebarOpen } from '../atoms/sidebarOpenAtom';

const SideBarItems: React.FC<{ Icon: any, text: string, location: string }> = ({ Icon, text, location }) => {

  const [currentNav, setCurrentNav] = useRecoilState<string>(currentNavItem);

  const [isSidebarOpen, setisSidebarOpen] = useRecoilState<boolean>(sidebarOpen);

  const router = useRouter();

  return (
    <div 
      className={`text-white flex items-center justify-start text-xl space-x-2
      hoverAnimation w-full p-1 md:p-2 ${currentNav === text && 'selected'} `}
      onClick={() => {
        setCurrentNav(text)
        router.push(`/${location}`)
      }}>
      <Icon className='h-7'/>
      {
        isSidebarOpen && <span className='font-bold'>{text}</span>
      }
    </div>
  )
}

export default SideBarItems
