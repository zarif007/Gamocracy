import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import SideBar from '../components/SideBar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className='bg-[#121212]'>
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='min-h-screen flex max-w-7xl mx-auto'>
          <SideBar />
          <Feed />
      </main>

    </div>
  )
}

export default Home
