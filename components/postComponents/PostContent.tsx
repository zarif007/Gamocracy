import axios from "axios";
import Moment from 'react-moment';
import Head from "next/head";
import React, { useState, useEffect } from "react";
import postInterface from "../../Interfaces/PostInterface";
import Slider from "../reusable/Slider";
import PostReactions from "./PostReactions";
import userInterface from '../../Interfaces/UserInterface';
import LoadingSkeleton from '../reusable/LoadingSkeleton';
import { apiEndpoints } from "../../domain";
import { Tooltip } from '@material-tailwind/react';
import { useRecoilState } from 'recoil';
import { creationModal } from "../../atoms/creationModal";

const PostContent: React.FC<{ post: postInterface }> = ({ post }) => {

  const [openCreationModal, setOpenCreationModal] = useRecoilState(creationModal);

  const [authorInfo, setAuthorInfo] = useState<userInterface>({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${post.author}`)
      .then(res => setAuthorInfo(res.data))

    setOpenCreationModal({ ...openCreationModal, post: false });
  }, [])
  
  return (
    <div className="mx-2 md:mx-0">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.substr(0, Math.min(20, post.content.length))} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={post.images[0]} />
      </Head>

      {/* Image, Title and content  */}
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
        <Slider images={post.images} />
        <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2">
          {post.title}
        </div>

        {/* Author Info  */}
        <div className="m-2">
          {
            authorInfo.email ?
              <div className="flex space-x-2 items-center">
                <img src={authorInfo.image} alt="author dp" style={{ height: "30px" }} className="rounded-md" />
                <div className="flex flex-col">
                  <h1 className="text-sm text-gray-200">{authorInfo?.name}</h1>
                  <h2 className="text-xs text-gray-500 font-semibold">
                    <Tooltip content={`${post.createdAt.toString()}`} placement="bottom-start">
                      <div>
                        <Moment toNow ago>
                          {post.createdAt}
                        </Moment> <span> ago</span>
                      </div>
                    </Tooltip>
                  </h2>
                </div>
              </div> :
              <LoadingSkeleton iteration={2} />
          }
        </div>

        <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2 mb-8">
          {post.content.split("\n").map((ps: string, index) => {
            return <div key={index}>{ps}</div>;
          })}
        </div>
      </div>

      
      <PostReactions post={post} forTimeline={false} />
      
    </div>
  );
};

export default PostContent;
