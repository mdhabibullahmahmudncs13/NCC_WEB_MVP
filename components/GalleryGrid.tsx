type Photo = { id: string; src?: string; caption?: string }

export default function GalleryGrid({ items = [] }: { items?: Photo[] }){
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <div key={p.id} className="rounded overflow-hidden bg-gray-50 h-40 flex items-center justify-center">
          {p.src ? <img src={p.src} alt={p.caption || ''} className="w-full h-full object-cover"/> : <div className="text-gray-400">No Image</div>}
        </div>
      ))}
    </div>
  )
}
