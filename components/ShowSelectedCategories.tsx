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
            className="border-2 hover:bg-[#DC143C] cursor-pointer border-[#DC143C] px-2 py-1 bg-black rounded-md flex items-center justify-center"
          >
            {sc}
          </p>
        );
      })}
    </>
  );
};

export default ShowSelectedCategories;
