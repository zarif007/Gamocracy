import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

const BlogContentForTimeline = ({ blog }: any) => {

  const router = useRouter();
  return (
    <div className="bg-black text-gray-200 mb-4">
      <div className="rounded-md flex justify-center font-semibold text-gray-300 flex-col border-2 border-[#DC143C] bg-[#121212] cursor-pointer"
        onClick={() => {
          router.push(`/write/blog/${blog.blogId}`);
        }}>
        <Image
          src={blog.coverImage}
          alt="Current Image"
          width={900}
          height={300}
          className="rounded-md"
        />
        <div className="m-2 mx-4">
            <span className='rounded-md text-lg font-semibold py-1 px-3 border border-[#DC143C] text-[#DC143C]'>Blog📝</span>
        </div>
        <div className="mx-4 mb-4">
        <h1 className="text-5xl md:text-6xl font-bold my6 text-[#DC143C]">{blog.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default BlogContentForTimeline
