import './globals.css'
import { Suspense, ReactNode } from 'react'
import { Maven_Pro } from 'next/font/google'

import { NextAuthProvider } from './providers'

import { Header } from '@/components/Header'
import { Main } from '@/components/Main'
import { Footer } from '@/components/Footer'
import Loading from './loading'
import { ToastContainer } from '@/components/Toast'

const mavenPro = Maven_Pro({ subsets: ['latin'] })

export const metadata = {
  title: 'Tasks',
  description: 'Organize suas tarefas de um jeito fácil',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className="sr">
      <body className={mavenPro.className}>
        <NextAuthProvider>
          <ToastContainer />
          <Suspense fallback={<Loading />}>
            <div
              id="wrapper"
              className="main-content flex h-full min-h-screen flex-col justify-between bg-brown-900 px-4"
            >
              <Header />
              <Main>{children}</Main>
              <Footer />
            </div>
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  )
}
