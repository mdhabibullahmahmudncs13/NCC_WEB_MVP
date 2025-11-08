import Link from 'next/link'

export default function Header(){
  return (
    <header className="border-b bg-white">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold">N</div>
          <div>
            <Link href="/" className="text-xl font-semibold">
              NITER Computer Club
            </Link>
            <div className="text-sm text-gray-500">Modern, minimal, student-led</div>
          </div>
        </div>
        <nav>
          <ul className="flex gap-4 items-center">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/members">Members</Link></li>
            <li><Link href="/achievements">Achievements</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/admin/login" className="ml-4">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
