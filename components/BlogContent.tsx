import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Head from "next/head";

const BlogContent = ({ blog }: any) => {
  return (
    <div className="bg-black text-gray-200 border-2 border-[#DC143C]">
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content="Write About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center font-semibold text-gray-300 flex-col">
        <Image
          src={blog.coverImage}
          alt="Current Image"
          width={900}
          height={300}
        />
        <div className="m-4">
        <h1 className="text-5xl md:text-6xl font-bold my-12 text-[#DC143C]">{blog.title}</h1>
          {
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content),
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default BlogContent;