import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { apiEndpoints } from "../../domain";
import { GetServerSideProps } from "next";
import userInterface from "./../../Interfaces/UserInterface";
import Image from "next/image";
import NavBar from "../../components/navBars/NavBar";
import BottomNav from "../../components/navBars/BottomNav";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`${apiEndpoints.user}/?email=${params?.id}`);

  return {
    props: {
      user: data,
    },
  };
};

const User: React.FC<{ user: userInterface }> = ({ user }) => {
  const {
    query: { id },
  } = useRouter();

  const router = useRouter();

  return (
    <div>
      <NavBar />
      <div className="mt-8">
        <div className="flex justify-center items-center flex-col text-gray-300">
          {/* <Image
            className="rounded-md"
            src={user.image}
            height={200}
            width={200}
            objectFit="cover"
            blurDataURL={user.image}
            placeholder="blur"
          /> */}

          <img src={user.image} alt="author dp" style={{ width: "230px", }} className="rounded-md" />
          <p className="font-bold text-2xl md:text-4xl my-4">{user.name}</p>
          <p onClick={() => router.push(`settings/${user.email}`)}>Seetings</p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default User;
