import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useRecoilState } from "recoil";
import { emojiPickerModal } from "../../atoms/emojiPickerAtom";
import postInterface from "../../Interfaces/PostInterface";
import postReactionInterface from "../../Interfaces/PostReactionInterface";
import EmojiPickerModal from "../modals/EmojiPickerModal";
import Slider from "../reusable/Slider";


const PostContent: React.FC<{ post: postInterface }> = ({ post }) => {
  const { data: session } = useSession();

  const [showEmojiPicker, setShowEmojiPicker] =
    useRecoilState(emojiPickerModal);

  const [reactions, setReactions] = useState<postReactionInterface[]>([]);

  useEffect(() => {
    post.reactions !== null && setReactions(post.reactions);
  }, [post])

  const addEmoji = (e: string) => {
    if (!session?.user?.email) return;

    const updated: postReactionInterface[] = reactions;

    let alreadyReacted = false;
    let storedReactors: string[] = [];

    updated.map((reaction: postReactionInterface, index: number) => {
      if (reaction.emoji === e) {
        if (reaction.reactors.includes(session?.user?.email || ""))
          alreadyReacted = true;

        storedReactors = reaction.reactors;
        updated.splice(index, 1);
        setReactions(updated);
        return;
      }
    });

    alreadyReacted
      ? storedReactors.length === 1
        ? setReactions([...reactions])
        : setReactions([
            ...reactions,
            {
              emoji: e,
              reactors: [
                ...storedReactors.filter((x) => x !== session.user?.email),
              ],
            },
          ])
      : storedReactors.length
      ? setReactions([
          ...reactions,
          {
            emoji: e,
            reactors: [...storedReactors, session?.user?.email || ""],
          },
        ])
      : setReactions([
          ...reactions,
          { emoji: e, reactors: [session?.user?.email || ""] },
        ]);
  };
  return (
    <div>
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
        <Slider images={post.images} />
        <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2">
          {post.title}
        </div>
        <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2 mb-8">
          {
            post.content.split('\n').map((ps: string, index) => {
                return(
                    <div key={index}>{ps}</div>
                )
            })
          }
        </div>
      </div>

      <div className="flex space-x-2 -mt-6 ml-2">
        {reactions && reactions
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
                  className={`w-10 h-10 text-3xl cursor-pointer rounded-md  mx-auto hover:bg-[#DC143C] ${
                    reaction.reactors.includes(session?.user?.email || "")
                      ? " bg-[#DC143C]"
                      : "bg-gray-800"
                  }`}
                  onClick={() => addEmoji(reaction.emoji)}
                >
                  {reaction.emoji}
                </div>
                <p className="text-white -mt-3 ml-6">
                  {reaction.reactors.length}
                </p>
              </span>
            );
          })}
        <MdOutlineAddCircle
          className="text-gray-200 bg-zinc-800 rounded-full w-10 h-10 p-1 cursor-pointer"
          onClick={() => setShowEmojiPicker(true)}
        />
      </div>
      <div>
        <EmojiPickerModal addEmoji={addEmoji} />
      </div>
    </div>
  );
};

export default PostContent;
