import { Metadata } from 'next'
import Script from 'next/script'
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
      <Script>
        {`
          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-37989728-1']);
          _gaq.push(['_setDomainName', 'mpaulweeks.com']);
          _gaq.push(['_trackPageview']);

          (function() {
              var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
              ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
              var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();
        `}
      </Script>
    </html>
  )
}
