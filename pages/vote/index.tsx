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


const Vote: NextPage = () => {

  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);
  const [proposals, setProposals] = useState([])
  const { getAllProposals,
    isExecutable,
    vote,
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
            {
              proposals && 
              proposals.map((proposal, index) => {
                return <Proposal key={index} proposal={proposal} />
              })
            }
          </div>
      </main>

      <ComponenetsForIndexes />
    </div>
  )
}

export default Vote
