export default function Footer(){
  return (
    <footer className="border-t mt-12 bg-white">
      <div className="container py-6 text-sm text-gray-600 flex justify-between items-center">
        <div>© {new Date().getFullYear()} NITER Computer Club</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
