import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { apiEndpoints } from "../../../domain";
import userInterface from "../../../Interfaces/UserInterface";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`${apiEndpoints.user}/?email=${params?.id}`);

  return {
    props: {
      user: data,
    },
  };
};

const UserSettings: React.FC<{ user: userInterface }> = ({ user }) => {
  const {
    query: { id },
  } = useRouter();
  return (
    <div className="max-w-5xl mx-auto mt-16">
      <div className="mx-4">
        <h1 className="text-4xl my-2 font-bold text-[#DC143C]">User Settings</h1>
        <p className="mt-6 text-xl font-bold text-gray-300">User Name</p>
        <input
            className={`border-2 border-white w-full py-2 bg-black text-xl font-bold mb-4 mt-1 px-1 text-gray-300`}
            placeholder="User Name"
            defaultValue={user.name}
            onChange={(e: any) => {}}
        />
        <p className="mt-6 text-xl font-bold text-gray-300 mb-2">User Image</p>
        <div className="flex space-x-4">
            <Image
            className="rounded-md"
            src={user.image}
            height={130}
            width={130}
            />

            {/* Image uploading */}
            <label className="flex flex-col rounded-md border-2 border-dashed border-white w-32 h-32 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col justify-center items-center  ">
                <p className="pointer-none text-gray-500 text-sm md:text-lg">
                Select a new DP
                </p>
            </div>
            <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e: any) => {}}
            />
            </label>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
