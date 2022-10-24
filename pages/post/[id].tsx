import React, { useState } from "react";
import NavBar from "../../components/navBars/NavBar";
import Slider from "../../components/reusable/Slider";
import { MdOutlineAddCircle } from "react-icons/md";
import { useSession } from "next-auth/react";
import EmojiPickerModal from "../../components/modals/EmojiPickerModal";
import { useRecoilState } from "recoil";
import { emojiPickerModal } from "../../atoms/emojiPickerAtom";

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

interface reactionInterface {
  emoji: string,
  reactors: string[],
}

const Post = () => {

  const { data: session } = useSession();

  const [showEmojiPicker, setShowEmojiPicker] = useRecoilState(emojiPickerModal);

  const [reactions, setReactions] = useState<reactionInterface[]>([{ emoji: '😁', reactors: ['eee'] }]);

  const addEmoji = (e: string) => {
    if (!session?.user?.email) return;

    const updated: reactionInterface[] = reactions;

    let alreadyReacted = false;
    let storedReactors: string[] = [];

    updated.map((reaction: reactionInterface, index: number) => {
      
      if (reaction.emoji === e) {
        if (reaction.reactors.includes(session?.user?.email || '')) alreadyReacted = true;

        storedReactors = reaction.reactors;
        updated.splice(index, 1);
        setReactions(updated);
        return;
      }
    })

    alreadyReacted ? (storedReactors.length === 1 ? setReactions([...reactions ]) :
    setReactions([...reactions, { emoji: e, reactors: [...storedReactors.filter(x => x !== session.user?.email)] }])) : 
    (storedReactors.length ? setReactions([...reactions, { emoji: e, reactors: [...storedReactors, session?.user?.email || ''] }]) :
      setReactions([...reactions, { emoji: e, reactors: [session?.user?.email || ''] }]));
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
            reactions.sort((a, b) => {
              if(a.reactors.length > b.reactors.length)
                return -1
              else if(a.reactors.length < b.reactors.length)
                return 1
              return 0
            }).map((reaction: reactionInterface, index: number) => {
              return (
                <span key={index} className="flex justify-center items-center flex-col">
                  <div className={`w-10 h-10 text-3xl cursor-pointer rounded-md  mx-auto hover:bg-[#DC143C] ${reaction.reactors.includes(session?.user?.email || '') ? ' bg-[#DC143C]' : 'bg-gray-800'}`} onClick={() => addEmoji(reaction.emoji)}>
                    {reaction.emoji}
                  </div>
                  <p className="text-white -mt-3 ml-6">{reaction.reactors.length}</p>
                </span>
              )
            })
          }
          <MdOutlineAddCircle className="text-gray-200 bg-zinc-800 rounded-full w-10 h-10 p-1 cursor-pointer" onClick={() => setShowEmojiPicker(true)} />
        </div>
        <div>
          <EmojiPickerModal addEmoji={addEmoji} />
        </div>
      </div>

    </div>
  );
};

export default Post;
