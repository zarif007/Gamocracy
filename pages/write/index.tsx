import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { sidebarOpen } from '../../atoms/sidebarOpenAtom'
import BlogContent from '../../components/blogComponents/BlogContent'
import BlogContentForTimeline from '../../components/blogComponents/BlogContentForTimeline'
import ComponenetsForIndexes from '../../components/reusable/ComponenetsForIndexes'
import Feed from '../../components/Feed'
import NavBar from '../../components/navBars/NavBar'
import SideBar from '../../components/navBars/SideBar'
import Widgets from '../../components/Widgets' 



export const getServerSideProps: GetServerSideProps = async () => {

  const { data } = await axios.get(`https://dacgzl9krh.execute-api.us-east-1.amazonaws.com/staging`);

  return {
    props: { 
      blogs: data,
     },
  };
};


const Write: NextPage = ({blogs}: any) => {


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
        <meta name="description" content="Write About Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <NavBar />
      <main className={styles.mainWrapper}>
          <div className={styles.sidebarWrapper}>
            <SideBar />
          </div>
          <div className={styles.feedWrapper}>
            <Feed name='Write' />
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
            <Widgets />
          </div>
      </main>

      <ComponenetsForIndexes />
    </div>
  )
}

export default Write
