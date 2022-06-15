import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilState } from 'recoil';
import { currentNavItem } from '../atoms/currentNavItemAtom';
import { domain } from '../domain';

const SideBarItems: React.FC<{ Icon: any, text: string }> = ({ Icon, text }) => {

  const [currentNav, setCurrentNav] = useRecoilState<string>(currentNavItem);

  const router = useRouter();

  return (
    <div 
      className={`text-white flex items-center justify-start text-xl space-x-2 hoverAnimation w-full p-1 md:p-2 ${currentNav === text && 'selected'} `}
      onClick={() => {
        setCurrentNav(text)
        if(text === 'Home')
          router.push(`/`)
        else
          router.push(`/${text.toLowerCase()}`)
      }}>
      <Icon className='h-7'/>
      <span className='font-bold'>{text}</span>
    </div>
  )
}

export default SideBarItems
