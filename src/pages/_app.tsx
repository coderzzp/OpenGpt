import { Analytics } from '@vercel/analytics/react'
import { type Session } from 'next-auth'
// import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { DefaultSeo } from 'next-seo'

import { api } from '@/utils/api'
import { DEFAULT_SEO_CONFIG } from '@/utils/seoConfig'

import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO_CONFIG} />
      <Head>
        <title>LetsrunAI</title>
      </Head>
      <Analytics />
      {/* <SessionProvider session={session}> */}
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      {/* </SessionProvider> */}
    </>
  )
}

export default api.withTRPC(MyApp)
