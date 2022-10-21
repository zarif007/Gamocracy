import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { emojiPickerModal } from "../../atoms/emojiPickerAtom";
import { theme } from '../../atoms/themeAtom';
import EmojiPicker from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';

const EmojiPickerModal = ({ addEmoji }: any) => {
    const [open, setOpen] = useRecoilState(emojiPickerModal);
    const [currentTheme] = useRecoilState(theme);

    const styles = {
        secondWrapper: ` bg-${currentTheme.background} border-[${currentTheme.crimson}]  border-2 rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
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
                            <Dialog.Panel
                                className={`relative bg-[${currentTheme.wrapper}] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}>
                                <div className={styles.secondWrapper}>
                                    <EmojiPicker width={425} onEmojiClick={(e) => addEmoji(e.emoji)} theme={Theme.DARK} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default EmojiPickerModal
