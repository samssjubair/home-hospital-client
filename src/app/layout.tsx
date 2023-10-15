import Providers from '@/lib/Providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home Hospital',
  description: 'Home Hospital',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
