"use client"
import { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { EventsService, Event, EventType, EventMode, EventStatus } from '../../../services/eventsService'

const initialFormData: Omit<Event, '$id' | '$createdAt' | '$updatedAt' | 'currentParticipants' | 'photoId' | 'photoUrl'> = {
  title: '',
  description: '',
  type: 'Workshop',
  mode: 'Hybrid',
  status: 'Upcoming',
  date: '',
  time: '',
  duration: '',
  location: '',
  registrationLink: '',
  maxParticipants: undefined,
  tags: []
}

export default function AdminEvents() {
  const { user } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [removePhoto, setRemovePhoto] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/admin/login')
      return
    }
    loadEvents()
  }, [user, router])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const eventsData = await EventsService.getAllEvents()
      setEvents(eventsData)
    } catch (error) {
      console.error('Error loading events:', error)
      alert('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingEvent) {
        // Update existing event
        await EventsService.updateEventWithPhoto(editingEvent.$id!, formData, photoFile || undefined, removePhoto)
      } else {
        // Add new event
        if (photoFile) {
          await EventsService.createEventWithPhoto(formData, photoFile)
        } else {
          await EventsService.createEvent(formData)
        }
      }

      await loadEvents() // Refresh the events list
      resetForm()
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Failed to save event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      type: event.type,
      mode: event.mode,
      status: event.status,
      date: event.date,
      time: event.time,
      duration: event.duration,
      location: event.location || '',
      registrationLink: event.registrationLink || '',
      maxParticipants: event.maxParticipants,
      tags: event.tags
    })
    setPhotoPreview(event.photoUrl || null)
    setPhotoFile(null)
    setRemovePhoto(false)
    setShowForm(true)
  }

  const handleDelete = async (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await EventsService.deleteEvent(eventId)
        await loadEvents() // Refresh the events list
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('Failed to delete event. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setTagInput('')
    setEditingEvent(null)
    setShowForm(false)
    setPhotoFile(null)
    setPhotoPreview(null)
    setRemovePhoto(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB')
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
    setPhotoPreview(editingEvent?.photoUrl || null)
    setRemovePhoto(true)
  }

  const handleClearPhotoSelection = () => {
    setPhotoFile(null)
    setPhotoPreview(editingEvent?.photoUrl || null)
    setRemovePhoto(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-light text-gray-900">Events Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {showForm ? 'Cancel' : 'Add New Event'}
            </button>
          </div>
          <p className="text-gray-600">Manage club events, workshops, hackathons, and seminars.</p>
        </div>

        {/* Event Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Session">Session</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2 hours, 3 days"
                  />
                </div>

                {/* Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mode *
                  </label>
                  <select
                    required
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as EventMode })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Running">Running</option>
                    <option value="Past">Past</option>
                  </select>
                </div>

                {/* Max Participants */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants
                  </label>
                  <input
                    type="number"
                    value={formData.maxParticipants || ''}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave empty for unlimited"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the event..."
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event location (for offline/hybrid events)"
                />
              </div>

              {/* Registration Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Link
                </label>
                <input
                  type="url"
                  value={formData.registrationLink}
                  onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/register"
                />
              </div>

              {/* Event Photo */}
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
                        className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={photoFile ? handleClearPhotoSelection : handleRemovePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        title={photoFile ? "Cancel upload" : "Remove photo"}
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {photoFile ? "New photo selected" : "Current photo"}
                    </p>
                  </div>
                )}
                
                {/* Photo Upload Input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload an image for the event (max 10MB). Supported formats: JPG, PNG, WebP, GIF
                </p>
                
                {/* Remove Photo Option for Editing */}
                {editingEvent?.photoUrl && !photoFile && !removePhoto && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove current photo
                  </button>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Events ({events.length})</h2>
          </div>
          
          {events.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events yet</h3>
              <p className="text-gray-500">Create your first event to get started.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {events.map(event => (
                <div key={event.$id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {/* Event Photo */}
                      {event.photoUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={event.photoUrl}
                            alt={event.title}
                            className="w-24 h-16 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                      
                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'Past' ? 'bg-gray-100 text-gray-600' :
                            event.status === 'Running' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {event.status}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {event.type}
                          </span>
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            {event.mode}
                          </span>
                        </div>
                      
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {event.time}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {event.duration}
                        </div>
                        {event.maxParticipants && (
                          <div>
                            <span className="font-medium">Participants:</span> {event.currentParticipants}/{event.maxParticipants}
                          </div>
                        )}
                      </div>
                      
                      {event.location && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Location:</span> {event.location}
                        </div>
                      )}
                      
                      {event.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {event.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit event"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(event.$id!)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete event"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}