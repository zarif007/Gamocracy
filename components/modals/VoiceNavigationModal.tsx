import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { voiceNavModal } from '../../atoms/voiceNavigationModalAtom';





const VoiceNavigationModal = () => {

  const isDark = true;

  const [open, setOpen] = useRecoilState(voiceNavModal);

  const [command, setCommand] = useState<string>('');

  if(open){

    

  }


  const voiceCommands = (recognition: any) => {
    // On start
    recognition.onstart = () => {
      console.log('Voice is actived');
    }

    // Do something when we get a result
    recognition.onresult = (e: any) => {
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;
      console.log(transcript)
      setCommand(transcript)
    }

    // recognition.onspeechend = () => {
    //   recognition.stop();
    //   console.log('voice stopped');
    // }

  }

  useEffect(() => {

    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      if(open){
        recognition.start();
        voiceCommands(recognition);
      } else {
        recognition.stop();
        console.log('voice stopped');
      }
    } 
  }, [open]);

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
              <Dialog.Panel className="relative text-white bg-[#121212] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className={styles.secondWrapper}>
                    <h1 className='font-bold text-3xl'>Listening......</h1>
                    <h1 className='font-bold text-3xl'>{command}</h1>
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default VoiceNavigationModal