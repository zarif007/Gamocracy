import React, { useEffect, useState } from "react";
import EmojiPicker from 'emoji-picker-react';
import NavBar from "../../components/navBars/NavBar";
import Slider from "../../components/reusable/Slider";
import { Theme } from 'emoji-picker-react';
import { MdOutlineAddCircle } from "react-icons/md";

const post: any = {
  content: `Today, zekken has already made a name for himself as one of the brightest spots on the XSET roster that came from behind to become arguably the second-best team in North America. At Valorant Champions 2022, they also showed up against some of the strongest international competition, taking down FunPlus Phoenix and Fnatic.
  As the latest addition to Sentinels, the youngster now finds himself on a team that has been the face of Valorant since the earliest days of the game. There are lofty expectations to live up to, but zekken appears more than confident.`,
  images: [
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763571.jpeg",
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763570.jpeg",
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763572.jpeg",
    "https://cdn.oneesports.gg/cdn-data/2022/10/Valorant_XSET_zekken_Champions2022-1536x864.webp",
    "https://gc-s3images.s3.amazonaws.com/post/pooopppppppoo-166559941.jpeg",
  ],
  postId: "title-001232",
  title: "How zekken went from Silver 1 to Sentinels’ main duelist",
};

const Post = () => {

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const [selectedEmojies, setSelectedEmojies] = useState<any>({});

  const [emojiesArrayfied, setEmojiesArrayfied] = useState<any>([]);

  const addEmoji = (e: any) => {
    const updated = selectedEmojies;
    updated[`${e}`] = updated[`${e}`] === undefined ? 1 : selectedEmojies[`${e}`] + 1;
    !emojiesArrayfied.includes(e) && setEmojiesArrayfied([ ...emojiesArrayfied, e ]);
    setSelectedEmojies(updated);
  }

  return (
    <div className="">
      <NavBar />
      <div className="mt-4 mb-20 md:mb-12  max-w-5xl mx-auto">
        
        <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
          <Slider images={post.images} />
          <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2">{post.title}</div>
          <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2 mb-8">{post.content}</div>
        </div>

        <div className="flex space-x-2 -mt-6 ml-2">
          {
            emojiesArrayfied.map((emoji: any, index: number) => {
                return (
                  <span key={index} className="">
                    <p className="w-10 h-10 text-3xl cursor-pointer rounded-full bg-red-500" onClick={() => addEmoji(emoji)}>{ emoji }</p>
                    <p className="text-white">{ selectedEmojies[emoji] }</p>
                  </span>
                )
              })
          }

          <div>
            <MdOutlineAddCircle className="text-gray-200 bg-zinc-800 rounded-full w-10 h-10 p-1 cursor-pointer" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
            {
              showEmojiPicker && <EmojiPicker onEmojiClick={(e) => addEmoji(e.emoji)} theme={Theme.DARK} />
            }
          </div>
        </div>
      </div>      
    </div>
  );
};

export default Post;
