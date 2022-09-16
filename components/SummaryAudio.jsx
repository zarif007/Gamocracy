import React, { useState } from 'react'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import { useSpeechSynthesis } from "react-speech-kit";

const SummaryAudio = ({ text }) => {

  const [isPlaying, setIsPlaying] = useState(false);

  const handleVoice = () => {
    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = text;

      setIsPlaying(!isPlaying)
      isPlaying ? window.speechSynthesis.cancel() :  window.speechSynthesis.speak(msg);

     }else{
       alert("Sorry, your browser doesn't support text to speech!");
     }
  }
  
  return (
    <>
      <div className="group">
        <button className="bg-black text-[#DC143C] rounded-full" onClick={handleVoice}>
          { isPlaying ? <BsStopCircleFill className='h-8 w-12' /> :  
            <BsFillPlayCircleFill className='h-8 w-12' /> } 
        </button>
      </div>
    </>
  )
}

export default SummaryAudio
