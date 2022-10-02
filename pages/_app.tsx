import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Router from "next/router";
import nProgress from "nprogress";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { GcDaoProvider } from "./../context/context";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export const showNotification = () =>
  toast.success("Blog Uploaded 😎", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
    <SessionProvider session={session}>
      <RecoilRoot>
          <GcDaoProvider>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </GcDaoProvider>
      </RecoilRoot>
    </SessionProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
