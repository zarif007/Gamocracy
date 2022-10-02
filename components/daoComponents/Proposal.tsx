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
    <div className="text-white">
      
      {/* Proposer */}
      <div>
        Proposer: {truncateEthAddress(proposal.proposer)}
      </div>
      <div>{proposal.state}</div>
    </div>
  )
}

export default Proposal
