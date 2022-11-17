import { Tooltip } from '@material-tailwind/react';
import axios from 'axios';
import Image from 'next/image';
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

  const [showFullText, setShowFullText] = useState<boolean>(false);

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
    <div className={`${!post?.reactions && 'mb-2'}`}>
      <div className="bg-[#121212] border-2 border-[#DC143C] rounded-md">

        {/* Title */}
        <div className="rounded-md items-center">
          <div className="text-xl md:text-2xl font-bold text-[#DC143C] mx-4 my-3 cursor-pointer title"
              onClick={() => router.push(`post/${post.postId}`)}>{post.title}
          </div>
        </div>

        {/* Image Slider */}
        {
          post.images && <div className="cursor-pointer border-y-2 border-gray-900" onClick={() => router.push(`post/${post.postId}`)}>
              <Slider images={post.images} />
          </div>
        }

        {/* Author Info */}
        <div className="m-2 mx-4">
            {
              authorInfo.email ?
                <div className="flex space-x-2 items-center">
                  {
                    authorInfo.image && <Image
                      className="rounded-md"
                      src={authorInfo.image}
                      height={40}
                      width={40}
                      objectFit="cover"
                      blurDataURL={authorInfo.image}
                      placeholder="blur"
                      alt="user DP"
                    />
                  }
                  <div className="flex flex-col">
                    <h1 className="text-sm text-gray-200">{authorInfo?.name}</h1>
                    <h2 className="text-xs text-gray-500 font-semibold">
                      <Tooltip content={`${post.createdAt.toString()}`} placement="bottom-start">
                        <div>
                          <Moment toNow ago>
                            {post.createdAt}
                          </Moment> 
                        </div>
                      </Tooltip>
                    </h2>
                  </div>
                </div> :
                <LoadingSkeleton iteration={2} />
            }
          </div>

        <div className="my-4 text-sm md:text-md font-bold text-gray-300 mx-4 mb-8">
          {
            showFullText ? <>
              {post.content.split("\n").map((ps: string, index) => {
                return <div key={index}>{ps}</div>;
              })}
            </> : 
            <>
              {
                post.content.slice(0, 250)
              }
              <span
                className='text-[#DC143C] cursor-pointer'
                onClick={() => setShowFullText(true)}> ...more
              </span>
            </>
          }
        </div>
      </div>

      <PostReactions post={post} forTimeline={true} />
    </div>
  )
}

export default PostContentForTimeline
