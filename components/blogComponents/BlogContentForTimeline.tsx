import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsSmartwatch } from 'react-icons/bs';
import { GiEyeTarget, GiPunchBlast, GiRank3, GiSelfLove } from 'react-icons/gi';
import { apiEndpoints } from '../../domain';
import Moment from 'react-moment';
import dynamic from 'next/dynamic';
import blogInterface from '../../Interfaces/BlogInterface';
const LoadingSkeleton = dynamic(() => import('../reusable/LoadingSkeleton'));
const ShowRelatedGames = dynamic(() => import('../ShowRelatedGames'));
import userInterface from './../../Interfaces/UserInterface';
import { Tooltip } from '@material-tailwind/react';
import { GoComment } from 'react-icons/go';
const ShowSelectedCategories = dynamic(() => import('../ShowSelectedCategories'));

const BlogContentForTimeline: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const { author, title, coverImage, blogId, createdAt, content, selectedGames, selectedCategories, views } = blog;

  const router = useRouter();

  const [contentInfo, setContentInfo] = useState<{ contentInString: string, wordCount: number }>({
    contentInString: '',
    wordCount: 0,
  });

  const [authorInfo, setAuthorInfo] = useState<userInterface>({
    name: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${author}`)
      .then(res => setAuthorInfo(res.data))
  }, [])

  useEffect(() => {
    let cn = document.getElementById(`content-${coverImage}`);

    const up = contentInfo;
    up.wordCount = cn?.textContent?.trim().split(/\s+/).length || 0;
    up.contentInString = cn?.textContent || '';
    setContentInfo(up);
  }, [blog])

  return (
    <div className="bg-black text-gray-200 mb-4">
      <div className="rounded-md flex justify-center font-semibold text-gray-300 flex-col border-2 border-[#DC143C] bg-[#121212]">
        {/* Cover Image */}
        <Image
          src={coverImage}
          alt="Current Image"
          width={900}
          height={300}
          blurDataURL="URL"
          placeholder='blur'
          objectFit='cover'
          className="rounded-md cursor-pointer"
          onClick={() => {
            router.push(`/blog/${blogId}`);
          }}
        />

        {/* Blog info */}
        <div className="mx-4 flex mt-4 justify-between md:justify-start md:space-x-16 items-center">
          {
            authorInfo.email ?
              <div className="flex space-x-2 justify-center items-center">
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
                  <h1 className="text-sm">{authorInfo?.name}</h1>
                  <h2 className="text-xs text-gray-500 font-semibold">
                    <Tooltip content={`${createdAt.toString()}`} placement="bottom-start">
                      <div>
                        <Moment toNow ago>
                          {createdAt}
                        </Moment> <span> ago</span>
                      </div>
                    </Tooltip>
                  </h2>
                </div>
              </div> :
              <LoadingSkeleton iteration={2} />
          }
          <div className="flex justify-center items-center space-x-1 text-gray-400">
            <BsSmartwatch className='h-12' />
            <h1 className='text-xs font-semibold'>{Math.trunc(contentInfo.wordCount / 100) + 1} min read</h1>
          </div>

          <div className="flex justify-center items-center space-x-1 text-gray-400">
            <GiEyeTarget className='h-12' />
            <h1 className='text-xs font-semibold'>{views}</h1>
          </div>
        </div>

        {/* Title */}
        <div className="mx-4 mb-4">
          <h1 className="text-xl md:text-3xl font-bold my-1 text-[#DC143C] cursor-pointer title"
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}>
            {title}
          </h1>
        </div>

        <div id={`content-${coverImage}`} dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
          className="hidden">
        </div>

        {/* Related Games and categories */}
        <div className={`mb-2 flex sapce-x-1 items-center flex-wrap`}>
          <ShowRelatedGames selectedGames={selectedGames} />
          <span className="text-4xl font-bold text-[#DC143C] mb-1 title"> + </span>
          <div className="flex space-x-2 mx-4 my-1 md:my-0 text-xs md:text-lg">
            <ShowSelectedCategories selectedCategories={selectedCategories} />
          </div>
        </div>

        {/* Content in short */}
        <div className='mx-4 mb-1 text-sm md:text-md font-bold'>
          <span className='md:hidden'>{contentInfo.contentInString.slice(0, Math.min(100, contentInfo.contentInString.length))}</span>
          <span className='hidden md:inline'>{contentInfo.contentInString.slice(0, Math.min(250, contentInfo.contentInString.length))}</span>
          <span
            className='text-[#DC143C] cursor-pointer'
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}> ...more</span>
        </div>

        {/* Blog reactions */}
        <div className="flex items-center justify-between mx-4 my-2 text-gray-300">
          <div className='flex space-x-4'>
            <div className="flex space-x-1 justify-center items-center">
              <GiSelfLove className='h-6 w-6 ' />
              <p className="text-sm">166</p>
            </div>
            <div className="flex space-x-1 justify-center items-center">
              <GiPunchBlast className='h-6 w-6 ' />
              <p className="text-sm">508</p>
            </div>
            <div className="flex space-x-1 justify-center items-center">
              <GoComment className='h-6 w-6 ' />
              <p className="text-sm">124</p>
            </div>
          </div> 
          <div>
            <GiRank3 className='h-8 w-8 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out' />
          </div>
        </div>
      </div>
    </div>
  )
}


export default BlogContentForTimeline