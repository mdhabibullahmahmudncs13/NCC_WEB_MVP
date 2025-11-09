"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EventsService, Event, EventType, EventMode, EventStatus } from '../../../services/eventsService'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'All'>('All')
  const [selectedType, setSelectedType] = useState<EventType | 'All'>('All')
  const [selectedMode, setSelectedMode] = useState<EventMode | 'All'>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const eventsData = await EventsService.getAllEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const filteredEvents = events.filter(event => {
    if (selectedStatus !== 'All' && event.status !== selectedStatus) return false
    if (selectedType !== 'All' && event.type !== selectedType) return false
    if (selectedMode !== 'All' && event.mode !== selectedMode) return false
    return true
  })

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'Past': return 'bg-gray-100 text-gray-600'
      case 'Running': return 'bg-green-100 text-green-800'
      case 'Upcoming': return 'bg-blue-100 text-blue-800'
    }
  }

  const getTypeIcon = (type: EventType) => {
    switch (type) {
      case 'Workshop': return '🛠️'
      case 'Hackathon': return '💻'
      case 'Seminar': return '🎓'
      case 'Session': return '📚'
      case 'Webinar': return '🌐'
    }
  }

  const getModeIcon = (mode: EventMode) => {
    switch (mode) {
      case 'Online': return '💻'
      case 'Offline': return '🏢'
      case 'Hybrid': return '🔄'
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our workshops, hackathons, seminars, and webinars to enhance your skills and connect with the tech community
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as EventStatus | 'All')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="All">All</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Running">Running</option>
                <option value="Past">Past</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as EventType | 'All')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="All">All</option>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Seminar">Seminar</option>
                <option value="Session">Session</option>
                <option value="Webinar">Webinar</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Mode:</span>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as EventMode | 'All')}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              >
                <option value="All">All</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Loading events...</h3>
              <p className="text-gray-500">Please wait while we fetch the latest events.</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more events.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredEvents.map(event => (
                <div key={event.$id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Event Photo */}
                  {event.photoUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={event.photoUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTypeIcon(event.type)}</span>
                        <span className="text-sm font-medium text-gray-600">{event.type}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>

                  {/* Event Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  
                  {/* Event Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📅</span>
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time.includes(':') ? 
                        new Date(`2000-01-01T${event.time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                        event.time
                      }</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>⏱️</span>
                      <span>{event.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{getModeIcon(event.mode)}</span>
                      <span>{event.mode} {event.location && `- ${event.location}`}</span>
                    </div>

                    {event.maxParticipants && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>👥</span>
                        <span>{event.currentParticipants}/{event.maxParticipants} registered</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  {event.status === 'Upcoming' && event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-center block"
                    >
                      Register Now
                    </a>
                  )}
                  
                  {event.status === 'Running' && (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                      Join Now
                    </button>
                  )}

                  {event.status === 'Past' && (
                    <button className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-md font-medium cursor-not-allowed">
                      Event Ended
                    </button>
                  )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Want to organize an event?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have an idea for a workshop, seminar, or any tech event? We'd love to help you make it happen!
          </p>
          <a
            href="mailto:events@nitercc.edu"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Propose an Event
          </a>
        </div>
      </section>
    </div>
  )
}