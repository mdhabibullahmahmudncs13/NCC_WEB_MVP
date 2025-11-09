"use client"
import { useState, useEffect } from 'react'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Button from '../../../components/ui/Button'
import { segmentsService } from '../../../lib/services'

type Segment = {
  $id: string
  title: string
  description: string
  icon?: string
  photoId?: string
}

export default function AdminSegments(){
  const [segments, setSegments] = useState<Segment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: ''
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [removePhoto, setRemovePhoto] = useState(false)

  useEffect(() => {
    loadSegments()
  }, [])

  const loadSegments = async () => {
    try {
      const response = await segmentsService.list()
      setSegments(response.documents as unknown as Segment[])
    } catch (error) {
      console.error('Error loading segments:', error)
      
      if (error instanceof Error && error.message.includes('Collection') && error.message.includes('not found')) {
        console.warn('The segments collection does not exist. Please check SETUP_COLLECTIONS.md')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let photoId = editingSegment?.photoId
      
      // Handle photo removal
      if (removePhoto && editingSegment?.photoId) {
        await segmentsService.deletePhoto(editingSegment.photoId)
        photoId = undefined
      }
      
      // Handle new photo upload
      if (photoFile) {
        // Delete old photo if exists
        if (editingSegment?.photoId) {
          await segmentsService.deletePhoto(editingSegment.photoId)
        }
        const uploadedPhoto = await segmentsService.uploadPhoto(photoFile)
        photoId = uploadedPhoto.$id
      }
      
      const submitData = { ...formData, photoId }
      
      if (editingSegment) {
        await segmentsService.update(editingSegment.$id, submitData)
      } else {
        await segmentsService.create(submitData)
      }
      
      resetForm()
      loadSegments()
    } catch (error) {
      console.error('Error saving segment:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      let errorMessage = 'Failed to save segment'
      
      if (error instanceof Error) {
        if (error.message.includes('Collection') && error.message.includes('not found')) {
          errorMessage = 'Database collection "segments" not found. Please check SETUP_COLLECTIONS.md to create the segments collection in Appwrite.'
        } else if (error.message.includes('document_invalid_structure')) {
          errorMessage = 'Invalid data structure. The segments collection may be missing the "photoId" attribute.'
        } else if (error.message.includes('insufficient_permissions') || error.message.includes('unauthorized')) {
          errorMessage = 'Permission denied. Please check collection permissions in Appwrite console.'
        } else {
          errorMessage = `Failed to save segment: ${error.message}`
        }
      }
      
      alert(errorMessage)
    }
  }

  const handleEdit = (segment: Segment) => {
    setEditingSegment(segment)
    setFormData({
      title: segment.title,
      description: segment.description,
      icon: segment.icon || ''
    })
    if (segment.photoId) {
      setPhotoPreview(segmentsService.getPhotoUrl(segment.photoId).href)
    }
    setPhotoFile(null)
    setRemovePhoto(false)
    setShowForm(true)
  }

  const handleDelete = async (segment: Segment) => {
    if (confirm('Are you sure you want to delete this segment?')) {
      try {
        // Delete photo if exists
        if (segment.photoId) {
          await segmentsService.deletePhoto(segment.photoId)
        }
        await segmentsService.delete(segment.$id)
        loadSegments()
      } catch (error) {
        console.error('Error deleting segment:', error)
        alert('Failed to delete segment')
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: '' })
    setEditingSegment(null)
    setShowForm(false)
    setPhotoFile(null)
    setPhotoPreview(null)
    setRemovePhoto(false)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      setPhotoFile(file)
      setRemovePhoto(false)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(editingSegment?.photoId ? segmentsService.getPhotoUrl(editingSegment.photoId).href : null)
    setRemovePhoto(true)
  }

  const handleClearPhotoSelection = () => {
    setPhotoFile(null)
    setPhotoPreview(editingSegment?.photoId ? segmentsService.getPhotoUrl(editingSegment.photoId).href : null)
    setRemovePhoto(false)
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
          <h1 className="text-2xl font-bold">Manage Segments</h1>
          <Button onClick={() => setShowForm(true)}>Add New Segment</Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingSegment ? 'Edit Segment' : 'Add New Segment'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2 h-24"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Icon (emoji or text)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="🌐"
                  />
                </div>

                {/* Photo Upload Section */}
                <div>
                  <label className="block text-sm font-medium mb-2">Segment Photo</label>
                  
                  {/* Current Photo Display */}
                  {photoPreview && (
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <img 
                          src={photoPreview} 
                          alt="Segment preview" 
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={photoFile ? handleClearPhotoSelection : handleRemovePhoto}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {photoFile ? 'New photo selected' : 'Current photo'}
                        {removePhoto && ' (will be removed)'}
                      </p>
                    </div>
                  )}

                  {/* Photo Upload Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      id="segment-photo"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="segment-photo"
                      className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center gap-2 text-sm"
                    >
                      📷 {photoPreview ? 'Change Photo' : 'Upload Photo'}
                    </label>
                    <span className="text-sm text-gray-500">Max 5MB, JPG/PNG</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingSegment ? 'Update' : 'Create'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {segments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No segments yet. Add your first segment!
            </div>
          ) : (
            segments.map((segment) => (
              <div key={segment.$id} className="border rounded-lg p-4 flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  {/* Photo Display */}
                  {segment.photoId && (
                    <div className="flex-shrink-0">
                      <img 
                        src={segmentsService.getPhotoUrl(segment.photoId).href} 
                        alt={segment.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {segment.icon && <span className="text-xl">{segment.icon}</span>}
                      <h3 className="font-semibold text-lg">{segment.title}</h3>
                    </div>
                    <p className="text-gray-600">{segment.description}</p>
                    {segment.photoId && (
                      <p className="text-sm text-green-600 mt-1">📷 Has photo</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(segment)}
                    className="text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(segment)}
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