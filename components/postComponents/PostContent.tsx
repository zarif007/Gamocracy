import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useRecoilState } from "recoil";
import { emojiPickerModal } from "../../atoms/emojiPickerAtom";
import { apiEndpoints } from "../../domain";
import postInterface from "../../Interfaces/PostInterface";
import postReactionInterface from "../../Interfaces/PostReactionInterface";
import { showNotification } from "../../pages/_app";
import EmojiPickerModal from "../modals/EmojiPickerModal";
import Slider from "../reusable/Slider";
import { CgMoreO } from "react-icons/cg";
import { showAllReactionsAtom } from "../../atoms/showAllReactionsModal";
import ShowAllReactions from "../modals/ShowAllReactions";

const PostContent: React.FC<{ post: postInterface }> = ({ post }) => {
  const { data: session } = useSession();

  const [showEmojiPicker, setShowEmojiPicker] =
    useRecoilState(emojiPickerModal);

  const [reactions, setReactions] = useState<postReactionInterface[]>([]);

  const [showAllReactions, setShowAllReactions] = useRecoilState(showAllReactionsAtom);

  useEffect(() => {
    post.reactions !== null && setReactions(post.reactions);
  }, [post]);

  const addEmoji = async (e: string) => {
    if (!session?.user?.email) {
      showNotification("Login to react 😐");
      return;
    }

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

    let updatedReactions = [];

    alreadyReacted
      ? storedReactors.length === 1
        ? updatedReactions = [...reactions]
        : updatedReactions = [
          ...reactions,
          {
            emoji: e,
            reactors: [
              ...storedReactors.filter((x) => x !== session.user?.email),
            ],
          },
        ]
      : storedReactors.length
      ? updatedReactions = [
        ...reactions,
        {
          emoji: e,
          reactors: [...storedReactors, session?.user?.email || ""],
        },
      ]
      : updatedReactions = [
        ...reactions,
        { emoji: e, reactors: [session?.user?.email || ""] },
      ]
    setReactions(updatedReactions)

    await axios
      .put(`${apiEndpoints.post}/?postId=${post.postId}`, {
        ...post,
        reactions: updatedReactions,
      })
      .then((res) => console.log(res));
  };
  return (
    <div className="mx-2 md:mx-0">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.title}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={post.images[0]} />
      </Head>
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
        <Slider images={post.images} />
        <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2">
          {post.title}
        </div>
        <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2 mb-8">
          {post.content.split("\n").map((ps: string, index) => {
            return <div key={index}>{ps}</div>;
          })}
        </div>
      </div>

      <div className="flex space-x-1 -mt-6 ml-2 flex-wrap">
        {reactions &&
          reactions
            .sort((a, b) => {
              if (a.reactors.length > b.reactors.length) return -1;
              else if (a.reactors.length < b.reactors.length) return 1;
              return 0;
            })
            .slice(0, Math.min(5, reactions.length))
            .map((reaction: postReactionInterface, index: number) => {
              return (
                <span
                  key={index}
                  className="flex justify-center items-center flex-col"
                >
                  <div
                    className={`w-10 h-10 text-3xl cursor-pointer rounded-md  mx-auto ml-2 ${reaction.reactors.includes(session?.user?.email || "")
                            ? " bg-[#DC143C]"
                            : "bg-gray-800"
                        }`}
                    onClick={() => addEmoji(reaction.emoji)}
                >
                    {reaction.emoji}
                </div>
                <p className="text-gray-300 font-semibold -mt-3 ml-6">
                    {reaction.reactors.length}
                </p>
                </span>
              );
            })}
        <ShowAllReactions reactions={reactions} addEmoji={addEmoji} />
        <CgMoreO className="text-gray-200 bg-zinc-800 rounded-full w-10 h-10 p-1 cursor-pointer"
          onClick={() => setShowAllReactions(true)} />
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
