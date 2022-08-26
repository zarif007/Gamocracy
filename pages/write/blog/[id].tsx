import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { GiBulletBill, GiSilverBullet } from 'react-icons/gi';
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
      <div className='flex max-w-5xl mx-auto justify-center flex-col'>
        <BlogContent blog={blog} />

        <div className='my-6'>
          <Comments />
        </div>
      </div>

    </div>
  )
}

const Comments = () => {
  return (
    <div className='border-2 p-6 border-[#DC143C] rounded-md'>
      <h1 className='font-bold text-xl text-gray-300'>Comments</h1>
      <label className="mt-2">Search</label>
        <div className='flex justify-center items-center space-x-2'>
          <div className="relative w-full">
              <input type="text" className="border border-[#DC143C] bg-[#121212] text-gray-300 text-md font-semibold rounded-md block w-full p-4 " placeholder="Shoot" />
          </div>
          <GiBulletBill className='p-1 bg-[#DC143C] w-12 h-14 rounded-md cursor-pointer' />
        </div>
    </div>
  )
}

export default Blog
