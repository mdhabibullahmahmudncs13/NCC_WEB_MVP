import Link from 'next/link'
import ProtectedRoute from '../../../components/ProtectedRoute'
import AppwriteTest from '../../../components/AppwriteTest'
import DatabaseDiagnostic from '../../../components/DatabaseDiagnostic'

export default function AdminDashboard(){
  return (
    <ProtectedRoute>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">Welcome to NCC Admin Panel</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📊</span>
              </div>
              <h3 className="font-semibold text-lg">Manage Segments</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Add, edit, or delete club segments and divisions</p>
            <Link href="/admin/segments" className="text-primary hover:underline text-sm font-medium">
              Manage Segments →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">👥</span>
              </div>
              <h3 className="font-semibold text-lg">Manage Members</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Add, edit, or delete club members and their profiles</p>
            <Link href="/admin/members" className="text-primary hover:underline text-sm font-medium">
              Manage Members →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">🏆</span>
              </div>
              <h3 className="font-semibold text-lg">Manage Achievements</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Add, edit, or delete club achievements and milestones</p>
            <Link href="/admin/achievements" className="text-primary hover:underline text-sm font-medium">
              Manage Achievements →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📸</span>
              </div>
              <h3 className="font-semibold text-lg">Manage Gallery</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Upload and manage gallery photos and captions</p>
            <Link href="/admin/gallery" className="text-primary hover:underline text-sm font-medium">
              Manage Gallery →
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600">📅</span>
              </div>
              <h3 className="font-semibold text-lg">Manage Events</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Create and manage workshops, hackathons, and seminars</p>
            <Link href="/admin/events" className="text-primary hover:underline text-sm font-medium">
              Manage Events →
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
    </ProtectedRoute>
  )
}