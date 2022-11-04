import { Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { apiEndpoints } from '../../domain';
import postInterface from '../../Interfaces/PostInterface'
import userInterface from '../../Interfaces/UserInterface';
import LoadingSkeleton from '../reusable/LoadingSkeleton';
import Slider from '../reusable/Slider';
import PostReactions from './PostReactions';

const PostContentForTimeline: React.FC<{ post: postInterface }> = ({ post }) => {

  const router = useRouter();

  const [authorInfo, setAuthorInfo] = useState<userInterface>({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${post.author}`)
      .then(res => setAuthorInfo(res.data))
  }, [])

  return (
    <div className={`${!post?.reactions && 'mb-12'}`}>
      {/* Image, Title and content  */}  
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
        <div className="cursor-pointer" onClick={() => router.push(`post/${post.postId}`)}>
            <Slider images={post.images} />
        </div>
        <div className="my-4 text-2xl md:text-4xl font-bold text-[#DC143C] mx-2 cursor-pointer"
            onClick={() => router.push(`post/${post.postId}`)}>
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

        <div className="my-4 text-sm md:text-md font-bold text-gray-300 mx-2 mb-8">
          {post.content.split("\n").slice(0, Math.min(2, post.content.split("\n").length)).map((ps: string, index) => {
            return <div key={index}>{ps}</div>;
          })}
          <span
            className='text-[#DC143C] cursor-pointer'
            onClick={() => {
              router.push(`/post/${post.postId}`);
            }}> ...more</span>
        </div>
      </div>

      <PostReactions post={post} forTimeline={true} />
    </div>
  )
}

export default PostContentForTimeline
