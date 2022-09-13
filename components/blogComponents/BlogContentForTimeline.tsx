import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsSmartwatch } from 'react-icons/bs';
import { GiBeastEye, GiEyeTarget } from 'react-icons/gi';
import { apiEndpoints } from '../../domain';

const BlogContentForTimeline = ({ blog }: any) => {

  const router = useRouter();

  const [contentInfo, setContentInfo] = useState<{contentInString: string, wordCount: number}>({
    contentInString: '',
    wordCount: 0,
  });

  const [author, setAuthor] = useState<{name: string; email: string; image: string}>({
    name: '', 
    email: '',
    image: '',
  });

  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${blog.author}`)
      .then(res => setAuthor(res.data))
  }, [])

  useEffect(() => {
    let cn = document.getElementById(`content-${blog.coverImage}`);

    const up = contentInfo;
    up.wordCount = cn?.textContent?.trim().split(/\s+/).length || 0;
    up.contentInString = cn?.textContent?.slice(0, Math.min(250, cn?.textContent?.length)) || '';
    
    setContentInfo(up);
  }, [blog])

  return (
    <div className="bg-black text-gray-200 mb-4">
      <div className="rounded-md flex justify-center font-semibold text-gray-300 flex-col border-2 border-[#DC143C] bg-[#121212]"
        onClick={() => {
          router.push(`/blog/${blog.blogId}`);
        }}>
        {/* Cover Image */}
        <Image
          src={blog.coverImage}
          alt="Current Image"
          width={900}
          height={300}
          className="rounded-md cursor-pointer"
        />
        
        {/* Blog info */}
        <div className="mx-4 flex mt-4 justify-between items-center">
          {
            author.email ? 
            <div className="flex space-x-2 justify-center items-center">
              <img src={author.image} alt="author dp" style={{ height: "30px" }} className="rounded-md" />
              <div className="flex flex-col">
                <h1 className="text-sm">{author?.name}</h1>
                <h2 className="text-xs text-gray-500">12th march, 2022</h2>
              </div>
            </div> : 
            <div className="animate-pulse mt-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            </div>
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
          <h1 className="text-5xl md:text-6xl font-bold my-1 text-[#DC143C] cursor-pointer"
            onClick={() => {
              router.push(`/blog/${blog.blogId}`);
            }}>
              {blog.title}
          </h1>
        </div>

        <div id={`content-${blog.coverImage}`} dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
              className="hidden">
        </div>

        {/* Content in short */}
        <div className='mx-4'>
          {contentInfo.contentInString}
          <span
            className='text-[#DC143C] cursor-pointer'
            onClick={() => {
              router.push(`/blog/${blog.blogId}`);
            }}> ...more</span>
        </div>
      </div>
    </div>
  )
}


export default BlogContentForTimeline
