"use client"
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'

export default function Header(){
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <img 
              src="/ncc-logo.svg" 
              alt="NCC Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                NCC
              </Link>
             
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 items-center">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Events
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/members" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Members
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/achievements" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Achievements
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              
              {user ? (
                <>
                  <li className="ml-4">
                    <Link 
                      href="/admin/dashboard" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                       Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout} 
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li className="ml-4">
                
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button (placeholder for future mobile nav) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
