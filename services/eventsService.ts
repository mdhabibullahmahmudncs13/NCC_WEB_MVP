import { databases, storage } from '../lib/appwrite'
import { ID, Query, Models } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const EVENTS_COLLECTION_ID = 'events'
const EVENT_PHOTOS_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_EVENT_PHOTOS!

export type EventType = 'Workshop' | 'Hackathon' | 'Seminar' | 'Session' | 'Webinar'
export type EventMode = 'Online' | 'Offline' | 'Hybrid'
export type EventStatus = 'Past' | 'Running' | 'Upcoming'

export interface Event extends Models.Document {
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
  photoId?: string
  photoUrl?: string
  tags: string[]
}

export class EventsService {
  // Upload event photo
  static async uploadEventPhoto(file: File): Promise<{photoId: string, photoUrl: string}> {
    try {
      const fileUpload = await storage.createFile(
        EVENT_PHOTOS_BUCKET_ID,
        ID.unique(),
        file
      )
      
      const photoUrl = storage.getFilePreview(
        EVENT_PHOTOS_BUCKET_ID,
        fileUpload.$id,
        800, // width
        600, // height
        'center', // gravity
        80 // quality
      ).href
      
      return {
        photoId: fileUpload.$id,
        photoUrl
      }
    } catch (error) {
      console.error('Error uploading event photo:', error)
      throw new Error('Failed to upload event photo')
    }
  }

  // Delete event photo
  static async deleteEventPhoto(photoId: string): Promise<void> {
    try {
      await storage.deleteFile(EVENT_PHOTOS_BUCKET_ID, photoId)
    } catch (error) {
      console.error('Error deleting event photo:', error)
      throw new Error('Failed to delete event photo')
    }
  }

