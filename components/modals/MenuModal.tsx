import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil';
import { showMenu } from '../../atoms/showMenuAtom';
import SideBarItems from '../SideBarItems';
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, FireIcon,
    ShoppingCartIcon, CashIcon, UserGroupIcon, PencilAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'


const MenuModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(showMenu);

  const styles = {
    secondWrapper: `${isDark ? 'bg-black border-[#DC143C]' : 'bg-blue-100 border-blue-800'}  border rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
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
              <Dialog.Panel className="relative bg-[#121212] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className={styles.secondWrapper}>
                <div className="space-y-1">
                  <SideBarItems text='Home' Icon={HomeIcon} location="/" />
                  <SideBarItems text='Write' Icon={PencilAltIcon} location="/write" />
                  <SideBarItems text='Ask' Icon={QuestionMarkCircleIcon} location="/ask" />
                  <SideBarItems text='Go' Icon={VideoCameraIcon} location="/go" />
                  <SideBarItems text='Podcast' Icon={MicrophoneIcon} location="/podcast" />
                  <SideBarItems text='Work' Icon={BriefcaseIcon} location="/work" />
                  <SideBarItems text='NFT' Icon={FireIcon} location="/nft" />
                  <SideBarItems text='Shop' Icon={ShoppingCartIcon} location="/shop" />
                  <SideBarItems text='Sponsor' Icon={CashIcon} location="/sponsor" />
                  <SideBarItems text='Vote' Icon={UserGroupIcon} location="/vote" />
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

export default MenuModal