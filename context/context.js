import { createContext, useEffect } from 'react'
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useVote,
  useToken,
} from '@thirdweb-dev/react'
import { VoteType } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

export const GcDaoContext = createContext()
export const GcDaoProvider = ({ children }) => {
  const currentUserAddress = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()
  const vote = useVote('0x8D7F6abdf25743cA9603c9671dAf65c338b9ce93')
  const token = useToken('0xafeaf690D4d076b5FF46b8B1e44a74Dbfb95ad60')

  useEffect(() => {
    (async () => {
      try {
        const delegation = await token.getDelegationOf(currentUserAddress)
        if (delegation === ethers.constants.AddressZero) {
          await token.delegateTo(currentUserAddress)
        }
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [])

  const delegateToken = async () => {
    const delegation = await token.getDelegationOf(currentUserAddress)
    if (delegation === ethers.constants.AddressZero) {
      await token.delegateTo(currentUserAddress)
    }
  }

  const getAllProposals = async () => {
    const proposals = await vote.getAll()
    return proposals
  }
  const isExecutable = async id => {
    const canExecute = await vote.canExecute(id)
    return canExecute
  }
  const checkIfVoted = async id => {
    const res = await vote.hasVoted(id, currentUserAddress)
    return res
  }

  const createProposal = async description => {
    const amount = 100_000

    delegateToken()

    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode('mintTo', [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ]
    const proposal = await vote.propose(description, executions)
  }


  const executeProposal = async id => {
    const canExecute = await isExecutable(id)
    if (canExecute) {
      const res = await vote.execute(id)
      console.log(res)
    } else {
      console.log('Can not execute')
    }
  }

  const voteFor = async (id, type, reason) => {
    try {
      const delegation = await token.getDelegationOf(currentUserAddress)
      if (delegation === ethers.constants.AddressZero) {
        await token.delegateTo(currentUserAddress)
      }
      let voteType
      if (type === 'Against') {
        voteType = VoteType.Against
      } else if (type === 'For') {
        voteType = VoteType.For
      } else {
        voteType = VoteType.Abstain
      }
      const res = await checkIfVoted(id)
      if (!res) {
        await vote.vote(id, voteType, reason)
      } else {
        console.log('You have already voted for this proposal')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <GcDaoContext.Provider
      value={{
        getAllProposals,
        isExecutable,
        voteFor,
        createProposal,
        currentUserAddress,
        connectWithMetamask,
        disconnectWallet,
        executeProposal,
        vote,
        delegateToken,
      }}
    >
      {children}
    </GcDaoContext.Provider>
  )
}
