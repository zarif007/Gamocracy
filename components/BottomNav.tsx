import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import { BiListPlus } from "react-icons/bi";
import { CgMenuCheese } from 'react-icons/cg';
import { GiBatMask } from "react-icons/gi";
import { IoMdNotifications } from 'react-icons/io';
import { useRecoilState } from 'recoil';
import { showMenu } from '../atoms/showMenuAtom';
import { showProfileDropdown } from '../atoms/showProfileDropDownAtom';
import { MdOutlineLogin } from "react-icons/md";
import { creationModal } from '../atoms/creationModal';


const BottomNav: React.FC = () => {

    const isDark = 1;

    const {data: session} = useSession();

    const [openMenu, setOpenMenu] = useRecoilState(showMenu);

    const [openDropDown, setOpenDropDown] = useRecoilState(showProfileDropdown);

    const [openCreationModal, setOpenCreationModal] = useRecoilState(creationModal);


    const styles = {
        wrapper: `w-full h-24 inline md:hidden`,
        itemsWrapper: `block fixed inset-x-0 bottom-0 z-50 ${isDark ? 'bg-black border-gray-800' : 'bg-[#fefefa] shadow-gray-200'} border-t  justify-center items-center`,
        iconsWrapper: `w-full focus:text-[#e5163f] hover:text-[#e5163f] justify-center inline-block text-center pt-1 pb-1 items-center`,
        icon: `h-10 w-6 sm:h-12 sm:w-8  inline-flex`,
        iconText: `tab tab-home block text-xs  font-semibold`,
    }

    return (
        <div className='mt-32'>
            <div className={styles.wrapper}>
                <section className={styles.itemsWrapper}>
                    <div className="flex justify-between text-[#DC143C]">
                        <div className={styles.iconsWrapper}>
                            <CgMenuCheese className={styles.icon} onClick={() => setOpenMenu(true)} />
                            <span className={styles.iconText}>Menu</span>
                        </div>
                        {
                            session?.user?.email ? <>
                                <div className={styles.iconsWrapper} onClick={() => {
                                    let {modal, blog, post, ask, idea, review, poll} = openCreationModal;
                                    modal = true;
                                    setOpenCreationModal({modal, blog, post, ask, idea, review, poll})
                                }} >
                                    <BiListPlus className={styles.icon} />
                                    <span className={styles.iconText}>Create</span>
                                </div>
                                <div className={styles.iconsWrapper} onClick={() => setOpenDropDown(true)}>
                                    <GiBatMask className={styles.icon} />
                                    <span className={styles.iconText}>Account</span>
                                </div>
                                <div className={styles.iconsWrapper} onClick={() => {}}>
                                    <IoMdNotifications className={styles.icon} />
                                    <span className={styles.iconText}>Notification</span>
                                </div>
                            </> : <div
                                className={styles.iconsWrapper}
                                    onClick={() => signIn()}>
                                    <MdOutlineLogin className={styles.icon} />
                                <span className={styles.iconText}>Login</span>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BottomNav