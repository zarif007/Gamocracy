import '../styles/globals.css'
import '../styles/nprogress.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import nProgress from 'nprogress';


Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
