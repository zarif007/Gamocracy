import React, { useState } from 'react'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import blogInterface from '../Interfaces/BlogInterface';
import { useEffect } from 'react';

const SummaryAudio: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [window])

  const handleVoice = () => {
    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = `Auto Generated: Title: ${blog.title} 
                  Content: ${document.getElementById(`content`)?.textContent}`;

      setIsPlaying(!isPlaying)

      if(isPlaying) {
        window.speechSynthesis.cancel();
      } else {
        window.speechSynthesis.speak(msg);
      }

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

        <div className='hidden' id="content">{blog.content}</div>
      </div>
    </>
  )
}

export default SummaryAudio
