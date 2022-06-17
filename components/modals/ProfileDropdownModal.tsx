import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import SideBarItems from '../SideBarItems';
import { UserIcon, LogoutIcon } from '@heroicons/react/outline'
import { showProfileDropdown } from '../../atoms/showProfileDropDownAtom';


const ProfileDropDownModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(showProfileDropdown);

  const styles = {
    wrapper: `flex items-center justify-center min-h-screen max-w-xl mx-auto my-auto pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-black opacity-25 transition-opacity`,
    secondWrapper: `${isDark ? 'bg-black border-[#DC143C]' : 'bg-blue-100 border-blue-800'}  border rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
  }

  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 mb-20 md:mb-2 z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className={styles.wrapper}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >

            {/* content Part   */}
            <div className={styles.secondWrapper}>
                <div className="space-y-1">
                    <SideBarItems text='Profile' Icon={UserIcon} location="/" />
                    <SideBarItems text='Logout' Icon={LogoutIcon} location="/write" />
                </div>
            </div>
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileDropDownModal