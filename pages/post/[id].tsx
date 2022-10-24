import React, { useState } from "react";
import NavBar from "../../components/navBars/NavBar";
import { GetServerSideProps } from "next";
import { apiEndpoints } from "../../domain";
import axios from "axios";
import postInterface from "../../Interfaces/PostInterface";
import { useRouter } from "next/router";
import PostContent from "../../components/postComponents/PostContent";
import BottomNav from "../../components/navBars/BottomNav";
import ComponenetsForIndexes from "../../components/reusable/ComponenetsForIndexes";


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

  const { data } = await axios.get(`${apiEndpoints.post}/?postId=${params?.id}`);

  return {
    props: { 
      post: data,
     },
  };
};


const Post: React.FC<{ post: postInterface }> = ({ post }) => {

  

  const { query: { id } } = useRouter();

  

  return (
    <div className="">
      <NavBar />
      <div className="mt-4 mb-20 md:mb-12  max-w-5xl mx-auto">

        {
          post.author !== '' && <PostContent post={post} />
        }
      </div>
      <BottomNav />
      <ComponenetsForIndexes />
    </div>
  );
};

export default Post;
