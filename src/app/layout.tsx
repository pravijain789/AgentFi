import './globals.css'
import { Inter } from 'next/font/google'
// Change this line to point to the components folder
import { Providers } from '@/components/Providers' 

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Fixes the CSP security block */}
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';" 
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}