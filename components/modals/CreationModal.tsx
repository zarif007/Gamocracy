import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { theme } from "../../atoms/themeAtom";
import { creationModal } from './../../atoms/creationModal';
import { FcAnswers, FcBarChart, FcDocument, FcEditImage, FcIdea, FcQuestions } from "react-icons/fc";
import BlogCreation from "../BlogCreation";
import { IoMdArrowBack } from "react-icons/io";

const CreationModal = () => {

  const [open, setOpen] = useRecoilState(creationModal);
  const [currentTheme] = useRecoilState(theme);

  let {modal, blog, post, ask, idea, review, poll} = open;


  const updateCreationModal = () => {
    modal = false;
    setOpen({modal, blog, post, ask, idea, review, poll})
  }

  const styles = {
    secondWrapper: `bg-${currentTheme.background} border-[${currentTheme.crimson}]  border-2 rounded-lg p-2 sm:p-4`,
    thirdWrapper: `flex flex-col items-center justify-center`,
    fourthWrapper: `flex items-center mx-auto space-x-2 cursor-pointer px-2 hover:text-white
                    hover:bg-[${currentTheme.hover}] bg-zinc-900 m-1 py-3 rounded-md text-[#DC143C] w-full`,
    icon: `h-14 w-6 sm:h-14 sm:w-6`,
    text: `text-lg font-bold text-white`,
  };

  return (
    <Transition.Root show={modal || blog || post || ask || idea || review || poll} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
        modal = false; blog = false; post = false; ask = false; idea = false; review = false; poll = false;
        setOpen({modal, blog, post, ask, idea, review, poll})
      }}>
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
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0 mt-20">
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
              <Dialog.Panel className={`relative bg-[#121212] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${modal ? 'sm:max-w-2xl' : 'sm:max-w-4xl'} w-full`}>
                <div className={styles.secondWrapper}>

                  {/* Menu  */}
                  {
                    modal && <div className="">
                      <div className="flex space-x-2">
                          <div className={styles.fourthWrapper}
                            onClick={() => {
                              blog = true;
                              updateCreationModal();
                            }}>
                              <FcDocument className={`icon`} />
                              <h1 className={styles.text}>Blog</h1>
                          </div>

                          <div className={styles.fourthWrapper}
                            onClick={() => {
                              post = true;
                              updateCreationModal();
                            }}>
                              <FcEditImage className={`icon`} />
                              <h1 className={styles.text}>Post</h1>
                          </div>
                      </div>

                      <div className="flex space-x-2">
                      <div className={styles.fourthWrapper}
                        onClick={() => {
                          ask = true;
                          updateCreationModal();
                        }}>
                        <FcQuestions className={`icon`} />
                        <h1 className={styles.text}>Ask</h1>
                      </div>

                      <div
                        className={styles.fourthWrapper}
                        onClick={() => {
                          idea = true;
                          updateCreationModal();
                        }}>
                        <FcIdea className={`icon`} />
                        <h1 className={styles.text}>Idea</h1>
                      </div>
                      </div>

                      <div className="flex space-x-2">
                      <div
                        className={styles.fourthWrapper}
                        onClick={() => {
                          review = true;
                          updateCreationModal();
                        }}>
                        <FcAnswers className={`icon`} />
                        <h1 className={styles.text}>Review</h1>
                      </div>

                      <div
                        className={styles.fourthWrapper}
                        onClick={() => {
                          poll = true;
                          updateCreationModal();
                        }}>
                        <FcBarChart className={`icon`} />
                        <h1 className={styles.text}>Poll</h1>
                      </div>
                      </div>
                    </div>
                  }

                  {
                    blog && <div>
                      <BackToModal open={open} setOpen={setOpen} />
                      <BlogCreation />
                    </div>
                  }

                  {
                    post && <h1 className="text-white">Post</h1>
                  }
                  {
                    ask && <h1 className="text-white">ask</h1>
                  }
                  {
                    review && <h1 className="text-white">review</h1>
                  }

                  
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};


const BackToModal = ({ open, setOpen }: any) => {

  let {modal, blog, post, ask, idea, review, poll} = open;
  
  return (
    <div className="flex justify-end"
      onClick={() => {
        modal = true; blog = false; post = false; ask = false; idea = false; review = false; poll = false;
        setOpen({modal, blog, post, ask, idea, review, poll})
      }}>
      <button className="text-gray-300 bg-gray-900 px-2 py-1 rounded-sm text-md font-semibold flex justify-center items-center space-x-1">
        <IoMdArrowBack /> 
        <p>Back</p>
      </button>
    </div>
  )
}

export default CreationModal;
