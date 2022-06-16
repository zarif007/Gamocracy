import '../styles/globals.css'
import '../styles/nprogress.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import nProgress from 'nprogress';
import { SessionProvider } from 'next-auth/react'


Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
