import React from 'react'

const EscForModals = ({ setOpen }: any) => {
  return (
    <div className="flex justify-end cursor-pointer"
        onClick={() => setOpen(false)}>
        <span className="bg-gray-900 text-gray-400 p-1 px-2 rounded-lg">X Esc</span>
    </div>
  )
}

export default EscForModals
