import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import LoadingSkeleton from "./reusable/LoadingSkeleton";
import gameForOptionInterface from "../Interfaces/GameForOptionInterface";


const Selector = ({
  fetchFunction,
  propsOption,
  addFunction
}: any) => {
  
  const [options, setOptions] = useState<gameForOptionInterface[]>([]);
  const [currentlySelected, setCurrentlySelected] = useState<gameForOptionInterface[]>([]);

  useEffect(() => {
    setOptions(propsOption);
  }, [propsOption]);

  

  return (
    <div>
      <Combobox value={currentlySelected} onChange={setCurrentlySelected}>
        <Combobox.Input
          onChange={(event: any) => fetchFunction(event.target.value)}
          className={`bg-black border-2 border-gray-300 w-full mb-12 py-3`}
        />
        <Combobox.Options className={`h-48 overflow-y-auto mb-12`}>
          {options.length > 0 ? (
            options.map((option: gameForOptionInterface, index) => (
              <Combobox.Option
                key={index}
                value={option.name}
                className="cursor-pointer flex items-center space-x-2"
                onClick={() => addFunction(option)}
              >
                <img src={option.image} alt="bg" className="rounded-md h-6" />
                <p className="text-md font-semibold">{option.name}</p>
              </Combobox.Option>
            ))
          ) : (
            <LoadingSkeleton iteration={25} />
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Selector;
