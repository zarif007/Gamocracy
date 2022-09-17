import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentPlayingBlog } from "../atoms/currentPlayingBlog";
import { useEffect } from "react";
import { BsStopCircleFill } from "react-icons/bs";

const Widgets = () => {
  const [currentBlog, setCurrentBlog] = useRecoilState(currentPlayingBlog);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      if (currentBlog.title === "") {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(currentBlog.title !== "" || window.speechSynthesis.speaking);
    }
  }, [currentBlog]);

  return (
    <div className="text-white font-bold text-lg">
      {isPlaying && (
        <div className="flex flex-col justify-center items-center rounded-md border-2 border-[#DC143C]">
          {currentBlog.image && (
            <Image
              src={currentBlog.image}
              blurDataURL={currentBlog.image}
              placeholder="blur"
              height={100}
              width={300}
              className="rounded-md"
            />
          )}
          <h1 className="text-xl text-[#DC143C] my-1">{currentBlog.title}</h1>

          <button
            className="bg-black text-[#DC143C] rounded-full mb-1"
            onClick={() => {
              window.speechSynthesis.cancel();
              setCurrentBlog({ title: "", image: "" });
            }}
          >
            <BsStopCircleFill className="h-8 w-12" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Widgets;
