import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { theme } from '../../atoms/themeAtom';
import { voiceNavModal } from '../../atoms/voiceNavigationModalAtom';
import EscForModals from '../EscForModals';





const VoiceNavigationModal = () => {

  const [open, setOpen] = useRecoilState(voiceNavModal);

  const [currentTheme] = useRecoilState(theme);

  const [command, setCommand] = useState<string>('');

  const [voiceState, setVoiceState] = useState<String>('Listening......');

  const [result, setResult] = useState<String>('');

  const router = useRouter();


  const voiceCommands = (recognition: any) => {
    // On start
    recognition.onstart = () => {

      setCommand('');
      setResult('');
      setVoiceState('Listening......');
    }

    // Do something when we get a result
    recognition.onresult = (e: any) => {
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;
      setCommand(transcript)

      const routes = ['home', 'write', 'ask', 'go', 'podcast', 'work', 
                      'shop', 'nft', 'sponsor', 'vote', 'clan'];

      routes.map((route: string) => {
        if(transcript.includes(route)){
          setResult(`Navigating to ${route}`);
          route === 'home' ? router.push('/') : router.push(`/${route}`);

          setOpen(false)
        }
      })

    }

    recognition.onspeechend = () => {
      recognition.stop();
      setVoiceState('Stopped')
      setCommand('');
      setResult(`Did not get it :(`);
    }

  }

  const activateVoice = () => {
    if (window !== undefined) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if(SpeechRecognition) {
        const recognition = new SpeechRecognition();

        if(open){
          recognition.start();
          voiceCommands(recognition);
        } else {
          recognition.stop();
          setVoiceState('Stopped')
        }
      } else {
        setVoiceState('Stopped')
        setCommand('');
        setResult(`Sorry :( not supported yet`);
      }
      
    }
  }

  useEffect(() => {
    activateVoice(); 
  }, [open]);

  const styles = {
    secondWrapper: `bg-${currentTheme.background} border-[${currentTheme.crimson}]  border-2 rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
    reusltStyle: `${!result.startsWith('Navigating') ? 'text-red-500' : 'text-blue-500'} font-semibold text-lg mb-6`,
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
          <div className={`fixed inset-0 bg-${currentTheme.background} bg-opacity-75 transition-opacity`} />
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
              <Dialog.Panel className={`relative text-white bg-${currentTheme.wrapper} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}>
                <div className={styles.secondWrapper}>
                    <EscForModals setOpen={setOpen} />
                    <h1 className='font-bold text-3xl'>{voiceState}</h1>
                    <h1 className='font-bold text-3xl'>{command}</h1>
                    <h1 className={styles.reusltStyle}>{result}</h1>
                    <span 
                      className={`px-4 py-2 cursor-pointer font-semibold text-lg text-[${currentTheme.crimson}] border-[${currentTheme.crimson}] border rounded-sm`}
                      onClick={() => activateVoice()}>
                      Try again</span>
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