import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndpoints, deployedDomain } from "../../domain";
import Moment from 'react-moment';
import blogInterface from "../../Interfaces/BlogInterface";
const BlogReactionIsland = dynamic(() => import("./BlogReactionIsland"));
const LoadingSkeleton = dynamic(() => import("../reusable/LoadingSkeleton"));
import userInterface from './../../Interfaces/UserInterface';
const ShowRelatedGames = dynamic(() => import('../ShowRelatedGames'));
import SummaryAudio from './../SummaryAudio';
import ShowSelectedCategories from "../ShowSelectedCategories";

const BlogContent: React.FC<{ blog: blogInterface }> = ({ blog }) => {

  const { author, title, coverImage, blogId, createdAt, content, selectedGames, selectedCategories, views } = blog;

  const [blogContentInString, setBlogContentInString] = useState('');

  const router = useRouter();
  const [authorInfo, setAuthorInfo] = useState<userInterface>({
    name: '', 
    email: '',
    image: '',
  });

  // Count and save view count
  const countView = () => {
    let cn = document.getElementById(`content-${coverImage}`);

    const wordCount = cn?.textContent?.trim().split(/\s+/).length || 0;

    const saveToDB = () => {
      axios.put(`${apiEndpoints.blog}/?blogId=${blogId}`, { ...blog, views: views + 1 })
    }

    // 1000 => milisecond - second
    // 60 => second - min
    // (wordCount / 100 + 1) => 1 min for per 200 words
    // 1 / 3 => 1 / 3 of the total reading time
    const reuiredTimeToCountAView = Math.trunc(1000 * 60 * (wordCount / 100 + 1) * (1 / 3))

    console.log(reuiredTimeToCountAView)
    setTimeout(() => {
      saveToDB()
    }, reuiredTimeToCountAView);
  }


  useEffect(() => {
    axios.get(`${apiEndpoints.user}/?email=${author}`)
      .then(res => setAuthorInfo(res.data))

    countView()
  }, [])

  useEffect(() => {
    let cn = document.getElementById(`content-${coverImage}`);

    setBlogContentInString(cn?.textContent || '')
  }, [blog])

  // const ogUrl = `${deployedDomain}api/og/blog?title=${title}&coverImage=${coverImage}&authorName=${authorInfo.name}&authorImage=${authorInfo.image}`

  return (
    <div className="bg-black text-gray-200 mb-4">
      <Head>
        <title>{title}</title>
        <meta name="description" content={blogContentInString.substr(0, Math.min(20, blogContentInString.length))} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content={coverImage} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
      </Head>
      
      <BlogReactionIsland />

      <div className="mt-20 mx-1 md:mx-0 rounded-md flex justify-center font-semibold text-gray-300 flex-col border-x-2 border-[#DC143C] bg-[#121212] border-y-2">
        {
          coverImage !== '' && <Image
            className="cursor-pointer rounded-md"
            src={coverImage}
            alt="Current Image"
            width={900}
            height={340}
            blurDataURL={coverImage}
            placeholder='blur'
            style={{objectFit:"cover", height: 340, width: 900}}
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}
          />
        }

        <div className="mx-4 flex mt-4 justify-between">
          {
            authorInfo.email ? <div className="flex space-x-2">
              {
                authorInfo.image && <Image
                  className="rounded-md"
                  src={authorInfo.image}
                  height={45}
                  width={45}
                  objectFit="cover"
                  blurDataURL={authorInfo.image}
                  placeholder="blur"
                  alt="user DP"
                />
              }
              <div className="flex flex-col">
                <h1 className="text-sm">{authorInfo?.name}</h1>
                <h2 className="text-sm text-gray-500 font-semibold">
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
        
        {/* Related Games and categories */}
        <div className={`mb-2 flex sapce-x-1 items-center flex-wrap mt-1`}>
          <div className="mx-4 mt-1">
            <ShowRelatedGames selectedGames={selectedGames} />
          </div>
          <div className="flex space-x-2 mx-4 text-xs md:text-lg mt-1">
            <ShowSelectedCategories selectedCategories={selectedCategories} />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <SummaryAudio blog={blog} />
        </div>
        
        {/* Title */}
        <div className="mx-4 mb-4">
          <h1 
            className="text-3xl md:text-5xl font-bold my-4 md:my-8 text-[#DC143C] cursor-pointer title"
            onClick={() => {
              router.push(`/blog/${blogId}`);
            }}>
              {title}
          </h1>

          {/* Content */}
          <div
            id={`content-${coverImage}`}
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