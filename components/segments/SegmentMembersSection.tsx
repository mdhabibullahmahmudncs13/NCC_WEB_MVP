"use client"
import { useState, useEffect } from 'react'
import { segmentsService, membersService } from '../../lib/services'
import { useAuth } from '../../contexts/AuthContext'

type SegmentMember = {
  $id: string
  name: string
  role: string
  photoId?: string
  email?: string
  bio?: string
  order?: number
  position?: string
  skills?: string[]
  joinDate?: string
  segmentId: string
}

interface SegmentMembersSectionProps {
  segmentId: string
}

export default function SegmentMembersSection({ segmentId }: SegmentMembersSectionProps) {
  const { user } = useAuth()
  const [members, setMembers] = useState<SegmentMember[]>([])
  const [loading, setLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<SegmentMember | null>(null)

  useEffect(() => {
    loadMembers()
  }, [segmentId])

  const loadMembers = async () => {
    try {
      setLoading(true)
      const response = await segmentsService.getMembers(segmentId)
      setMembers(response.documents as unknown as SegmentMember[])
    } catch (error) {
      console.error('Error loading segment members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMemberAdded = (newMember: SegmentMember) => {
    setMembers(prev => [...prev, newMember])
    setAddModalOpen(false)
  }

  const handleMemberUpdated = (updatedMember: SegmentMember) => {
    setMembers(prev => prev.map(m => m.$id === updatedMember.$id ? updatedMember : m))
    setEditingMember(null)
  }

  const handleMemberDeleted = async (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      try {
        await segmentsService.removeMember(memberId)
        setMembers(prev => prev.filter(m => m.$id !== memberId))
      } catch (error) {
        console.error('Error deleting member:', error)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Segment Members</h2>
            <p className="text-gray-600 mt-1">Active contributors to this segment</p>
          </div>
          {user && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Yet</h3>
            <p className="text-gray-500 mb-4">This segment doesn't have any members assigned yet.</p>
            {user && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Add First Member
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <div key={member.$id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {member.photoId ? (
                      <img 
                        src={membersService.getPhotoPreview(member.photoId, 60, 60).href}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position || member.role}</p>
                    </div>
                  </div>
                  {user && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleMemberDeleted(member.$id)}
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {member.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                )}

                {member.skills && member.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="text-gray-500 text-xs px-2 py-1">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  {member.joinDate && (
                    <span>Joined {member.joinDate}</span>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {addModalOpen && (
        <MemberFormModal
          segmentId={segmentId}
          onClose={() => setAddModalOpen(false)}
          onSave={handleMemberAdded}
        />
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <MemberFormModal
          segmentId={segmentId}
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleMemberUpdated}
        />
      )}
    </div>
  )
}

// Member Form Modal Component
interface MemberFormModalProps {
  segmentId: string
  member?: SegmentMember
  onClose: () => void
  onSave: (member: SegmentMember) => void
}

function MemberFormModal({ segmentId, member, onClose, onSave }: MemberFormModalProps) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    role: member?.role || '',
    position: member?.position || '',
    email: member?.email || '',
    bio: member?.bio || '',
    joinDate: member?.joinDate || '',
    order: member?.order || 0,
    skills: (member?.skills || []).join(', ')
  })
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }
      
      setPhoto(file)
      setError('')
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let photoId = member?.photoId

      // Upload photo if selected
      if (photo) {
        const photoResponse = await membersService.uploadPhoto(photo)
        photoId = photoResponse.$id
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        position: formData.position || undefined,
        email: formData.email || undefined,
        bio: formData.bio || undefined,
        joinDate: formData.joinDate || undefined,
        order: formData.order,
        photoId: photoId || undefined,
        skills: formData.skills.trim() 
          ? formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
          : undefined
      }

      let result
      if (member) {
        result = await segmentsService.updateMember(member.$id, memberData)
      } else {
        result = await segmentsService.addMember(segmentId, memberData)
      }

      onSave(result as unknown as SegmentMember)
    } catch (error: any) {
      console.error('Error saving member:', error)
      setError(error.message || 'Failed to save member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {member ? 'Edit Member' : 'Add Member'}
          </h2>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({...prev, role: e.target.value}))}
                  placeholder="Developer, Designer, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({...prev, position: e.target.value}))}
                  placeholder="Team Lead, Senior Developer, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Date
                </label>
                <input
                  type="text"
                  value={formData.joinDate}
                  onChange={(e) => setFormData(prev => ({...prev, joinDate: e.target.value}))}
                  placeholder="January 2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({...prev, order: parseInt(e.target.value) || 0}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({...prev, skills: e.target.value}))}
                placeholder="React, Node.js, Python, AI/ML"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo
              </label>
              {(member?.photoId || photoPreview) && (
                <div className="mb-3">
                  <img 
                    src={photoPreview || membersService.getPhotoPreview(member!.photoId!, 100, 100).href}
                    alt={photoPreview ? "New photo preview" : "Current photo"}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {photoPreview ? "New photo selected" : "Current photo"}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  id="member-photo-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="member-photo-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {photoPreview ? 'New photo selected' : (photo ? photo.name : (member?.photoId ? 'Change Photo' : 'Upload Photo'))}
                </label>
                {(photo || photoPreview) && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null)
                      setPhotoPreview(null)
                    }}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Remove selected photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload a profile photo (max 5MB, JPG/PNG)
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
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
                {loading ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}