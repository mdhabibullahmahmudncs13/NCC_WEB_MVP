type Photo = { id: string; src?: string; caption?: string }

export default function GalleryGrid({ items = [] }: { items?: Photo[] }){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <div key={p.id} className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
          <div className="aspect-square bg-gray-50 flex items-center justify-center">
            {p.src ? (
              <img 
                src={p.src} 
                alt={p.caption || 'Gallery image'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}
          </div>
          {p.caption && (
            <div className="p-4">
              <p className="text-sm text-gray-700 leading-relaxed">{p.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
