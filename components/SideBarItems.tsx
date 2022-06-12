import React from 'react'

const SideBarItems: React.FC<{ Icon: any, text: string }> = ({ Icon, text }) => {
  return (
    <div className='text-white flex items-center justify-start text-xl space-x-2 hoverAnimation w-full p-1 md:p-2'>
      <Icon className='h-7'/>
      <span className='font-bold'>{text}</span>
    </div>
  )
}

export default SideBarItems
