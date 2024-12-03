import type { Metadata } from 'next'
import Link from 'next/link'
import localFont from 'next/font/local'
import './globals.css'
import Providers from '@/components/Providers'
import Head from 'next/head'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'BadRobot AI Moderator',
  description: 'NextJS',
}

const links = [
  { url: '/', label: 'Main', id: 0 },
  { url: '/docs', label: 'API Docs', id: 1 },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="m-4">
          <nav>
            <ul className="flex gap-2 justify-center">
              {links.map((link) => {
                return (
                  <li key={link.id}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
