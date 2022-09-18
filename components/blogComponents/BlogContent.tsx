import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndpoints } from "../../domain";
import Moment from 'react-moment';
import blogInterface from "../../Interfaces/BlogInterface";
const BlogReactionIsland = dynamic(() => import("./BlogReactionIsland"));
const LoadingSkeleton = dynamic(() => import("../reusable/LoadingSkeleton"));
import userInterface from './../../Interfaces/UserInterface';
const ShowRelatedGames = dynamic(() => import('../ShowRelatedGames'));
import SummaryAudio from './../SummaryAudio';

const BlogContent: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const { author, title, coverImage, blogId, createdAt, content, selectedGames, selectedCategories } = blog;

  const router = useRouter();
  const [authorInfo, setAuthorInfo] = useState<userInterface>({
    name: '', 
    email: '',
    image: '',
  });


  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${author}`)
      .then(res => setAuthorInfo(res.data))
  }, [])


  return (
    <div className="bg-black text-gray-200 mb-4">
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <BlogReactionIsland />

      <div className="mt-16 mx-1 md:mx-0 rounded-md flex justify-center font-semibold text-gray-300 flex-col border-x-2 border-[#DC143C] bg-[#121212] border-y-2">
        {
          coverImage !== '' && <Image
            className="cursor-pointer rounded-md"
            src={coverImage}
            alt="Current Image"
            width={900}
            height={300}
            blurDataURL={coverImage}
            placeholder='blur'
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}
          />
        }

        <div className="mx-4 flex mt-4 justify-between">
          {
            authorInfo.email ? <div className="flex space-x-2">
              <img src={authorInfo.image} alt="Dp" style={{ height: "45px" }} className="rounded-md" />
              <div className="flex flex-col">
                <h1 className="text-sm">{authorInfo?.name}</h1>
                <h2 className="text-sm text-gray-500">
                  <Moment toNow ago>
                    {createdAt} 
                  </Moment> <span> ago</span>
                </h2>
              </div>
            </div> : 
            <LoadingSkeleton iteration={2}/>
          }
          <button className="px-4 py-2 text-md font-semibold border-2 hover:bg-[#DC143C] border-[#DC143C] rounded-md">Subscribe</button>
        </div>
        
        {/* Related games */}
        <div className="mt-4 flex sapce-x-3 md:space-x-6">
          <ShowRelatedGames selectedGames={selectedGames} />
          <div className="flex space-x-2 mx-4 my-1 md:my-0 text-xs md:text-lg mt-2">
            {
              selectedCategories.map((sc: any) => {
                return (
                  <p key={sc} className="border-2 hover:bg-[#DC143C] cursor-pointer border-[#DC143C] px-2 py-1 bg-gray-900 rounded-md">{sc}</p>
                )
              }) 
            }
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <SummaryAudio blog={blog} />
        </div>
        
        {/* Title */}
        <div className="mx-4 mb-4">
          <h1 
            className="text-3xl md:text-6xl font-bold my-4 md:my-8 text-[#DC143C] cursor-pointer"
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}>
              {title}
          </h1>

          {/* Content */}
          <div
            id="content"
            className=""
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;