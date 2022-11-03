import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiEndpoints } from '../../domain';
import { GetServerSideProps } from 'next';
import userInterface from './../../Interfaces/UserInterface';
import Image from 'next/image';


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { data } = await axios.get(`${apiEndpoints.user}/?email=${params?.id}`);

    return {
        props: {
            user: data,
        },
    };
};

const User: React.FC<{ user: userInterface }> = ({ user }) => {

    const { query: { id } } = useRouter();

    const router = useRouter();

    return (
        <div className='mt-24'>
            <div className='flex justify-center items-center flex-col text-gray-300'>
                <Image 
                    className="rounded-md" 
                    src={user.image} 
                    height={200} 
                    width={200} 
                    objectFit="cover"
                    blurDataURL={user.image}
                    placeholder='blur' 
                />
                <p className='font-bold text-2xl md:text-4xl my-4'>{user.name}</p>
                <p onClick={() => router.push(`settings/${user.email}`)}>Seetings</p>
            </div>
            
        </div>
    )
}

export default User
