import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import postInterface from "../../Interfaces/PostInterface";
import Slider from "../reusable/Slider";
import PostReactions from "./PostReactions";

const PostContent: React.FC<{ post: postInterface }> = ({ post }) => {
  
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
