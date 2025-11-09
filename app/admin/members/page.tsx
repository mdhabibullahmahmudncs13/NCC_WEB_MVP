"use client"
import { useState, useEffect } from 'react'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Button from '../../../components/ui/Button'
import { membersService } from '../../../lib/services'

type Member = {
  $id: string
  name: string
  role: string
  photoId?: string
  email?: string
  bio?: string
  order: number
}

export default function AdminMembers(){
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    bio: '',
    order: 0,
    photoId: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await membersService.list()
      setMembers(response.documents)
    } catch (error: any) {
      console.error('Error loading members:', error)
      
      let errorMessage = 'Failed to load members'
      if (error.message) {
        errorMessage += `: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let photoId = formData.photoId

      // Upload new photo if selected
      if (selectedFile) {
        const uploadedFile = await membersService.uploadPhoto(selectedFile)
        photoId = uploadedFile.$id

        // Delete old photo if updating member
        if (editingMember?.photoId) {
          try {
            await membersService.deletePhoto(editingMember.photoId)
          } catch (error) {
            console.warn('Could not delete old photo:', error)
          }
        }
      }

      const memberData = {
        ...formData,
        photoId: photoId || undefined
      }

      if (editingMember) {
        await membersService.update(editingMember.$id, memberData)
      } else {
        await membersService.create(memberData)
      }
      
      setFormData({ name: '', role: '', email: '', bio: '', order: 0, photoId: '' })
      setSelectedFile(null)
      setPreviewUrl('')
      setShowForm(false)
      setEditingMember(null)
      loadMembers()
    } catch (error: any) {
      console.error('Error saving member:', error)
      
      let errorMessage = 'Failed to save member'
      if (error.message) {
        errorMessage += `: ${error.message}`
      }
      if (error.code) {
        errorMessage += ` (Code: ${error.code})`
      }
      
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (member: Member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email || '',
      bio: member.bio || '',
      order: member.order || 0,
      photoId: member.photoId || ''
    })
    setSelectedFile(null)
    setPreviewUrl(member.photoId ? membersService.getPhotoPreview(member.photoId).toString() : '')
    setShowForm(true)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const member = members.find(m => m.$id === id)
        
        // Delete photo if exists
        if (member?.photoId) {
          try {
            await membersService.deletePhoto(member.photoId)
          } catch (error) {
            console.warn('Could not delete photo:', error)
          }
        }
        
        await membersService.delete(id)
        loadMembers()
      } catch (error) {
        console.error('Error deleting member:', error)
        alert('Failed to delete member')
      }
    }
  }

  const resetForm = () => {
    setFormData({ name: '', role: '', email: '', bio: '', order: 0, photoId: '' })
    setSelectedFile(null)
    setPreviewUrl('')
    setEditingMember(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Members</h1>
          <Button onClick={() => setShowForm(true)}>Add New Member</Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-2xl">📷</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Max 5MB, JPG/PNG only</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="President, Vice President, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="member@niter.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2 h-20"
                    placeholder="Brief description about the member"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="0"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Saving...' : (editingMember ? 'Update' : 'Create')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} disabled={uploading}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {members.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No members yet. Add your first member!
            </div>
          ) : (
            members.map((member) => (
              <div key={member.$id} className="border rounded-lg p-4 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                      {member.photoId ? (
                        <img 
                          src={membersService.getPhotoPreview(member.photoId, 100, 100).toString()} 
                          alt={member.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="text-gray-400 font-semibold">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary text-sm">{member.role}</p>
                    </div>
                  </div>
                  {member.email && <p className="text-sm text-gray-600 mb-1">📧 {member.email}</p>}
                  {member.bio && <p className="text-gray-600">{member.bio}</p>}
                  <p className="text-xs text-gray-400 mt-2">Order: {member.order}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(member.$id)}
                    className="text-sm text-red-600 border-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}