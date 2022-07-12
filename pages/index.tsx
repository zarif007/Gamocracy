import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { sidebarOpen } from '../atoms/sidebarOpenAtom'
import ComponenetsForIndexes from '../components/ComponenetsForIndexes'
import Feed from '../components/Feed'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Widgets from '../components/Widgets'


export const getServerSideProps: GetServerSideProps = async () => {
  let data = {}
  await fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .then(res => data = res)

  return {
    props: { 
      data,
    },
  };
};

const Home: NextPage = ({ data }: any) => {

  console.log(data)
  
  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);

  const styles = {
    mainWrapper: `min-h-screen flex max-w-full mx-auto xl:mx-32`,
    sidebarWrapper: `${isSidebarOpen ? 'w-2/12' : 'w-1/12 ml-7'}  hidden md:flex pt-2 md:mt-12 md:mr-4 lg:mr-0`,
    feedWrapper: `w-full md:w-6/12 lg:w-7/12 md:border-l md:border-r md:border-gray-800`,
    widgetsWrapper: `md:w-4/12 ${isSidebarOpen ? 'lg:w-3/12' : 'lg:w-4/12'}  hidden md:flex pt-2 mt-2 border border-gray-800 ml-2 bg-black`,
  }

  return (
    <div className='bg-black'>
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="A Gamers Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 
        2nd: #121212
        Red: #DC143C hover: #e5163f

        linear-gradient(284deg, rgba(31,1,1,1) 31%, rgba(220,20,60,1) 97%)
      */}

      <NavBar />
      <main className={styles.mainWrapper}>
          <div className={styles.sidebarWrapper}>
            <SideBar />
          </div>
          <div className={styles.feedWrapper}>
            <Feed name='Home' />
          </div>
          <div className={styles.widgetsWrapper}>
            <Widgets />
          </div>
      </main>
      
      <ComponenetsForIndexes />

    </div>
  )
}

export default Home
