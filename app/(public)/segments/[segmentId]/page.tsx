"use client"
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { segmentsService } from '../../../../lib/services'
import { useAuth } from '../../../../contexts/AuthContext'
import SegmentEditModal from '../../../../components/segments/SegmentEditModal'
import SegmentMembersSection from '../../../../components/segments/SegmentMembersSection'

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

export default function SegmentProfile() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [segment, setSegment] = useState<Segment | null>(null)
  const [loading, setLoading] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [error, setError] = useState('')

  const segmentId = params.segmentId as string

  useEffect(() => {
    if (segmentId) {
      loadSegment()
    }
  }, [segmentId])

  const loadSegment = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await segmentsService.get(segmentId)
      setSegment(response as unknown as Segment)
    } catch (error: any) {
      console.error('Error loading segment:', error)
      setError('Segment not found')
    } finally {
      setLoading(false)
    }
  }

  const handleSegmentUpdate = (updatedSegment: Segment) => {
    setSegment(updatedSegment)
    setEditModalOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !segment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Segment Not Found</h1>
            <p className="text-gray-600 mb-8">The segment you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <nav className="flex text-sm text-gray-500 mb-2">
                  <Link href="/" className="hover:text-gray-700">Home</Link>
                  <span className="mx-2">/</span>
                  <span>Segments</span>
                  <span className="mx-2">/</span>
                  <span className="text-gray-900">{segment.title}</span>
                </nav>
                <div className="flex items-center gap-3">
                  {segment.icon && (
                    <span className="text-2xl">{segment.icon}</span>
                  )}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{segment.title}</h1>
                </div>
              </div>
            </div>
            
            {user && (
              <button
                onClick={() => setEditModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Segment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            {segment.photoId && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={segmentsService.getPhotoUrl(segment.photoId).href}
                  alt={segment.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {segment.title}</h2>
              <p className="text-gray-600 leading-relaxed">{segment.description}</p>
            </div>

            {/* Vision & Mission */}
            {(segment.vision || segment.mission) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Our Direction</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {segment.vision && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Vision
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{segment.vision}</p>
                    </div>
                  )}
                  {segment.mission && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mission
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{segment.mission}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activities */}
            {segment.activities && segment.activities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Activities & Focus Areas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {segment.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {segment.achievements && segment.achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h2>
                <div className="space-y-3">
                  {segment.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-blue-600 bg-blue-50">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Segment Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Segment Information</h3>
              <div className="space-y-4">
                {segment.founded && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Founded</label>
                    <p className="text-gray-900">{segment.founded}</p>
                  </div>
                )}
                {segment.contact && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
                    <p className="text-gray-900">{segment.contact}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/members"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">View All Members</span>
                  </div>
                </Link>
                <Link
                  href="/achievements"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Club Achievements</span>
                  </div>
                </Link>
                <Link
                  href="/gallery"
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Photo Gallery</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Segment Members Section */}
        <div className="mt-12">
          <SegmentMembersSection segmentId={segmentId} />
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <SegmentEditModal
          segment={segment}
          onClose={() => setEditModalOpen(false)}
          onUpdate={handleSegmentUpdate}
        />
      )}
    </div>
  )
}