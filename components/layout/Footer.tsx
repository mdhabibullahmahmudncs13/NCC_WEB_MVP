export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Club Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full p-2">
                <img 
                  src="/ncc-logo.svg" 
                  alt="NCC Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">NITER Computer Club</h3>
                <p className="text-gray-300 text-sm">Innovation • Technology • Community</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Empowering the next generation of technologists through hands-on learning, 
              innovative projects, and collaborative community building at NITER.
            </p>
            <div className="flex gap-4">
              <a href="mailto:info@nitercc.edu" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                📧 Contact Us
              </a>
              <a href="#" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                💬 Join Discord
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">🏠 Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">ℹ️ About Us</a></li>
              <li><a href="/members" className="text-gray-300 hover:text-white transition-colors">👥 Members</a></li>
              <li><a href="/achievements" className="text-gray-300 hover:text-white transition-colors">🏆 Achievements</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-white transition-colors">📸 Gallery</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <span>📍</span>
                <span className="text-sm">NITER Campus, Dhaka</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span>📧</span>
                <a href="mailto:info@nitercc.edu" className="text-sm hover:text-white transition-colors">
                  info@nitercc.edu
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span>🌐</span>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  www.nitercc.edu
                </a>
              </li>
            </ul>
            
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Follow us on:</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-sm">ig</span>
                </a>
                <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <span className="text-sm">yt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} NITER Computer Club. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
