import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { sidebarOpen } from '../atoms/sidebarOpenAtom'
import BlogContentForTimeline from '../components/blogComponents/BlogContentForTimeline'
import ComponenetsForIndexes from '../components/reusable/ComponenetsForIndexes'
import NavBar from '../components/navBars/NavBar'
import SideBar from '../components/navBars/SideBar'
import Widgets from '../components/Widgets'
import SignInReminder from '../components/SignInReminder'
import { useSession } from 'next-auth/react'


export const getServerSideProps: GetServerSideProps = async () => {

  const { data } = await axios.get(`https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging`);

  return {
    props: { 
      blogs: data,
     },
  };
};

const Home: NextPage = ({ blogs }: any) => {
  const {data: session} = useSession();

  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);

  const styles = {
    mainWrapper: `min-h-screen flex max-w-full mx-auto xl:mx-32`,
    sidebarWrapper: `${isSidebarOpen ? 'w-2/12' : 'w-1/12 ml-7'}  hidden md:flex pt-2 md:mt-12 md:mr-4 lg:mr-0`,
    feedWrapper: `w-full md:w-6/12 lg:w-7/12 md:border-l md:border-r md:border-gray-900`,
    widgetsWrapper: `md:w-4/12 ${isSidebarOpen ? 'lg:w-3/12' : 'lg:w-4/12'} flex flex-col hidden md:flex mt-2 border border-gray-900 ml-2 bg-black`,
  }

  return (
    <div className='bg-black'>
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="A Gamers Community" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
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
            <div className='m-2'>
              {
                blogs.map((blog: any, index: number) => {
                  return (
                    <BlogContentForTimeline key={index} blog={blog} />
                  )
                })
              }
            </div>
          </div>
          <div className={styles.widgetsWrapper}>
            {
              !session?.user?.email && <SignInReminder />
            }
            <Widgets />
          </div>
      </main>
      
      <ComponenetsForIndexes />

    </div>
  )
}

export default Home
