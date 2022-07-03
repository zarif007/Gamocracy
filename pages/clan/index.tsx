import type { NextPage } from 'next'
import Head from 'next/head'
import ComponenetsForIndexes from '../../components/ComponenetsForIndexes'
import Feed from '../../components/Feed'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import Widgets from '../../components/Widgets'


const Clan: NextPage = () => {
  return (
    <div className='bg-black'>
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="Clan About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <NavBar />
      <main className='min-h-screen flex max-w-full mx-auto xl:mx-32'>
          <div className='w-2/12 hidden md:flex pt-2 md:mt-12 md:mr-4 lg:mr-0'>
            <SideBar />
          </div>
          <div className='w-full md:w-6/12 lg:w-7/12 md:border-l md:border-r md:border-gray-800'>
            <Feed name='Clan' />
          </div>
          <div className='md:w-4/12 lg:w-3/12 hidden md:flex pt-2 mt-2 border border-gray-800 ml-2 bg-black'>
            <Widgets />
          </div>
      </main>

      <ComponenetsForIndexes />
    </div>
  )
}

export default Clan