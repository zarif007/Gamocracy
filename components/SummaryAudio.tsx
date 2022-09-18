import React, { useState } from 'react'
import { BsFillPlayCircleFill, BsStopCircleFill } from 'react-icons/bs';
import blogInterface from '../Interfaces/BlogInterface';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentPlayingBlog } from '../atoms/currentPlayingBlog';
import DOMPurify from 'isomorphic-dompurify';

const SummaryAudio: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlog, setCurrentBlog] = useRecoilState(currentPlayingBlog);

  const handleVoice = () => {
    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = `Auto Generated. Title: ${blog.title}.
                  Content: ${document.getElementById(`content-${blog.coverImage}`)?.textContent}`;

      setIsPlaying(!isPlaying)
      window.speechSynthesis.cancel();

      msg.voice = window.speechSynthesis.getVoices()[2];

      if(isPlaying) {
        setCurrentBlog({ title: '', image: '' })
      } else {
        window.speechSynthesis.speak(msg);
        setCurrentBlog({ title: blog.title, image: blog.coverImage })
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

        <div id={`content-${blog.coverImage}`} dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
              className="hidden">
        </div>
      </div>
    </>
  )
}

export default SummaryAudio
