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

  useEffect(() => {
    loadSegments()
  }, [])

  const loadSegments = async () => {
    try {
      const response = await segmentsService.list()
      setSegments(response.documents)
    } catch (error) {
      console.error('Error loading segments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSegment) {
        await segmentsService.update(editingSegment.$id, formData)
      } else {
        await segmentsService.create(formData)
      }
      setFormData({ title: '', description: '', icon: '' })
      setShowForm(false)
      setEditingSegment(null)
      loadSegments()
    } catch (error) {
      console.error('Error saving segment:', error)
      alert('Failed to save segment')
    }
  }

  const handleEdit = (segment: Segment) => {
    setEditingSegment(segment)
    setFormData({
      title: segment.title,
      description: segment.description,
      icon: segment.icon || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this segment?')) {
      try {
        await segmentsService.delete(id)
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
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {segment.icon && <span className="text-xl">{segment.icon}</span>}
                    <h3 className="font-semibold text-lg">{segment.title}</h3>
                  </div>
                  <p className="text-gray-600">{segment.description}</p>
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
                    onClick={() => handleDelete(segment.$id)}
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