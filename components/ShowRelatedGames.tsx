import React from 'react'
import gameForOptionInterface from '../Interfaces/GameForOptionInterface'
import { Tooltip } from '@material-tailwind/react';

const ShowRelatedGames: React.FC<{ selectedGames : gameForOptionInterface[]}> = ({ selectedGames }) => {
  return (
    <div className="flex space-x-1 mx-4">
        {
        selectedGames && selectedGames.map((game: gameForOptionInterface) => {
            return (
            <Tooltip key={game.image} content={`${game.name}`} placement="bottom-start">
                <img  src={game.image} className="h-10 w-10 border-2 border-[#DC143C] rounded-full" />
            </Tooltip>
            )
        })
        }
    </div>
  )
}

export default ShowRelatedGames
