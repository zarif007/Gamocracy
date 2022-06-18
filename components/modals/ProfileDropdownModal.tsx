import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import SideBarItems from '../SideBarItems';
import { UserIcon, LogoutIcon } from '@heroicons/react/outline'
import { showProfileDropdown } from '../../atoms/showProfileDropDownAtom';
import { signOut, useSession } from 'next-auth/react';
import { GoCircuitBoard, GoSignOut } from 'react-icons/go';
import { FcSettings } from 'react-icons/fc';


const ProfileDropDownModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(showProfileDropdown);

  const { data: session } = useSession();

  const styles = {
    wrapper: `flex items-center justify-center min-h-screen max-w-2xl mx-auto pt-4 px-4 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-black opacity-25 transition-opacity`,
    secondWrapper: `${isDark ? 'bg-black border-[#DC143C]' : 'bg-blue-100 border-blue-800'}  border rounded-lg p-2 sm:p-4`,
    thirdWrapper: `flex flex-col items-center justify-center`,
    fourthWrapper: `flex items-center justify-center space-x-2 cursor-pointer pb-4 px-2`,
    icon: `h-14 w-6 sm:h-14 sm:w-6  ${ isDark ? "text-gray-200" : "text-gray-700" }`,
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
                <div className="">

                    <div className={styles.fourthWrapper}>
                      <img src={session?.user?.image || ''} className='w-8 rounded-md' />
                      <h1 className='text-lg font-bold text-gray-200'>{session?.user?.name}</h1>
                    </div>

                    <div className={styles.fourthWrapper}>
                      <FcSettings className='icon text-[#DC143C]' />
                      <h1 className='text-lg font-bold text-gray-200'>Settings</h1>
                    </div>

                    <div className={styles.fourthWrapper}
                      onClick={() => signOut()}>
                      <GoSignOut className='icon text-[#DC143C]' />
                      <h1 className='text-lg font-bold text-gray-200'>Logout</h1>
                    </div>
                </div>
            </div>
            
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileDropDownModal