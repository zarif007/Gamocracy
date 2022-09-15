import React from "react";
import { GiPunchBlast, GiRank3, GiSelfLove } from "react-icons/gi";
import { GoComment } from "react-icons/go";
import { MdShare } from "react-icons/md";

const BlogReactionIsland = () => {
  return (
    <div className="flex justify-center mt-1 max-x-full">
      <div className="fixed z-50 bg-black shadow-lg shadow-gray-900 rounded-lg px-8 py-2 flex text-gary-500 space-x-4 md:space-x-12 mx-auto">
        <GiSelfLove className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
        <GiPunchBlast className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
        <GoComment className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
        <GiRank3 className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
        <MdShare className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
      </div>
    </div>
  );
};

export default BlogReactionIsland;
