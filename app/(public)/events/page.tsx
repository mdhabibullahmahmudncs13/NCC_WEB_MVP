"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

type EventType = 'Workshop' | 'Hackathon' | 'Seminar' | 'Session' | 'Webinar'
type EventMode = 'Online' | 'Offline' | 'Hybrid'
type EventStatus = 'Past' | 'Running' | 'Upcoming'

type Event = {
  id: string
  title: string
  description: string
  type: EventType
  mode: EventMode
  status: EventStatus
  date: string
  time: string
  duration: string
  location?: string
  registrationLink?: string
  maxParticipants?: number
  currentParticipants?: number
  tags: string[]
}

// Demo events data
const demoEvents: Event[] = [
  {
    id: '1',
    title: 'React & Next.js Workshop',
    description: 'Learn modern React development with Next.js framework. Build a complete web application from scratch.',
    type: 'Workshop',
    mode: 'Hybrid',
    status: 'Upcoming',
    date: '2025-11-20',
    time: '10:00 AM',
    duration: '4 hours',
    location: 'NITER Lab Room 301 / Online',
    registrationLink: '#',
    maxParticipants: 50,
    currentParticipants: 23,
    tags: ['React', 'Next.js', 'Frontend', 'JavaScript']
  },
  {
    id: '2',
    title: 'AI/ML Innovation Hackathon',
    description: '48-hour hackathon focusing on AI/ML solutions for real-world problems. Win exciting prizes!',
    type: 'Hackathon',
    mode: 'Offline',
    status: 'Upcoming',
    date: '2025-12-01',
    time: '9:00 AM',
    duration: '48 hours',
    location: 'NITER Main Campus',
    registrationLink: '#',
    maxParticipants: 100,
    currentParticipants: 67,
    tags: ['AI', 'Machine Learning', 'Python', 'Competition']
  },
  {
    id: '3',
    title: 'Cybersecurity Best Practices',
    description: 'Expert seminar on modern cybersecurity threats and protection strategies for developers.',
    type: 'Seminar',
    mode: 'Online',
    status: 'Running',
    date: '2025-11-09',
    time: '2:00 PM',
    duration: '2 hours',
    registrationLink: '#',
    maxParticipants: 200,
    currentParticipants: 156,
    tags: ['Security', 'Best Practices', 'Networking']
  },
  {
    id: '4',
    title: 'Git & GitHub Masterclass',
    description: 'Complete guide to version control with Git and collaborative development using GitHub.',
    type: 'Session',
    mode: 'Hybrid',
    status: 'Past',
    date: '2025-10-25',
    time: '3:00 PM',
    duration: '3 hours',
    location: 'NITER Computer Lab',
    tags: ['Git', 'GitHub', 'Version Control', 'Collaboration']
  },
  {
    id: '5',
    title: 'Cloud Computing with AWS',
    description: 'Introduction to cloud services and hands-on AWS deployment strategies.',
    type: 'Webinar',
    mode: 'Online',
    status: 'Past',
    date: '2025-10-15',
    time: '7:00 PM',
    duration: '90 minutes',
    tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure']
  }
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>(demoEvents)
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'All'>('All')
  const [selectedType, setSelectedType] = useState<EventType | 'All'>('All')
  const [selectedMode, setSelectedMode] = useState<EventMode | 'All'>('All')

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
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more events.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredEvents.map(event => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
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
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
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