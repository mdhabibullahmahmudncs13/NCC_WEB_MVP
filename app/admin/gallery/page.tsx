"use client"
import { useState, useEffect } from 'react'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Button from '../../../components/ui/Button'
import { galleryService } from '../../../lib/services'
import { storage } from '../../../lib/appwrite'

type GalleryItem = {
  $id: string
  imageId: string
  caption: string
  category?: string
  uploadedAt?: string
}

export default function AdminGallery(){
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    caption: '',
    category: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const response = await galleryService.list()
      setGallery(response.documents as unknown as GalleryItem[])
    } catch (error: any) {
      console.error('Error loading gallery:', error)
      
      let errorMessage = 'Failed to load gallery'
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
    
    if (!selectedFile && !editingItem) {
      alert('Please select an image to upload')
      return
    }

    setUploading(true)
    
    try {
      let imageId = editingItem?.imageId

      // Upload new image if selected
      if (selectedFile) {
        const uploadedFile = await galleryService.uploadPhoto(selectedFile)
        imageId = uploadedFile.$id

        // Delete old image if updating
        if (editingItem?.imageId) {
          try {
            await galleryService.deletePhoto(editingItem.imageId)
          } catch (error) {
            console.warn('Could not delete old image:', error)
          }
        }
      }

      const galleryData = {
        ...formData,
        imageId: imageId!
      }

      if (editingItem) {
        await galleryService.update(editingItem.$id, galleryData)
      } else {
        await galleryService.create(galleryData)
      }
      
      setFormData({ caption: '', category: '' })
      setSelectedFile(null)
      setPreviewUrl('')
      setShowForm(false)
      setEditingItem(null)
      loadGallery()
    } catch (error: any) {
      console.error('Error saving gallery item:', error)
      
      let errorMessage = 'Failed to save gallery item'
      if (error.message) {
        errorMessage += `: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      caption: item.caption,
      category: item.category || ''
    })
    setSelectedFile(null)
    setPreviewUrl(getImageUrl(item.imageId))
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
      
      // Validate file size (10MB max for gallery)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
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
    if (confirm('Are you sure you want to delete this photo?')) {
      try {
        const item = gallery.find(g => g.$id === id)
        
        // Delete image file
        if (item?.imageId) {
          try {
            await galleryService.deletePhoto(item.imageId)
          } catch (error) {
            console.warn('Could not delete image file:', error)
          }
        }
        
        await galleryService.delete(id)
        loadGallery()
      } catch (error: any) {
        console.error('Error deleting gallery item:', error)
        alert('Failed to delete gallery item')
      }
    }
  }

  const resetForm = () => {
    setFormData({ caption: '', category: '' })
    setSelectedFile(null)
    setPreviewUrl('')
    setEditingItem(null)
    setShowForm(false)
  }

  const getImageUrl = (imageId: string) => {
    return storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY!,
      imageId
    ).toString()
  }

  const getImagePreview = (imageId: string) => {
    return storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY!,
      imageId,
      300,
      200
    ).toString()
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
          <h1 className="text-2xl font-bold">Manage Gallery</h1>
          <Button onClick={() => setShowForm(true)}>Upload Photo</Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingItem ? 'Edit Photo' : 'Upload New Photo'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Photo</label>
                  <div className="space-y-3">
                    {previewUrl && (
                      <div className="w-full h-40 bg-gray-100 rounded overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required={!editingItem}
                    />
                    <p className="text-xs text-gray-500">Max 10MB, JPG/PNG only</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Caption</label>
                  <input
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData({...formData, caption: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Describe this photo..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
                  >
                    <option value="">Select category</option>
                    <option value="Events">Events</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Projects">Projects</option>
                    <option value="Team">Team</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Saving...' : (editingItem ? 'Update' : 'Upload')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} disabled={uploading}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No photos uploaded yet. Upload your first photo!
            </div>
          ) : (
            gallery.map((item) => (
              <div key={item.$id} className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={getImagePreview(item.imageId)} 
                    alt={item.caption} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-sm mb-2">{item.caption}</p>
                  {item.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                      {item.category}
                    </span>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="text-sm flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(item.$id)}
                      className="text-sm text-red-600 border-red-300 flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}