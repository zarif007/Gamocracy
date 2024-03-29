import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import logo from "../../public/logo2.png";
import { BiListPlus } from "react-icons/bi";
import { GiBatMask } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { FiMic } from "react-icons/fi";
import { signIn, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { showProfileDropdown } from "../../atoms/showProfileDropDownAtom";
import { voiceNavModal } from "../../atoms/voiceNavigationModalAtom";
import { BsSearch } from "react-icons/bs";
import { currentNavItem } from "../../atoms/currentNavItemAtom";
import { MdOutlineLogin } from "react-icons/md";
import { creationModal } from "../../atoms/creationModal";


const NavBar = () => {
  const isDark = 1;

  const router = useRouter();

  const {data: session} = useSession();

  const [openDropDown, setOpenDropDown] = useRecoilState<boolean>(showProfileDropdown);

  const [openVoiceNavigation, setOpenVoiceNavigation] = useRecoilState<boolean>(voiceNavModal);

  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const [currentNav, setCurrentNav] = useRecoilState<string>(currentNavItem);

  const [openCreationModal, setOpenCreationModal] = useRecoilState(creationModal);

  const styles = {
    nav: `pt-3 shadow-sm ${
      isDark ? "bg-black shadow-gray-800" : "bg-[#FFFAFA] shadow-gray-200"
    }  sticky top-0 z-50 pb-2 px-2 bg-opacity-50`,
    wrapper: `flex justify-between max-w-full mx-1 lg:mx-auto xl:mx-32`,
    logo: `relative h-12 w-12 md:h-12 md:w-24 cursor-pointer pt-1 md:pt-4`,
    searchWrapper: `relative text-gray-600 focus-within:text-gray-400 hidden md:inline`,
    searchIcon: `absolute inset-y-0 left-0 flex items-center pl-2`,
    searchInput: `w-full sm:w-72 xl:w-100 text-large font-semibold ${
      isDark
        ? "text-white bg-[#0c1012] focus:bg-gray-900 border-[#DC143C]"
        : "text-black bg-[#FAF9F6] focus:bg-gray-100 border-[#a1a1aa]"
    } border-2 rounded-md  pl-10 focus:outline-none py-4`,
    iconsWrapper: `text-white flex flex-row space-x-2 md:space-x-2 items-center justify-center`,
    icon: `h-14 w-6 sm:h-16 sm:w-8  ${
      isDark ? "text-gray-200" : "text-gray-700"
    } hover:text-[#e5163f]`,
    SecondIcon: `h-14 w-6 sm:h-16 sm:w-8  ${
      isDark ? "text-gray-200" : "text-gray-700"
    } hover:text-[#e5163f]`,
    notificationWrapper: `bg-blue-700 text-xs p-1 animate-pulse rounded-md absolute m-4 ml-3 mt-5`,
    userImage: `h-8 sm:h-10 rounded-full cursor-pointer pt-2`,
    buttons: `bg-[#DC143C] hover:bg-[#e5163f] text-white rounded-md font-bold px-3 items-center`,
  };


  return (
    <div className={styles.nav}>
      <div className={styles.wrapper} >

        {/* Logo  */}
        <div className={styles.logo} onClick={() => {
          setCurrentNav('Home')
          router.push('/', undefined, { scroll: false });
        }}>
          <div className="">
            <Image src={logo} objectFit="contain" alt="logo" />
          </div>
        </div>

        {/* Search Field  */}
        <div className="flex space-x-2">
            <div className="flex space-x-1 items-center justify-center">
              <div className={styles.searchWrapper}>
                  <span className={styles.searchIcon}>
                  <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                  >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  </span>
                  <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="Search..."
                    autoComplete="off"
                    style={{paddingTop: '10px', paddingBottom: '10px'}}
                  />
              </div>
              
              <div className="flex space-x-1 justify-center items-center">
                {
                  !showSearchInput ? <div className='rounded-full bg-black border border-gray-900 p-2 my-2 md:hidden'
                      onClick={() => setShowSearchInput(true)}>
                      <BsSearch className="SecondIcon text-[#DC143C] hover:text-[#e5163f]" />
                    </div> : <div className={`relative text-gray-600 focus-within:text-gray-400 md:hidden`} onMouseOut={() => setShowSearchInput(false) }>
                      <span className={styles.searchIcon}>
                      <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                      >
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      </span>
                      <input
                        type="search"
                        className={styles.searchInput}
                        placeholder="Search..."
                        autoComplete="off"
                        style={{paddingTop: '10px', paddingBottom: '10px'}}
                      />
                  </div>
                }
                <div className='rounded-full bg-black border border-gray-900 p-2 md:mx-2 my-2'
                  onClick={() => setOpenVoiceNavigation(true)}>
                  <FiMic className="SecondIcon text-[#DC143C] hover:text-[#e5163f]" />
                </div>
              </div>

            </div>

            {/* Icons  */}
            <div className={styles.iconsWrapper}>
                {
                  session?.user?.email ? <>
                    <button className={`${styles.buttons} hidden md:flex`}
                      onClick={() => {
                        let {modal, blog, post, ask, idea, review, poll} = openCreationModal;
                        modal = true;
                        setOpenCreationModal({modal, blog, post, ask, idea, review, poll})
                      }}>
                        Create
                        <BiListPlus 
                            className="h-10 w-6 sm:h-12 sm:w-8 pl-2" 
                        />
                    </button>
                    <div className='hidden md:inline'
                      onClick={() => setOpenDropDown(true)}>
                      <GiBatMask className="icon text-[#DC143C] hover:text-[#e5163f]" />
                    </div>
                    <div className='hidden md:inline'>
                      <IoMdNotifications className="icon text-[#DC143C] hover:text-[#e5163f]" />
                    </div>
                  </> : <div
                    className="hidden md:inline"
                    onClick={() => signIn()}>
                    <MdOutlineLogin className="icon text-[#DC143C] hover:text-[#e5163f] rounded-none" />
                  </div>
                }
            </div>
        </div>
      </div>
    </div>
  )
};

export default NavBar;
