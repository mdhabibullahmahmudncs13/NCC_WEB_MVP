import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'NITER Computer Club',
  description: 'Professional Technology Community at National Institute of Textile Engineering & Research - Advancing technological excellence through innovative projects and industry partnerships',
  icons: {
    icon: '/ncc-logo.svg',
    shortcut: '/ncc-logo.svg',
    apple: '/ncc-logo.svg',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://nitercc.edu'),
  openGraph: {
    title: 'NITER Computer Club',
    description: 'Professional Technology Community at NITER',
    url: 'https://nitercc.edu',
    siteName: 'NITER Computer Club',
    images: [
      {
        url: '/ncc-logo.svg',
        width: 800,
        height: 600,
        alt: 'NITER Computer Club Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NITER Computer Club',
    description: 'Professional Technology Community at NITER',
    images: ['/ncc-logo.svg'],
  },
}

export const viewport = {
  themeColor: '#2563eb',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="container py-8">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
