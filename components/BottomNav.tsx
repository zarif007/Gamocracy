import React from 'react'
import { BiListPlus, BiTrendingUp } from "react-icons/bi";
import { CgMenuCheese } from 'react-icons/cg';
import { GiBatMask, GiEgyptianProfile, GiPlagueDoctorProfile } from "react-icons/gi";


const BottomNav: React.FC = () => {

    const isDark = 1;

    const styles = {
        wrapper: `w-full h-24 inline md:hidden`,
        itemsWrapper: `block fixed inset-x-0 bottom-0 z-50 ${isDark ? 'bg-black border-gray-800' : 'bg-[#fefefa] shadow-gray-200'} border  justify-center items-center`,
        iconsWrapper: `w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-1 pb-1 items-center`,
        icon: `h-10 w-6 sm:h-12 sm:w-8  inline-flex`,
        iconText: `tab tab-home block text-xs  font-semibold`,
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <section className={styles.itemsWrapper}>
                    <div className="flex justify-between text-[#DC143C] hover:text-[#e5163f]">
                        <div className={styles.iconsWrapper}>
                            <CgMenuCheese className={styles.icon} onClick={() => {}} />
                            <span className={styles.iconText}>Menu</span>
                        </div>
                        <div className={styles.iconsWrapper} onClick={() => {}} >
                            <BiListPlus className={styles.icon} />
                            <span className={styles.iconText}>Create</span>
                        </div>
                        <div className={styles.iconsWrapper} onClick={() => {}}>
                            <GiBatMask className={styles.icon} />
                            <span className={styles.iconText}>Profile</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BottomNav