  // Create a new event
  static async createEvent(eventData: Omit<Event, '$id' | '$createdAt' | '$updatedAt' | 'currentParticipants'>): Promise<Event> {
    try {
      const event = await databases.createDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        ID.unique(),
        {
          ...eventData,
          currentParticipants: 0
        }
      )
      return event as unknown as Event
    } catch (error) {
      console.error('Error creating event:', error)
      throw new Error('Failed to create event')
    }
  }

  // Create event with photo
  static async createEventWithPhoto(eventData: Omit<Event, '$id' | '$createdAt' | '$updatedAt' | 'currentParticipants' | 'photoId' | 'photoUrl'>, photoFile?: File): Promise<Event> {
    try {
      let photoId: string | undefined
      let photoUrl: string | undefined
      
      if (photoFile) {
        const photoUpload = await this.uploadEventPhoto(photoFile)
        photoId = photoUpload.photoId
        photoUrl = photoUpload.photoUrl
      }
      
      const event = await databases.createDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        ID.unique(),
        {
          ...eventData,
          currentParticipants: 0,
          photoId,
          photoUrl
        }
      )
      
      return event as unknown as Event
    } catch (error) {
      console.error('Error creating event with photo:', error)
      throw new Error('Failed to create event')
    }
  }

  // Get all events
  static async getAllEvents(): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(100)
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error fetching events:', error)
      throw new Error('Failed to fetch events')
    }
  }

  // Get events by status
  static async getEventsByStatus(status: EventStatus): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.equal('status', status),
          Query.orderDesc('date')
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error fetching events by status:', error)
      throw new Error('Failed to fetch events')
    }
  }

  // Get events by type
  static async getEventsByType(type: EventType): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.equal('type', type),
          Query.orderDesc('date')
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error fetching events by type:', error)
      throw new Error('Failed to fetch events')
    }
  }

  // Get events by mode
  static async getEventsByMode(mode: EventMode): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.equal('mode', mode),
          Query.orderDesc('date')
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error fetching events by mode:', error)
      throw new Error('Failed to fetch events')
    }
  }

  // Get single event by ID
  static async getEventById(eventId: string): Promise<Event> {
    try {
      const event = await databases.getDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        eventId
      )
      return event as unknown as Event
    } catch (error) {
      console.error('Error fetching event:', error)
      throw new Error('Failed to fetch event')
    }
  }

  // Update an event
  static async updateEvent(eventId: string, eventData: Partial<Event>): Promise<Event> {
    try {
      const updatedEvent = await databases.updateDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        eventId,
        eventData
      )
      return updatedEvent as unknown as Event
    } catch (error) {
      console.error('Error updating event:', error)
      throw new Error('Failed to update event')
    }
  }

  // Update event with photo
  static async updateEventWithPhoto(eventId: string, eventData: Partial<Event>, photoFile?: File, removePhoto: boolean = false): Promise<Event> {
    try {
      const currentEvent = await this.getEventById(eventId)
      let photoId = currentEvent.photoId
      let photoUrl = currentEvent.photoUrl
      
      // Handle photo removal
      if (removePhoto && currentEvent.photoId) {
        await this.deleteEventPhoto(currentEvent.photoId)
        photoId = undefined
        photoUrl = undefined
      }
      
      // Handle new photo upload
      if (photoFile) {
        // Delete old photo if exists
        if (currentEvent.photoId) {
          await this.deleteEventPhoto(currentEvent.photoId)
        }
        
        const photoUpload = await this.uploadEventPhoto(photoFile)
        photoId = photoUpload.photoId
        photoUrl = photoUpload.photoUrl
      }
      
      const updatedEvent = await databases.updateDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        eventId,
        {
          ...eventData,
          photoId,
          photoUrl
        }
      )
      
      return updatedEvent as unknown as Event
    } catch (error) {
      console.error('Error updating event with photo:', error)
      throw new Error('Failed to update event')
    }
  }

  // Delete an event
  static async deleteEvent(eventId: string): Promise<void> {
    try {
      // Get event to check if it has a photo
      const event = await this.getEventById(eventId)
      
      // Delete photo if exists
      if (event.photoId) {
        await this.deleteEventPhoto(event.photoId)
      }
      
      // Delete the event document
      await databases.deleteDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        eventId
      )
    } catch (error) {
      console.error('Error deleting event:', error)
      throw new Error('Failed to delete event')
    }
  }

  // Register for an event (increment participants)
  static async registerForEvent(eventId: string): Promise<Event> {
    try {
      const event = await this.getEventById(eventId)
      const newParticipantCount = (event.currentParticipants || 0) + 1
      
      if (event.maxParticipants && newParticipantCount > event.maxParticipants) {
        throw new Error('Event is full')
      }

      return await this.updateEvent(eventId, {
        currentParticipants: newParticipantCount
      })
    } catch (error) {
      console.error('Error registering for event:', error)
      throw error
    }
  }

  // Unregister from an event (decrement participants)
  static async unregisterFromEvent(eventId: string): Promise<Event> {
    try {
      const event = await this.getEventById(eventId)
      const newParticipantCount = Math.max(0, (event.currentParticipants || 0) - 1)

      return await this.updateEvent(eventId, {
        currentParticipants: newParticipantCount
      })
    } catch (error) {
      console.error('Error unregistering from event:', error)
      throw error
    }
  }

  // Search events by title or description
  static async searchEvents(searchTerm: string): Promise<Event[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.search('title', searchTerm),
          Query.orderDesc('$createdAt')
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error searching events:', error)
      throw new Error('Failed to search events')
    }
  }

  // Get upcoming events (next 10)
  static async getUpcomingEvents(limit: number = 10): Promise<Event[]> {
    try {
      const today = new Date().toISOString().split('T')[0]
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        [
          Query.equal('status', 'Upcoming'),
          Query.greaterThanEqual('date', today),
          Query.orderAsc('date'),
          Query.limit(limit)
        ]
      )
      return response.documents as unknown as Event[]
    } catch (error) {
      console.error('Error fetching upcoming events:', error)
      throw new Error('Failed to fetch upcoming events')
    }
  }
}