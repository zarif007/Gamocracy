import { ethers } from 'ethers'
import React, { useState, useMemo, useContext } from 'react'
import truncateEthAddress from 'truncate-eth-address'
import { GcDaoContext } from '../../context/context'

const Proposal = ({ proposal }: any) => {
  const { currentUserAddress, voteFor, executeProposal } = useContext(GcDaoContext)

  const [statusText, setStatusText] = useState('')
  const [statusColor, setStatusColor] = useState('#fff')

  const setStatus = () => {
    switch (proposal.state) {
      case 0:
        setStatusText('Pending')
        setStatusColor('#48494a')
      case 1:
        setStatusText('Active')
        setStatusColor('#21b66f')
        break
      case 3:
        setStatusText('Defeated')
        setStatusColor('#f44336')
        break
      case 7:
        setStatusText('Executed')
        setStatusColor('#0011ff')
        break
      case 4:
        setStatusText('Successful')
        setStatusColor('#21b66f')
        break
      default:
        setStatusText('Unknown')
        setStatusColor('#fff')
    }
  }

  useMemo(() => {
    setStatus()
  }, [statusText, statusColor, proposal.state])

  return (
    <div className="text-gray-200 border-2 border-gray-800 bg-[#121212] rounded-md my-4 font-semibold mx-4">
      
      {/* Proposer */}
      <div className="m-4">
        <span className={`rounded-lg py-1 px-2 my-2 mb-4`} style={{ backgroundColor: statusColor }}>{statusText}</span> <br />
        <span className="my-2">Proposer: {proposal.proposer}</span> <br />
        <div className='font-bold text-lg'>Propose: <span className="text-[#DC143C]">{proposal.description}</span></div>

        {/* {proposal.votes.map((vote: any, index: number) => {
          return (
            <div key={index} className={`my-1 p-2 border-2 border-gray-800 hover:border-[#DC143C] rounded-md cursor-pointer bg-black ${!currentUserAddress && 'cursor-not-allowed'}`}
              onClick={() => {
                if(!currentUserAddress) return;
                voteFor(proposal.proposalId, vote.label, '')
              }}>
              <button
                className='disabled:cursor-not-allowed'
                disabled={!currentUserAddress}
              >
                {vote.label}
              </button>
            </div>
          )
        })}

        <div className='flex space-x-2 md:space-x-4 text-gray-300 text-sm font-semibolds'>
          {
            proposal.votes.map((vote: any, index: number) => {
              const voteCount = ethers.utils.formatEther(vote.count)

              return (
                <div key={index}>
                  <div>
                    {vote.label}: {Math.trunc(parseFloat(voteCount))} GC Token
                  </div>
                </div>
              )
            })
          }
        </div> */}
      </div>

    </div>
  )
}

export default Proposal
