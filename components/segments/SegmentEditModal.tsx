"use client"
import { useState, useEffect } from 'react'
import { segmentsService } from '../../lib/services'
import { useAuth } from '../../contexts/AuthContext'

type Segment = {
  $id: string
  title: string
  description: string
  icon?: string
  photoId?: string
  founded?: string
  activities?: string[]
  vision?: string
  mission?: string
  achievements?: string[]
  contact?: string
}

interface SegmentEditModalProps {
  segment: Segment
  onClose: () => void
  onUpdate: (segment: Segment) => void
}

export default function SegmentEditModal({ segment, onClose, onUpdate }: SegmentEditModalProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: segment.title || '',
    description: segment.description || '',
    icon: segment.icon || '',
    founded: segment.founded || '',
    vision: segment.vision || '',
    mission: segment.mission || '',
    contact: segment.contact || '',
    activities: (segment.activities || []).join('\n'),
    achievements: (segment.achievements || []).join('\n')
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      let photoId = segment.photoId

      // Upload new photo if selected
      if (photo) {
        const photoResponse = await segmentsService.uploadPhoto(photo)
        photoId = photoResponse.$id
        
        // Delete old photo if exists
        if (segment.photoId) {
          try {
            await segmentsService.deletePhoto(segment.photoId)
          } catch (err) {
            console.warn('Could not delete old photo:', err)
          }
        }
      }

      // Prepare data
      const updateData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon || undefined,
        photoId: photoId || undefined,
        founded: formData.founded || undefined,
        vision: formData.vision || undefined,
        mission: formData.mission || undefined,
        contact: formData.contact || undefined,
        activities: formData.activities.trim() 
          ? formData.activities.split('\n').map(item => item.trim()).filter(Boolean)
          : undefined,
        achievements: formData.achievements.trim() 
          ? formData.achievements.split('\n').map(item => item.trim()).filter(Boolean)
          : undefined
      }

      const updatedSegment = await segmentsService.update(segment.$id, updateData)
      onUpdate(updatedSegment as unknown as Segment)
    } catch (error: any) {
      console.error('Error updating segment:', error)
      setError(error.message || 'Failed to update segment')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!user) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Segment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segment Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="🚀"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision
                </label>
                <textarea
                  value={formData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission
                </label>
                <textarea
                  value={formData.mission}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Founded
                </label>
                <input
                  type="text"
                  value={formData.founded}
                  onChange={(e) => handleInputChange('founded', e.target.value)}
                  placeholder="2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  placeholder="segment@nitercc.edu"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities (one per line)
              </label>
              <textarea
                value={formData.activities}
                onChange={(e) => handleInputChange('activities', e.target.value)}
                rows={4}
                placeholder="Web Development&#10;Mobile App Development&#10;AI/ML Research"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements (one per line)
              </label>
              <textarea
                value={formData.achievements}
                onChange={(e) => handleInputChange('achievements', e.target.value)}
                rows={4}
                placeholder="Won National Programming Contest&#10;Published 5 Research Papers&#10;Built 20+ Projects"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Photo
              </label>
              {segment.photoId && (
                <div className="mb-3">
                  <img 
                    src={segmentsService.getPhotoPreview(segment.photoId, 300, 200).href}
                    alt="Current photo"
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Segment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}