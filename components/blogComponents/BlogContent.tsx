import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndpoints } from "../../domain";
import Moment from 'react-moment';


const BlogContent = ({ blog }: any) => {

  const router = useRouter();
  const [authorInfo, setAuthorInfo] = useState<{name: string; email: string; image: string}>({
    name: '', 
    email: '',
    image: '',
  });


  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${blog.author}`)
      .then(res => setAuthorInfo(res.data))

    let cn = document.getElementById("content");
    
    cn?.textContent?.trim().split('.').map((ar: any) => {
      console.log(ar)
    })
  }, [])


  return (
    <div className="bg-black text-gray-200 mb-4">
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content="Write About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-16 mx-1 md:mx-0 rounded-md flex justify-center font-semibold text-gray-300 flex-col border-x-2 border-[#DC143C] bg-[#121212] border-b-2">
        {
          blog.coverImage !== '' && <Image
            className="cursor-pointer rounded-md"
            src={blog.coverImage}
            alt="Current Image"
            width={900}
            height={300}
            onClick={() => {
              router.push(`/blog/${blog.blogId}`);
            }}
          />
        }

        <div className="mx-4 flex mt-4 justify-between">
          {
            authorInfo.email ? <div className="flex space-x-2">
              <img src={authorInfo.image} alt="Dp" style={{ height: "45px" }} className="rounded-md" />
              <div className="flex flex-col">
                <h1>{authorInfo?.name}</h1>
                <h2 className="text-sm text-gray-500">
                  <Moment toNow ago>
                    {blog.createdAt} 
                  </Moment> <span> ago</span>
                </h2>
              </div>
            </div> : 
            <div className="animate-pulse mt-1">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            </div>
          }
          <button className="px-4 py-2 text-md font-semibold border-2 border-[#DC143C] rounded-md">Subscribe</button>
        </div>

        <div className="mx-4 mb-4">
          <h1 
            className="text-5xl md:text-6xl font-bold my-4 md:my-8 text-[#DC143C] cursor-pointer"
            onClick={() => {
              router.push(`/blog/${blog.blogId}`);
            }}>
              {blog.title}
          </h1>
          {
            <div
            id="content"
              className=""
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            ></div>
          }
        </div>
      </div>
    </div>
  );
};

export default BlogContent;