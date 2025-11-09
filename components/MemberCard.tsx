import { storage } from '../lib/appwrite'

type Props = {
  name: string
  role?: string
  photoId?: string
}

export default function MemberCard({ name, role, photoId }: Props){
  const getPhotoUrl = (id: string) => {
    return storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS!,
      id,
      200,
      200
    )
  }

  return (
    <div className="border rounded p-4 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3">
        {photoId ? (
          <img 
            src={getPhotoUrl(photoId).toString()} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  )
}
