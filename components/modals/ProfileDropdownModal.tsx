import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil';
import { showProfileDropdown } from '../../atoms/showProfileDropDownAtom';
import { signOut, useSession } from 'next-auth/react';
import {  GoSignOut } from 'react-icons/go';
import { AiTwotoneSetting } from "react-icons/ai";


const ProfileDropDownModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(showProfileDropdown);

  const { data: session } = useSession();

  const styles = {
    secondWrapper: `${isDark ? 'bg-black border-[#DC143C]' : 'bg-blue-100 border-blue-800'}  border rounded-lg p-2 sm:p-4`,
    thirdWrapper: `flex flex-col items-center justify-center`,
    fourthWrapper: `flex items-center mx-auto space-x-2 cursor-pointer pb-4 px-2 hover:text-black`,
    icon: `h-14 w-6 sm:h-14 sm:w-6  ${ isDark ? "text-gray-200" : "text-gray-700" }`,
  }

  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              {/* Content Goes here */}
              <Dialog.Panel className="relative bg-[#121212] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full">
                  <div className={styles.secondWrapper}>
                    <div className="">

                        <div className={styles.fourthWrapper}>
                          <img src={session?.user?.image || ''} className='w-8 rounded-md' />
                          <h1 className='text-lg font-bold text-gray-200'>{session?.user?.name}</h1>
                        </div>

                        <div className={styles.fourthWrapper}>
                          <AiTwotoneSetting className='icon text-[#DC143C]' />
                          <h1 className='text-lg font-bold text-gray-200'>Settings</h1>
                        </div>

                        <div className={styles.fourthWrapper}
                          onClick={() => signOut()}>
                          <GoSignOut className='icon text-[#DC143C]' />
                          <h1 className='text-lg font-bold text-gray-200'>Logout</h1>
                        </div>
                    </div>
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileDropDownModal