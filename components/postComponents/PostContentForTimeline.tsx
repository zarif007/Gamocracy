import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import postInterface from '../../Interfaces/PostInterface'
import Slider from '../reusable/Slider';
import PostReactions from './PostReactions';

const PostContentForTimeline: React.FC<{ post: postInterface }> = ({ post }) => {

  const router = useRouter();

  return (
    <div className="">
      {/* Image, Title and content  */}  
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">
        <div className="cursor-pointer" onClick={() => router.push(`post/${post.postId}`)}>
            <Slider images={post.images} />
        </div>
        <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2 cursor-pointer"
            onClick={() => router.push(`post/${post.postId}`)}>
          {post.title}
        </div>
        <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2 mb-8">
          {post.content.split("\n").slice(0, Math.min(2, post.content.split("\n").length)).map((ps: string, index) => {
            return <div key={index}>{ps}</div>;
          })}
        </div>
      </div>

      <PostReactions post={post} forTimeline={true} />
    </div>
  )
}

export default PostContentForTimeline
