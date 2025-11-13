"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Button from '../../../components/ui/Button'
import { segmentsService } from '../../../lib/services'

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

export default function AdminSegments(){
  const [segments, setSegments] = useState<Segment[]>([])
  const [loading, setLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  useEffect(() => {
    loadSegments()
  }, [])

  const loadSegments = async () => {
    try {
      setLoading(true)
      const response = await segmentsService.list()
      setSegments(response.documents as unknown as Segment[])
    } catch (error) {
      console.error('Error loading segments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSegmentCreated = (newSegment: Segment) => {
    setSegments(prev => [...prev, newSegment])
    setCreateModalOpen(false)
  }

  const handleSegmentDeleted = async (segmentId: string) => {
    if (confirm('Are you sure you want to delete this segment? This action cannot be undone.')) {
      try {
        await segmentsService.delete(segmentId)
        setSegments(prev => prev.filter(s => s.$id !== segmentId))
      } catch (error) {
        console.error('Error deleting segment:', error)
        alert('Failed to delete segment')
      }
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Segment Management</h1>
            <p className="text-gray-600 mt-1">Manage club segments, their details, and members</p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>
            Create Segment
          </Button>
        </div>

        {segments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No Segments Created</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first segment to organize club activities and member participation.
            </p>
            <Button onClick={() => setCreateModalOpen(true)}>
              Create First Segment
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">All Segments</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {segments.map(segment => (
                <div key={segment.$id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {segment.photoId ? (
                        <img 
                          src={segmentsService.getPhotoPreview(segment.photoId, 80, 80).href}
                          alt={segment.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {segment.icon ? (
                            <span className="text-2xl">{segment.icon}</span>
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{segment.title}</h3>
                          <Link
                            href={`/segments/${segment.$id}`}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="View Public Profile"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-2">
                          {segment.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          {segment.founded && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Founded {segment.founded}
                            </span>
                          )}
                          {segment.activities && segment.activities.length > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                              {segment.activities.length} activities
                            </span>
                          )}
                          {segment.achievements && segment.achievements.length > 0 && (
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {segment.achievements.length} achievements
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/segments/${segment.$id}`}
                        className="text-gray-500 hover:text-blue-600 transition-colors p-2"
                        title="View Public Profile"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleSegmentDeleted(segment.$id)}
                        className="text-gray-500 hover:text-red-600 transition-colors p-2"
                        title="Delete Segment"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Segment Modal */}
        {createModalOpen && (
          <CreateSegmentModal
            onClose={() => setCreateModalOpen(false)}
            onSave={handleSegmentCreated}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

// Create Segment Modal Component
interface CreateSegmentModalProps {
  onClose: () => void
  onSave: (segment: Segment) => void
}

function CreateSegmentModal({ onClose, onSave }: CreateSegmentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    founded: '',
    vision: '',
    mission: '',
    contact: '',
    activities: '',
    achievements: ''
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let photoId

      // Upload photo if selected
      if (photo) {
        const photoResponse = await segmentsService.uploadPhoto(photo)
        photoId = photoResponse.$id
      }

      // Prepare data
      const segmentData = {
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

      const newSegment = await segmentsService.create(segmentData)
      onSave(newSegment as unknown as Segment)
    } catch (error: any) {
      console.error('Error creating segment:', error)
      setError(error.message || 'Failed to create segment')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Segment</h2>
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
                  placeholder="Development Team"
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
                  placeholder="💻"
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
                placeholder="Brief description of this segment's purpose and activities..."
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
                  placeholder="Our vision for this segment..."
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
                  placeholder="Our mission and goals..."
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
                placeholder="Web Development&#10;Mobile App Development&#10;AI/ML Research&#10;Open Source Contributions"
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
                placeholder="Won National Programming Contest&#10;Published 5 Research Papers&#10;Built 20+ Projects&#10;Collaborated with Industry Partners"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Upload a header image for this segment
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Segment'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}