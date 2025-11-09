import { storage } from '../lib/appwrite'

type Props = {
  title: string
  date?: string
  description?: string
  imageId?: string
}

export default function AchievementCard({ title, date, description, imageId }: Props){
  const getImageUrl = (id: string) => {
    return storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS!,
      id,
      400,
      200
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {imageId && (
        <div className="h-48 bg-gray-100">
          <img 
            src={getImageUrl(imageId).toString()} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🏆</span>
          <div className="font-semibold">{title}</div>
        </div>
        {date && <div className="text-sm text-gray-500 mb-2">{date}</div>}
        {description && <p className="text-sm text-gray-700">{description}</p>}
      </div>
    </div>
  )
}
