import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'NITER Computer Club',
  description: 'Official site for NITER Computer Club'
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
