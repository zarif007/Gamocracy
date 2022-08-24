import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { showMenu } from "../atoms/showMenuAtom";
import { Menu } from '@headlessui/react'
import { currentNavItem } from "../atoms/currentNavItemAtom";

const Feed: React.FC<{ name: string }> = ({ name }) => {

  const [menu, setMenu] = useRecoilState(showMenu);

  const [currentNav, setCurrentNav] = useRecoilState<string>(currentNavItem);

  useEffect(() => {
    setMenu(false);
    setCurrentNav(name);
  }, [menu, currentNav])


  return (
    <div className="text-white flex-grow mt-2 md:m-2">
      <div className="text-white flex items-center sm:justify-between py-2 px-3 bg-[#121212] border border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold text-[#DC143C]">{name}</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto"></div>
      </div>
    </div>
  );
};

export default Feed;
