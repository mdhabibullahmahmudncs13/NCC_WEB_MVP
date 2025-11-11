"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../ui/Button'

export default function Header(){
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img 
              src="/ncc-logo.svg" 
              alt="NCC Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div>
              <Link href="/" className="text-lg sm:text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                NCC
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 lg:gap-8 items-center">
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
                  Our panel
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
                      className="bg-blue-600 text-white px-3 lg:px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-sm lg:text-base"
                    >
                       Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout} 
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm lg:text-base px-3 lg:px-4"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-blue-600 p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Events
              </Link>
              <Link 
                href="/members" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Our panel
              </Link>
              <Link 
                href="/achievements" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Achievements
              </Link>
              <Link 
                href="/gallery" 
                className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <Link 
                    href="/admin/dashboard" 
                    className="block bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left border border-red-500 text-red-500 px-4 py-3 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-100">
                  {/* Add login link if needed */}
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
