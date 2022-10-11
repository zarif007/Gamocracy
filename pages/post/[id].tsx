import React from 'react'
import postInterface from '../../Interfaces/PostInterface'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Image from 'next/image';


const post: postInterface = {
    content: "Awesome", 
    images: ['https://gc-s3images.s3.amazonaws.com/post/testing-16654863763571.jpeg', 'https://gc-s3images.s3.amazonaws.com/post/testing-16654863763570.jpeg', 'https://gc-s3images.s3.amazonaws.com/post/testing-16654863763572.jpeg'],
    postId: "testing-1665486376357",
    title: "Testing", 
}

const Post = () => {
  return (
    <>
      <AwesomeSlider
      media={[
        {
          source: post.images[0],
        },
        {
          source: post.images[1],
        },
        {
          source: post.images[2],
        },
      ]} />
    </>
  )
}

export default Post
