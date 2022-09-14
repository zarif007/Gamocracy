import Image from "next/image";
import React from "react";
import target from "../public/target.png";
import { signIn } from "next-auth/react";

const SignInReminder = () => {

  return (
    <div className="flex flex-col justify-center bg-[#121212] py-2 px-12 rounded-md border-2 border-[#DC143C] text-gray-300">
        <div className="my-2" >
            <Image src={target} height={350} alt="target"/>
        </div>
        <p className="text-sm text-gray-500 font-semibold">Here we only talk about Gaming</p>
        <button className="px-4 py-1 text-md font-semibold border-2 border-[#DC143C] rounded-md mt-2"
            onClick={() => signIn()}>
          Join
        </button>
      </div>
  );
};

export default SignInReminder;
