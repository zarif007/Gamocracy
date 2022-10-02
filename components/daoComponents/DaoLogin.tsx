import React, { useContext } from 'react'
import { GcDaoContext } from '../../context/context'

const DaoLogin = () => {
  const { connectWithMetamask, currentUserAddress, disconnectWallet } = useContext(GcDaoContext)

  return (
    <div className='text-white flex'>
      {
        !currentUserAddress ? <button className="py-2 px-6 mt-4 mx-auto bg-[#DC143C] font-semibold rounded-md" onClick={connectWithMetamask}>
          Connect with Metamask
        </button> : 
        <div className='flex flex-col lg:flex-row space-x-2 mt-4 mx-auto'>
          <button className="py-2 px-6  bg-[#DC143C] font-semibold rounded-md" onClick={disconnectWallet}>
            Disconnet Wallet
          </button> 
          <p className='py-2 px-6 bg-[#DC143C] font-semibold rounded-md'>{currentUserAddress}</p>
        </div>
      }
    </div>
  )
}

export default DaoLogin
