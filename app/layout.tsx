import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'NITER Computer Club',
  description: 'Official site for NITER Computer Club'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
