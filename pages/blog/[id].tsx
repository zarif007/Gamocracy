import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { GiBulletBill, GiSilverBullet } from 'react-icons/gi';
import { useRecoilState } from 'recoil';
import { creationModal } from '../../atoms/creationModal';
import BlogContent from '../../components/blogComponents/BlogContent';
import BottomNav from '../../components/navBars/BottomNav';
import ComponenetsForIndexes from '../../components/reusable/ComponenetsForIndexes';
import NavBar from '../../components/navBars/NavBar';


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

    const { data } = await axios.get(`https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging/?blogId=${params?.id}`);
  
    return {
      props: { 
        blog: data,
       },
    };
  };

const Blog = ({ blog }: any) => {

  const [openCreationModal, setOpenCreationModal] =
    useRecoilState(creationModal);

  useEffect(() => {
    setOpenCreationModal({
      modal: false,
      blog: false,
      post: false,
      ask: false,
      idea: false,
      review: false,
      poll: false,
    });
  }, [])

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
      <BottomNav />
      <ComponenetsForIndexes />
    </div>
  )
}

const Comments = () => {
  return (
    <div className='border-2 p-4 border-[#DC143C] rounded-md'>
      <h1 className='font-bold text-xl text-gray-300'>Comments</h1>
      <label className="mt-2">Search</label>
        <div className='flex justify-center items-center space-x-2'>
          <div className="relative w-full">
              <input type="text" className="focus:outline-none border-2 border-[#DC143C] bg-[#121212] text-gray-300 text-md font-semibold rounded-md block w-full p-3" placeholder="Shoot" />
          </div>
          <GiBulletBill className='p-1 bg-[#DC143C] w-12 h-12 rounded-md cursor-pointer' />
        </div>
    </div>
  )
}

export default Blog
