"use client"
import { useState, useEffect } from 'react'
import ProtectedRoute from '../../../components/ProtectedRoute'
import Button from '../../../components/ui/Button'
import { achievementsService } from '../../../lib/services'

type Achievement = {
  $id: string
  title: string
  date: string
  description: string
  imageId?: string
  category?: string
}

export default function AdminAchievements(){
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    category: '',
    imageId: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      const response = await achievementsService.list()
      setAchievements(response.documents as unknown as Achievement[])
    } catch (error) {
      console.error('Error loading achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let imageId = formData.imageId

      // Upload new image if selected
      if (selectedFile) {
        const uploadedFile = await achievementsService.uploadImage(selectedFile)
        imageId = uploadedFile.$id

        // Delete old image if updating achievement
        if (editingAchievement?.imageId) {
          try {
            await achievementsService.deleteImage(editingAchievement.imageId)
          } catch (error) {
            console.warn('Could not delete old image:', error)
          }
        }
      }

      const achievementData = {
        ...formData,
        imageId: imageId || undefined
      }

      if (editingAchievement) {
        await achievementsService.update(editingAchievement.$id, achievementData)
      } else {
        await achievementsService.create(achievementData)
      }
      
      setFormData({ title: '', date: '', description: '', category: '', imageId: '' })
      setSelectedFile(null)
      setPreviewUrl('')
      setShowForm(false)
      setEditingAchievement(null)
      loadAchievements()
    } catch (error: any) {
      console.error('Error saving achievement:', error)
      
      let errorMessage = 'Failed to save achievement'
      if (error.message) {
        errorMessage += `: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      title: achievement.title,
      date: achievement.date.split('T')[0], // Convert to YYYY-MM-DD format
      description: achievement.description,
      category: achievement.category || '',
      imageId: achievement.imageId || ''
    })
    setSelectedFile(null)
    setPreviewUrl(achievement.imageId ? achievementsService.getImagePreview(achievement.imageId).toString() : '')
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
    if (confirm('Are you sure you want to delete this achievement?')) {
      try {
        const achievement = achievements.find(a => a.$id === id)
        
        // Delete image if exists
        if (achievement?.imageId) {
          try {
            await achievementsService.deleteImage(achievement.imageId)
          } catch (error) {
            console.warn('Could not delete image:', error)
          }
        }
        
        await achievementsService.delete(id)
        loadAchievements()
      } catch (error) {
        console.error('Error deleting achievement:', error)
        alert('Failed to delete achievement')
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: '', date: '', description: '', category: '', imageId: '' })
    setSelectedFile(null)
    setPreviewUrl('')
    setEditingAchievement(null)
    setShowForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
          <h1 className="text-2xl font-bold">Manage Achievements</h1>
          <Button onClick={() => setShowForm(true)}>Add New Achievement</Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Achievement Photo</label>
                  <div className="space-y-3">
                    {previewUrl && (
                      <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500">Max 5MB, JPG/PNG only (optional)</p>
                  </div>
                </div>
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
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="mt-1 block w-full border rounded px-3 py-2"
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
                    <option value="Competition">Competition</option>
                    <option value="Award">Award</option>
                    <option value="Recognition">Recognition</option>
                    <option value="Event">Event</option>
                    <option value="Project">Project</option>
                  </select>
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
                <div className="flex gap-2">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Saving...' : (editingAchievement ? 'Update' : 'Create')}
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
          {achievements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No achievements yet. Add your first achievement!
            </div>
          ) : (
            achievements.map((achievement) => (
              <div key={achievement.$id} className="border rounded-lg overflow-hidden">
                {achievement.imageId && (
                  <div className="h-48 bg-gray-100">
                    <img 
                      src={achievementsService.getImagePreview(achievement.imageId, 400, 200).toString()} 
                      alt={achievement.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏆</span>
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    {achievement.category && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {achievement.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{formatDate(achievement.date)}</p>
                  <p className="text-gray-600 mb-4">{achievement.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(achievement)}
                      className="text-sm flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(achievement.$id)}
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