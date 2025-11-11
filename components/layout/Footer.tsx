export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white mt-8 sm:mt-12">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 sm:mb-8">
          {/* Club Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full p-2">
                <img 
                  src="/ncc-logo.svg" 
                  alt="NCC Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">NITER Computer Club</h3>
                <p className="text-gray-300 text-xs sm:text-sm">Innovation • Technology • Community</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              Empowering the next generation of technologists through hands-on learning, 
              innovative projects, and collaborative community building at NITER.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="mailto:info@nitercc.edu" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center sm:text-left">
                📧 Contact Us
              </a>
              <a href="#" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center sm:text-left">
                💬 Join Discord
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="/members" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Members</a></li>
              <li><a href="/achievements" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Achievements</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Gallery</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Connect With Us</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-sm">📍</span>
                <span className="text-xs sm:text-sm leading-relaxed">NITER Campus, Dhaka</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-sm">📧</span>
                <a href="mailto:computerclubniter@gmail.com" className="text-xs sm:text-sm hover:text-white transition-colors break-all">
                  computerclubniter@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <span className="text-sm">🌐</span>
                <a href="https://niter.edu.bd/clubs/niter-computer-club" className="text-xs sm:text-sm hover:text-white transition-colors break-words leading-relaxed">
                  niter.edu.bd/clubs/niter-computer-club
                </a>
              </li>
            </ul>
            
            <div className="mt-4">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Follow us on:</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/NiterComputerClub" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-sm font-semibold">f</span>
                </a>
                <a href="https://www.youtube.com/@NITERComputerClub" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <span className="text-xs font-semibold">yt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} NITER Computer Club. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-center">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-center">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
