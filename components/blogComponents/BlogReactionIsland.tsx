import React from "react";
import { GiPunchBlast, GiRank3, GiSelfLove } from "react-icons/gi";
import { GoComment } from "react-icons/go";
import { MdShare } from "react-icons/md";

const BlogReactionIsland = () => {
  return (
    <div className="flex justify-center mt-1 max-x-full">
      <div className="fixed z-50 bg-black shadow-lg shadow-gray-900 rounded-lg px-8 py-2 flex text-gary-500 space-x-4 md:space-x-12 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <GiSelfLove className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
          <p className="text-xs font-semibold">156</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <GiPunchBlast className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
          <p className="text-xs font-semibold">256</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <GoComment className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
          <p className="text-xs font-semibold">298</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <GiRank3 className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
          <p className="text-xs font-semibold">56</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MdShare className="h-8 w-12 cursor-pointer hover:text-[#DC143C] transition duration-200 ease-out" />
          <p className="text-xs font-semibold">98</p>
        </div>
      </div>
    </div>
  );
};

export default BlogReactionIsland;
