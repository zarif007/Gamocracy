import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import axios from "axios";
import LoadingSkeleton from "./reusable/LoadingSkeleton";

interface gameForOptionInterface {
  name: string;
  image: string;
}

const Selector = () => {
  const [selectedGame, setSelectedGame] = useState<gameForOptionInterface>({
    name: "",
    image: "",
  });
  const [selectedGames, setSelectedGames] = useState<gameForOptionInterface[]>(
    []
  );
  const [options, setOptions] = useState<gameForOptionInterface[]>([]);

  const addGame = (selectedGame: gameForOptionInterface) => {
    if (selectedGame.name === "") return;

    if(selectedGames.length === 3) return;

    if (!selectedGames.includes(selectedGame)) {
      const updated = selectedGames;
      updated.push(selectedGame);
      setSelectedGames(updated);
      console.log(updated);
    }
  };

  const fetchGames = (query: string) => {
    setOptions([]);
    axios
      .get(
        `https://api.rawg.io/api/games?search=${query}&key=${process.env.NEXT_PUBLIC_RAWG_APIKEY}`
      )
      .then((res) => {
        res.data.results.map((rs: any) => {
          const newObj = { name: rs.name, image: rs.background_image };
          const updated = options;
          updated.push(newObj);
          setOptions(updated);
        });
      });
  };

  return (
    <div>
        <div className="flex items-center space-x-4 my-2">
        {selectedGames.map((game: gameForOptionInterface, index) => {
          return (
            <div
              className="flex items-center space-x-2 bg-black border py-1 px-2 rounded-md cursor-pointer"
              key={index}
              onClick={() => {
                const updated = selectedGames;
                setSelectedGames(updated.filter(up => up.name != game.name))
              }}
            >
              <img src={game.image} alt="bg" className="rounded-md h-6" />
              <p className="text-sm text-gray-300">{game.name}</p>
            </div>
          );
        })}
      </div>

      <Combobox value={selectedGame} onChange={setSelectedGame}>
        <Combobox.Input
          onChange={(event: any) => fetchGames(event.target.value)}
          className={`bg-black border-2 border-gray-300 w-full mb-12 py-3`}
        />
        <Combobox.Options className={`h-48 overflow-y-auto mb-12`}>
          {options.length >0 ? options.map((option: gameForOptionInterface, index) => (
            <Combobox.Option
              key={index}
              value={option.name}
              className="cursor-pointer flex items-center space-x-2"
              onClick={() => addGame(option)}
            >
              <img src={option.image} alt="bg" className="rounded-md h-6" />
              <p className="text-md font-semibold">{option.name}</p>
            </Combobox.Option>
          )) : <LoadingSkeleton iteration={25} /> }
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Selector;
