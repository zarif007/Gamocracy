import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { sidebarOpen } from "../../atoms/sidebarOpenAtom";
import ComponenetsForIndexes from "../../components/reusable/ComponenetsForIndexes";
import Feed from "../../components/Feed";
import NavBar from "../../components/navBars/NavBar";
import SideBar from "../../components/navBars/SideBar";
import Widgets from "../../components/Widgets";

const data = [
  {
    name: "BoredGone #004",
    account: "Orgg",
    img: "https://www.cgmasteracademy.com/wp-content/uploads/2020/12/Character_Creation_for_Games_search.jpeg",
    eth: 24.5,
    lastSale: 22.9,
  },
  {
    name: "Boses #005",
    account: "srgg",
    img: "https://www.nicepng.com/png/detail/109-1093407_games-character-png-clip-black-and-white-stock.png",
    eth: 12.5,
    lastSale: 12.9,
  },
  {
    name: "BoredGone #010",
    account: "Orgg",
    img: "https://i.pinimg.com/originals/c7/73/67/c77367eeda2146e138bb91fe53cbbe3b.gif",
    eth: 24.5,
    lastSale: 22.9,
  },
  {
    name: "UIyu #006",
    account: "UUU",
    img: "https://m.media-amazon.com/images/I/61l1CNA80ZS._AC_SY679_.jpg",
    eth: 26.5,
    lastSale: 24.9,
  },
  {
    name: "Lol #007",
    account: "LOLGG",
    img: "https://thumbs.gfycat.com/BitesizedUnrealisticFawn-max-1mb.gif",
    eth: 24.5,
    lastSale: 22.3,
  },
  {
    name: "Klll #008",
    account: "Jukli",
    img: "https://giffiles.alphacoders.com/266/2669.gif",
    eth: 24.5,
    lastSale: 22.9,
  },
  {
    name: "BoredGone #0011",
    account: "Orgg",
    img: "https://m.media-amazon.com/images/I/613BbsihdjL._AC_SY679_.jpg",
    eth: 24.5,
    lastSale: 22.9,
  },
];

const Nft: NextPage = () => {
  const [isSidebarOpen] = useRecoilState<boolean>(sidebarOpen);

  const styles = {
    mainWrapper: `min-h-screen flex max-w-full mx-auto xl:mx-32`,
    sidebarWrapper: `${
      isSidebarOpen ? "w-2/12" : "w-1/12 ml-7"
    }  hidden md:flex pt-2 md:mt-12 md:mr-4 lg:mr-0`,
    feedWrapper: `w-full md:border-l md:border-r md:border-gray-800`,
  };
  return (
    <div className="bg-black">
      <Head>
        <title>Gamocracy</title>
        <meta name="description" content="Mint And Buy Gaming NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className={styles.mainWrapper}>
        <div className={styles.sidebarWrapper}>
          <SideBar />
        </div>
        <div className={styles.feedWrapper}>
          <Feed name="Nft" />
          <RenderNFT data={data} />
        </div>
      </main>

      <ComponenetsForIndexes />
    </div>
  );
};

const RenderNFT = ({ data }: any) => {
  return (
    <div className="m-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
      {data.map((nft: any) => {
        return (
          <div key={nft.img} className="flex flex-col mx-auto my-2 cursor-pointer">
            <div className="border-2 border-[#DC143C] rounded-lg p-1 mx-auto">
              <img
                src={nft.img}
                style={{ width: "200px", height: "300px" }}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-between text-[#DC143C] font-semibold p-1">
              <p>{nft.name}</p>
              <p className="text-blue-500 text-sm">{nft.account}</p>
            </div>
            <div className="bg-[#1e1e1e] flex justify-between rounded-lg font-semibold">
              <div className="flex flex-col p-1 px-2">
                <p className="text-gray-400 text-sm">last Sale</p>
                <p className="text-gray-300 text-md">{nft.lastSale} ETH</p>
              </div>
              <div className="flex flex-col p-1 px-2">
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-gray-300 text-md">{nft.eth} ETH</p>
              </div>
            </div>
            <button className="w-full py-2 bg-[#DC143C] mt-2 rounded-lg font-semibold text-lg cursor-pointer">
              Purchase
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Nft;
