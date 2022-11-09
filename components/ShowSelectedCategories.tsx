import React from "react";

const ShowSelectedCategories: React.FC<{ selectedCategories: string[] }> = ({
  selectedCategories,
}) => {
  return (
    <>
      {selectedCategories.map((sc: string) => {
        return (
          <p
            key={sc}
            className="h-9 border-2 hover:bg-[#DC143C] cursor-pointer border-[#DC143C] px-2 py-1 bg-black rounded-md flex items-center justify-center"
          >
            <span className="lg:hidden">{sc.split(' ')[sc.split(' ').length -1]}</span>
            <span className="hidden lg:inline">{sc}</span>
          </p>
        );
      })}
    </>
  );
};

export default ShowSelectedCategories;
