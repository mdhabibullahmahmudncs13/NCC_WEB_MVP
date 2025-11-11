import Link from 'next/link'
import ProtectedRoute from '../../../components/ProtectedRoute'
import AppwriteTest from '../../../components/AppwriteTest'
import DatabaseDiagnostic from '../../../components/DatabaseDiagnostic'

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Admin Dashboard
            </h1>
            <div className="text-sm text-gray-500">
              Welcome to NCC Admin Panel
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-blue-600">📊</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">Manage Segments</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Add, edit, or delete club segments and divisions
              </p>
              <Link 
                href="/admin/segments" 
                className="text-blue-600 hover:text-blue-700 hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
              >
                Manage Segments <span>→</span>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-green-600">👥</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">Manage Members</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Add, edit, or delete club members and their profiles
              </p>
              <Link 
                href="/admin/members" 
                className="text-blue-600 hover:text-blue-700 hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
              >
                Manage Members <span>→</span>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-yellow-600">🏆</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">Manage Achievements</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Add, edit, or delete club achievements and milestones
              </p>
              <Link 
                href="/admin/achievements" 
                className="text-blue-600 hover:text-blue-700 hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
              >
                Manage Achievements <span>→</span>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-purple-600">📸</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">Manage Gallery</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Upload and manage gallery photos and captions
              </p>
              <Link 
                href="/admin/gallery" 
                className="text-blue-600 hover:text-blue-700 hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
              >
                Manage Gallery <span>→</span>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-indigo-600">📅</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">Manage Events</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                Create and manage workshops, hackathons, and seminars
              </p>
              <Link 
                href="/admin/events" 
                className="text-blue-600 hover:text-blue-700 hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
              >
                Manage Events <span>→</span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <AppwriteTest />
          </div>

          <div className="mt-8">
            <DatabaseDiagnostic />
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-blue-700">Segments</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-green-700">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">0</div>
                <div className="text-sm text-yellow-700">Achievements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-purple-700">Photos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-indigo-600">0</div>
                <div className="text-sm text-indigo-700">Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}