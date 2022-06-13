import React, { useState } from "react";

const Feed = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div className="text-white flex-grow">
      <div className="text-white flex items-center sm:justify-between py-2 px-3 bg-[#121212] border border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold">Resources</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto"></div>
      </div>
    </div>
  );
};

export default Feed;
