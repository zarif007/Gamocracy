import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import BlogContent from '../../../components/BlogContent';
import NavBar from '../../../components/NavBar';


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

    const { data } = await axios.get(`https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging/?blogId=${params?.id}`);
  
    return {
      props: { 
        blog: data,
       },
    };
  };

const Blog = ({ blog }: any) => {

  const { query: { id } } = useRouter();
  return (
    <div className='bg-black min-h-screen'>
      <NavBar />
      <div className='flex max-w-5xl mx-auto justify-center'>
        <BlogContent blog={blog} />
      </div>

    </div>
  )
}

export default Blog
