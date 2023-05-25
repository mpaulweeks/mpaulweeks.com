import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const title = 'M. Paul Weeks';
const description = 'contacts and portfolio';

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  title,
  description,
  icons: [{
    rel: 'shortcut icon',
    url: 'https://www.mpaulweeks.com/favicon.png',
  }],
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: title,
    url: 'https://www.mpaulweeks.com',
    images: [{
      url: 'https://www.mpaulweeks.com/favicon.png',
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
