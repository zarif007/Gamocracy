import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndpoints } from "../../domain";

const BlogContent = ({ blog }: any) => {

  const router = useRouter();
  const [author, setAuthor] = useState<{name: string; email: string; image: string}>({
    name: '', 
    email: '',
    image: '',
  });


  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${blog.author}`)
      .then(res => setAuthor(res.data))
  }, [])


  return (
    <div className="bg-black text-gray-200 mb-4">
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content="Write About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-1 md:m-0 rounded-md flex justify-center font-semibold text-gray-300 flex-col border-x-2 border-[#DC143C] bg-[#121212] border-b-2">
        <Image
          className="cursor-pointer rounded-md"
          src={blog.coverImage}
          alt="Current Image"
          width={900}
          height={300}
          onClick={() => {
            router.push(`/blog/${blog.blogId}`);
          }}
        />

        <div className="mx-4 flex mt-4 justify-between">
          <div className="flex space-x-2">
            <img src={author.image} alt="author dp" style={{ height: "45px" }} className="rounded-md" />
            <div className="flex flex-col">
              <h1>{author?.name}</h1>
              <h2 className="text-sm text-gray-500">12th march, 2022</h2>
            </div>
          </div>
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
