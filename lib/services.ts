import { databases, storage } from '../lib/appwrite'
import { ID, Query } from 'appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_SEGMENTS = 'segments'
const COLLECTION_MEMBERS = 'members'
const COLLECTION_ACHIEVEMENTS = 'achievements'  
const COLLECTION_GALLERY = 'gallery'
const BUCKET_MEMBER_PHOTOS = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS!
const BUCKET_ACHIEVEMENTS = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS!
const BUCKET_GALLERY = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY!
const BUCKET_SEGMENT_PHOTOS = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_SEGMENT_PHOTOS!

// Storage utilities
export const storageService = {
  async uploadFile(bucketId: string, file: File) {
    return await storage.createFile(bucketId, ID.unique(), file)
  },

  async deleteFile(bucketId: string, fileId: string) {
    return await storage.deleteFile(bucketId, fileId)
  },

  getFilePreview(bucketId: string, fileId: string, width = 400, height = 400) {
    return storage.getFilePreview(bucketId, fileId, width, height)
  },

  getFileView(bucketId: string, fileId: string) {
    return storage.getFileView(bucketId, fileId)
  }
}

// Segments CRUD
export const segmentsService = {
  async list() {
    return await databases.listDocuments(DATABASE_ID, COLLECTION_SEGMENTS, [
      Query.limit(100),
      Query.orderAsc('$createdAt')
    ])
  },

  async create(data: { title: string; description: string; icon?: string; photoId?: string }) {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_SEGMENTS,
      ID.unique(),
      data
    )
  },

  async update(id: string, data: { title: string; description: string; icon?: string; photoId?: string }) {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_SEGMENTS,
      id,
      data
    )
  },

  async delete(id: string) {
    return await databases.deleteDocument(DATABASE_ID, COLLECTION_SEGMENTS, id)
  },

  async uploadPhoto(file: File) {
    return await storageService.uploadFile(BUCKET_SEGMENT_PHOTOS, file)
  },

  async deletePhoto(photoId: string) {
    return await storageService.deleteFile(BUCKET_SEGMENT_PHOTOS, photoId)
  },

  getPhotoUrl(photoId: string) {
    return storageService.getFileView(BUCKET_SEGMENT_PHOTOS, photoId)
  },

  getPhotoPreview(photoId: string, width = 400, height = 300) {
    return storageService.getFilePreview(BUCKET_SEGMENT_PHOTOS, photoId, width, height)
  }
}

// Members CRUD
export const membersService = {
  async list() {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_MEMBERS,
      [
        Query.limit(100),
        Query.orderAsc('order')
      ]
    )
  },

  async create(data: { 
    name: string
    role: string
    photoId?: string
    email?: string
    bio?: string
    order?: number
  }) {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_MEMBERS,
      ID.unique(),
      data
    )
  },

  async update(id: string, data: any) {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_MEMBERS,
      id,
      data
    )
  },

  async delete(id: string) {
    return await databases.deleteDocument(DATABASE_ID, COLLECTION_MEMBERS, id)
  },

  async uploadPhoto(file: File) {
    return await storageService.uploadFile(BUCKET_MEMBER_PHOTOS, file)
  },

  async deletePhoto(photoId: string) {
    return await storageService.deleteFile(BUCKET_MEMBER_PHOTOS, photoId)
  },

  getPhotoUrl(photoId: string) {
    return storageService.getFileView(BUCKET_MEMBER_PHOTOS, photoId)
  },

  getPhotoPreview(photoId: string, width = 200, height = 200) {
    return storageService.getFilePreview(BUCKET_MEMBER_PHOTOS, photoId, width, height)
  }
}

// Achievements CRUD
export const achievementsService = {
  async list() {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ACHIEVEMENTS,
      [
        Query.limit(100),
        Query.orderDesc('date')
      ]
    )
  },

  async create(data: {
    title: string
    date: string
    description: string
    imageId?: string
    category?: string
  }) {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ACHIEVEMENTS,
      ID.unique(),
      data
    )
  },

  async update(id: string, data: any) {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ACHIEVEMENTS,
      id,
      data
    )
  },

  async delete(id: string) {
    return await databases.deleteDocument(DATABASE_ID, COLLECTION_ACHIEVEMENTS, id)
  },

  async uploadImage(file: File) {
    return await storageService.uploadFile(BUCKET_ACHIEVEMENTS, file)
  },

  async deleteImage(imageId: string) {
    return await storageService.deleteFile(BUCKET_ACHIEVEMENTS, imageId)
  },

  getImageUrl(imageId: string) {
    return storageService.getFileView(BUCKET_ACHIEVEMENTS, imageId)
  },

  getImagePreview(imageId: string, width = 400, height = 300) {
    return storageService.getFilePreview(BUCKET_ACHIEVEMENTS, imageId, width, height)
  }
}

// Gallery CRUD
export const galleryService = {
  async list() {
    return await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_GALLERY,
      [
        Query.limit(100),
        Query.orderDesc('$createdAt')
      ]
    )
  },

  async create(data: {
    imageId: string
    caption: string
    category?: string
  }) {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_GALLERY,
      ID.unique(),
      {
        ...data,
        uploadedAt: new Date().toISOString()
      }
    )
  },

  async update(id: string, data: any) {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_GALLERY,
      id,
      data
    )
  },

  async delete(id: string) {
    return await databases.deleteDocument(DATABASE_ID, COLLECTION_GALLERY, id)
  },

  async uploadPhoto(file: File) {
    return await storageService.uploadFile(BUCKET_GALLERY, file)
  },

  async deletePhoto(photoId: string) {
    return await storageService.deleteFile(BUCKET_GALLERY, photoId)
  },

  getPhotoUrl(photoId: string) {
    return storageService.getFileView(BUCKET_GALLERY, photoId)
  },

  getPhotoPreview(photoId: string, width = 400, height = 300) {
    return storageService.getFilePreview(BUCKET_GALLERY, photoId, width, height)
  }
}