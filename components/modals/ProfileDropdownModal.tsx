import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { showProfileDropdown } from "../../atoms/showProfileDropDownAtom";
import { signOut, useSession } from "next-auth/react";
import { RiSettingsFill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { theme } from "../../atoms/themeAtom";
import EscForModals from "../EscForModals";

const ProfileDropDownModal = () => {
  const isDark = true;

  const [open, setOpen] = useRecoilState(showProfileDropdown);
  const [currentTheme] = useRecoilState(theme);

  const { data: session } = useSession();

  const styles = {
    secondWrapper: `bg-${currentTheme.background} border-[${currentTheme.crimson}]  border-2 rounded-lg p-2 sm:p-4`,
    thirdWrapper: `flex flex-col items-center justify-center`,
    fourthWrapper: `flex items-center mx-auto space-x-2 cursor-pointer px-2 hover:text-white
                    hover:bg-[${currentTheme.hover}] bg-zinc-900 m-1 py-3 rounded-md text-[#DC143C]`,
    icon: `h-14 w-6 sm:h-14 sm:w-6`,
    text: `text-lg font-bold text-white`,
  };

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
          <div
            className={`fixed inset-0 bg-${currentTheme.background} bg-opacity-75 transition-opacity`}
          />
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
              <Dialog.Panel className="relative bg-[#121212] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
                <div className={styles.secondWrapper}>
                  <EscForModals setOpen={setOpen} />
                  <div className="">
                    <div className={styles.fourthWrapper}>
                      <img
                        src={session?.user?.image || ""}
                        className="w-8 rounded-md"
                      />
                      <h1 className={styles.text}>{session?.user?.name}</h1>
                    </div>

                    <div className={styles.fourthWrapper}>
                      <RiSettingsFill className={`icon`} />
                      <h1 className={styles.text}>Settings</h1>
                    </div>

                    <div
                      className={styles.fourthWrapper}
                      onClick={() => signOut()}
                    >
                      <MdOutlineLogout className={`icon`} />
                      <h1 className={styles.text}>Logout</h1>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileDropDownModal;
