import React from 'react'
import gameForOptionInterface from '../Interfaces/GameForOptionInterface'
import { Tooltip } from '@material-tailwind/react';

const ShowRelatedGames: React.FC<{ selectedGames : gameForOptionInterface[]}> = ({ selectedGames }) => {
  return (
    <div className="flex space-x-2">
        {
          selectedGames?.length > 0 && selectedGames.map((game: gameForOptionInterface) => {
              return (
                <Tooltip key={game.image} content={`${game.name}`} placement="bottom-start">
                    <div className='flex items-center justify-center border-2 border-[#DC143C] hover:bg-[#DC143C] rounded-md cursor-pointer h-9 bg-black'>
                      <img  src={game.image} className="h-8 rounded-md" />
                      <p className='text-xs mx-1 lg:inline hidden'>{game.name}</p>
                    </div>
                </Tooltip>
              )
          })
        }
    </div>
  )
}

export default ShowRelatedGames
