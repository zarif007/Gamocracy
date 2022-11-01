import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Slider: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <Swiper
          className="bg-black rounded-md"
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => {}}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {
            images.map((image: string, index: number) => {
              return (
                <SwiperSlide className="my-auto grid" key={index}>
                  <div className="text-sm text-gray-300 bg-gray-900 justify-self-end py-1 px-1 rounded-md mt-1 -mb-8 mr-1 z-20">{index + 1}/{images.length}</div>
                  <img src={image} className="sm:h-[400px] md:h-[600px] w-full object-contain" loading='lazy' />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
  )
}

export default Slider
