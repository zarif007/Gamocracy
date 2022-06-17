import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil';
import { showMenu } from '../../atoms/showMenuAtom';
import SideBarItems from '../SideBarItems';
import { HomeIcon, BriefcaseIcon, VideoCameraIcon, MicrophoneIcon, 
    ShoppingCartIcon, CashIcon, UserGroupIcon, PencilAltIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'


const MenuModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(showMenu);

  const styles = {
    wrapper: `flex items-center justify-center min-h-screen sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
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
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
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
                  <SideBarItems text='Home' Icon={HomeIcon} location="/" />
                  <SideBarItems text='Write' Icon={PencilAltIcon} location="/write" />
                  <SideBarItems text='Ask' Icon={QuestionMarkCircleIcon} location="/ask" />
                  <SideBarItems text='Go' Icon={VideoCameraIcon} location="/go" />
                  <SideBarItems text='Podcast' Icon={MicrophoneIcon} location="/podcast" />
                  <SideBarItems text='Work' Icon={BriefcaseIcon} location="/work" />
                  <SideBarItems text='Shop' Icon={ShoppingCartIcon} location="/shop" />
                  <SideBarItems text='Sponsor' Icon={CashIcon} location="/sponsor" />
                  <SideBarItems text='Vote' Icon={UserGroupIcon} location="/vote" />
                </div>
            </div>
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MenuModal