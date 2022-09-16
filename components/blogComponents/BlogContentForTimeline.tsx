import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsSmartwatch } from 'react-icons/bs';
import { GiEyeTarget } from 'react-icons/gi';
import { apiEndpoints } from '../../domain';
import Moment from 'react-moment';
import dynamic from 'next/dynamic';
import blogInterface from '../../Interfaces/BlogInterface';
const LoadingSkeleton = dynamic(() => import('../reusable/LoadingSkeleton'));
const ShowRelatedGames = dynamic(() => import('../ShowRelatedGames'));
import userInterface from './../../Interfaces/UserInterface';

const BlogContentForTimeline: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const { author, title, coverImage, blogId, createdAt, content, selectedGames } = blog;

  const router = useRouter();

  const [contentInfo, setContentInfo] = useState<{contentInString: string, wordCount: number}>({
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
      <div className="rounded-md flex justify-center font-semibold text-gray-300 flex-col border-2 border-[#DC143C] bg-[#121212]"
        onClick={() => {
          router.push(`/blog/${blogId}`);
        }}>
        {/* Cover Image */}
        <Image
          src={coverImage}
          alt="Current Image"
          width={900}
          height={300}
          blurDataURL="URL"
          placeholder='blur'
          className="rounded-md cursor-pointer"
        />
        
        {/* Blog info */}
        <div className="mx-4 flex mt-4 justify-between md:justify-start md:space-x-16 items-center">
          {
            authorInfo.email ? 
            <div className="flex space-x-2 justify-center items-center">
              <img src={authorInfo.image} alt="author dp" style={{ height: "30px" }} className="rounded-md" />
              <div className="flex flex-col">
                <h1 className="text-sm">{authorInfo?.name}</h1>
                <h2 className="text-xs text-gray-500">
                <Moment toNow ago>
                  {createdAt} 
                </Moment> <span> ago</span>
                </h2>
              </div>
            </div> : 
            <LoadingSkeleton iteration={2} />
          }
          <div className="flex justify-center items-center space-x-1 text-gray-400">
            <BsSmartwatch className='h-12' />
            <h1 className=''>{Math.trunc(contentInfo.wordCount / 200) + 1} min read</h1>
          </div>

          <div className="flex justify-center items-center space-x-1 text-gray-400">
            <GiEyeTarget className='h-12' />
            <h1 className=''>7.5K</h1>
          </div>
        </div>
        
        {/* Title */}
        <div className="mx-4 mb-4">
          <h1 className="text-3xl md:text-6xl font-bold my-1 text-[#DC143C] cursor-pointer"
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
        
        {/* Related Games */}
        <div className='mb-2'>
          <ShowRelatedGames selectedGames={selectedGames} />
        </div>
        
        {/* Content in short */}
        <div className='mx-4'>
          <span className='md:hidden'>{contentInfo.contentInString.slice(0, Math.min(100, contentInfo.contentInString.length))}</span>
          <span className='hidden md:inline'>{contentInfo.contentInString.slice(0, Math.min(250, contentInfo.contentInString.length))}</span>
          <span
            className='text-[#DC143C] cursor-pointer'
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}> ...more</span>
        </div>
      </div>
    </div>
  )
}


export default BlogContentForTimeline