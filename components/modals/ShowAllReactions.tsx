import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { showAllReactionsAtom } from "../../atoms/showAllReactionsModal";
import { theme } from '../../atoms/themeAtom';;
import postReactionInterface from "../../Interfaces/PostReactionInterface";

const ShowAllReactions: React.FC<{ reactions: postReactionInterface[], addEmoji: any }> = ({ reactions, addEmoji }) => {

    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(showAllReactionsAtom);
    const [currentTheme] = useRecoilState(theme);

    const styles = {
        secondWrapper: ` bg-${currentTheme.background} border-[${currentTheme.crimson}]  border-2 rounded-lg p-6 flex flex-wrap`,
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={setOpen}>
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
                                className={`relative bg-[${currentTheme.wrapper}] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-3xl`}>
                                <div className={styles.secondWrapper}>
                                    {reactions &&
                                        reactions
                                            .sort((a, b) => {
                                                if (a.reactors.length > b.reactors.length) return -1;
                                                else if (a.reactors.length < b.reactors.length) return 1;
                                                return 0;
                                            })
                                            .map((reaction: postReactionInterface, index: number) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="flex justify-center items-center flex-col"
                                                    >
                                                        <div
                                                            className={`w-10 h-10 text-3xl cursor-pointer rounded-md  mx-auto ml-2 ${reaction.reactors.includes(session?.user?.email || "")
                                                                    ? " bg-[#DC143C]"
                                                                    : "bg-gray-800"
                                                                }`}
                                                            onClick={() => addEmoji(reaction.emoji)}
                                                        >
                                                            {reaction.emoji}
                                                        </div>
                                                        <p className="text-gray-300 font-semibold -mt-3 ml-6">
                                                            {reaction.reactors.length}
                                                        </p>
                                                    </span>
                                                );
                                            })}

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShowAllReactions
