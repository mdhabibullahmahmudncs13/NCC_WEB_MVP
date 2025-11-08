import Link from 'next/link'

export default function Home(){
  return (
    <div>
      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">N</div>
          <h1 className="text-3xl font-bold mt-4">NITER Computer Club</h1>
          <p className="mt-2 text-gray-600">Building modern web & software solutions at NITER.</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/members" className="px-4 py-2 bg-primary text-white rounded">Members</Link>
            <Link href="/achievements" className="px-4 py-2 border rounded">Achievements</Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Segments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded p-4">Web Development</div>
          <div className="border rounded p-4">AI & ML</div>
          <div className="border rounded p-4">Design</div>
        </div>
      </section>
    </div>
  )
}
