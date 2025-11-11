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
      300,
      300
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 text-center hover:shadow-lg transition-shadow duration-200 group">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-100 overflow-hidden mx-auto mb-4 sm:mb-6 ring-4 ring-gray-50 group-hover:ring-blue-100 transition-all duration-200">
        {photoId ? (
          <img 
            src={getPhotoUrl(photoId).toString()} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-br from-gray-100 to-gray-200">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg leading-tight">
          {name}
        </h3>
        {role && (
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            {role}
          </p>
        )}
      </div>
    </div>
  )
}
