import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { sidebarOpen } from '../../atoms/sidebarOpenAtom'
import ComponenetsForIndexes from '../../components/reusable/ComponenetsForIndexes'
import Feed from '../../components/Feed'
import NavBar from '../../components/navBars/NavBar'
import SideBar from '../../components/navBars/SideBar'
import DaoLogin from '../../components/daoComponents/DaoLogin'
import { useContext, useState, useEffect } from 'react'
import { GcDaoContext } from '../../context/context'
import Proposal from '../../components/daoComponents/Proposal'
import { showNotification } from '../_app'
import Spinner from '../../components/reusable/Spinner'


const Vote: NextPage = () => {

  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);
  const [proposals, setProposals] = useState([]);
  const [proposalInput, setProposalInput] = useState('')

  const { getAllProposals,
    isExecutable,
    vote,
    createProposal,
    currentUserAddress,
  } = useContext(GcDaoContext)

    useEffect(() => {
      getAllProposals()
          .then((proposals: any) => {
              if (proposals.length > 0) {
                  setProposals(proposals.reverse())
                  console.log(proposals)
                  isExecutable(proposals[0].proposalId)
              }
          })
          .catch((err: any) => {
              console.log(err)
          })
    }, [vote])

  const styles = {
    mainWrapper: `min-h-screen flex max-w-full mx-auto xl:mx-32`,
    sidebarWrapper: `${isSidebarOpen ? 'w-2/12' : 'w-1/12 ml-7'}  hidden md:flex pt-2 md:mt-12 md:mr-4 lg:mr-0`,
    feedWrapper: `w-full md:border-l md:border-r md:border-gray-800`,
  }

  return (
    <div className='bg-black'>
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="Vote About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <NavBar />
      <main className={styles.mainWrapper}>
          <div className={styles.sidebarWrapper}>
            <SideBar />
          </div>
          <div className={styles.feedWrapper}>
            <Feed name='Vote' />
            <DaoLogin />

            {/* Proposal Input */}
            <div className='flex flex-col bg-[#121212] border-2 border-gray-800 rounded-md m-4'>
                <input
                  className="m-4 border-2 border-gray-800 bg-black text-gray-300 py-2 rounded-md px-1 text-md font-semibold"
                  placeholder='Make a Proposal'
                  value={proposalInput}
                  onChange={e => {
                      setProposalInput(e.target.value)
                  }} />
                <div>
                  <button className={`mx-4 mb-2 rounded-md bg-[#DC143C] py-2 px-4  font-semibold text-white disabled:cursor-not-allowed`}
                    disabled={!currentUserAddress || proposalInput === ""}
                    onClick={() => {
                      createProposal(proposalInput)
                      setProposalInput('')
                      showNotification("Pending.....")
                    }}>Submit</button>
                </div>
            </div>
            {
              proposals.length > 0 ? 
              proposals.map((proposal, index) => {
                return <Proposal key={index} proposal={proposal} />
              }) : <Spinner />
            }
          </div>
      </main>

      <ComponenetsForIndexes />
    </div>
  )
}

export default Vote
