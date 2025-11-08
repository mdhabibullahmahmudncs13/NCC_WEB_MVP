import Link from 'next/link'

export default function AdminDashboard(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h3 className="font-semibold">Manage Segments</h3>
          <p className="text-sm text-gray-600 mt-2">Add, edit, or delete club segments</p>
          <Link href="/admin/segments" className="text-primary text-sm">Manage →</Link>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold">Manage Members</h3>
          <p className="text-sm text-gray-600 mt-2">Add, edit, or delete members</p>
          <Link href="/admin/members" className="text-primary text-sm">Manage →</Link>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold">Manage Achievements</h3>
          <p className="text-sm text-gray-600 mt-2">Add, edit, or delete achievements</p>
          <Link href="/admin/achievements" className="text-primary text-sm">Manage →</Link>
        </div>
        <div className="border rounded p-4">
          <h3 className="font-semibold">Manage Gallery</h3>
          <p className="text-sm text-gray-600 mt-2">Upload and manage gallery photos</p>
          <Link href="/admin/gallery" className="text-primary text-sm">Manage →</Link>
        </div>
      </div>
    </div>
  )
}