import React, { useState } from "react";
import postInterface from "../../Interfaces/PostInterface";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import NavBar from "../../components/navBars/NavBar";

const post: postInterface = {
  content: `Today, zekken has already made a name for himself as one of the brightest spots on the XSET roster that came from behind to become arguably the second-best team in North America. At Valorant Champions 2022, they also showed up against some of the strongest international competition, taking down FunPlus Phoenix and Fnatic.
  As the latest addition to Sentinels, the youngster now finds himself on a team that has been the face of Valorant since the earliest days of the game. There are lofty expectations to live up to, but zekken appears more than confident.
  
  “I think with the roster that I’m aware of, fans should get excited,” he told tarik. “We’re going to be really, really good.”
  
  Zekken received Counter-Strike as a present for Christmas when he was nine, kickstarting his journey into esports and gaming. But his first encounter with esports came with Super Smash Brothers when he was around 12`,
  images: [
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763571.jpeg",
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763570.jpeg",
    "https://gc-s3images.s3.amazonaws.com/post/testing-16654863763572.jpeg",
    "https://cdn.oneesports.gg/cdn-data/2022/10/Valorant_XSET_zekken_Champions2022-1536x864.webp"
  ],
  postId: "title-001232",
  title: "How zekken went from Silver 1 to Sentinels’ main duelist",
};

const Post = () => {

  return (
    <div className="">
      <NavBar />
      <div className="bg-[#121212] mt-4 rounded-md mb-20 md:mb-4 border-2 border-[#DC143C] max-w-5xl mx-auto">
        <Swiper
          className="bg-black rounded-md"
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => {}}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            post.images.map((image: string, index: number) => {
              return (
                <SwiperSlide className="my-auto grid" key={index}>
                  <div className="text-sm text-gray-300 bg-gray-900 justify-self-end py-1 px-1 rounded-md mt-1 -mb-8 mr-1 z-20">{index + 1}/{post.images.length}</div>
                  <img src={image} className="sm:h-[400px] md:h-[600px] w-full object-contain" />
                </SwiperSlide>
              )
            })
          }
        </Swiper>

        <div className="my-4 text-3xl md:text-5xl font-bold text-[#DC143C] mx-2">{post.title}</div>
        <div className="my-4 text-lg md:text-xl font-semibold text-gray-300 mx-2">{post.content}</div>
      </div>
    </div>
  );
};

export default Post;
