import React from 'react'

interface PhotoUploadProps {
  photoFile: File | null
  photoPreview: string | null
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemovePhoto: () => void
  onClearSelection: () => void
  currentPhotoUrl?: string
  isEditing?: boolean
  removePhoto?: boolean
}

export default function PhotoUpload({
  photoFile,
  photoPreview,
  onPhotoUpload,
  onRemovePhoto,
  onClearSelection,
  currentPhotoUrl,
  isEditing = false,
  removePhoto = false
}: PhotoUploadProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Event Photo
      </label>
      
      {/* Current Photo Display */}
      {(photoPreview && !removePhoto) && (
        <div className="mb-4">
          <div className="relative inline-block">
            <img
              src={photoPreview}
              alt="Event preview"
              className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={photoFile ? onClearSelection : onRemovePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-md"
              title={photoFile ? "Cancel upload" : "Remove photo"}
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${photoFile ? 'bg-blue-500' : 'bg-green-500'}`}></div>
            <p className="text-sm text-gray-600">
              {photoFile ? "New photo selected" : "Current photo"}
            </p>
          </div>
        </div>
      )}
      
      {/* Photo Upload Input */}
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500">
            Upload an image for the event (max 10MB)
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: JPG, PNG, WebP, GIF
          </p>
        </div>
      </div>
      
      {/* Remove Photo Option for Editing */}
      {isEditing && currentPhotoUrl && !photoFile && !removePhoto && (
        <button
          type="button"
          onClick={onRemovePhoto}
          className="mt-3 inline-flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove current photo
        </button>
      )}
      
      {/* Photo Removed Indicator */}
      {removePhoto && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <p className="text-sm text-red-700 font-medium">
              Photo will be removed when you save the event
            </p>
          </div>
        </div>
      )}
    </div>
  )
}