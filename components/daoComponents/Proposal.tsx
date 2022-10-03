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
    <div className="text-gray-200 border-2 border-gray-900 bg-[#121212] rounded-md my-4 font-semibold mx-4">
      
      {/* Proposer */}
      <div className="m-4">
        <span className={`rounded-lg py-1 px-2 my-2`} style={{ backgroundColor: statusColor }}>{statusText}</span> <br />
        <span className="my-2">Proposer: {proposal.proposer}</span> <br />
        <div className='font-bold text-lg'>Propose: <span className="text-[#DC143C]">{proposal.description}</span></div>

        {proposal.votes.map((vote: any) => {
          return (
            <div key={Math.random()} className="my-1 p-2 border-2 border-gray-900 rounded-md">
              <button
                className=''
                key={Math.random()}
                onClick={() => {
                  voteFor(proposal.proposalId, vote.label, '')
                }}
              >
                {vote.label}
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Proposal
