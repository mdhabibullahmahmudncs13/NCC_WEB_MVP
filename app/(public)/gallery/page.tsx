"use client"
import { useState, useEffect } from 'react'
import GalleryGrid from '../../../components/GalleryGrid'
import { galleryService } from '../../../lib/services'
import { storage } from '../../../lib/appwrite'

type GalleryItem = {
  $id: string
  imageId: string
  caption: string
  category?: string
}

export default function GalleryPage(){
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      const response = await galleryService.list()
      setGalleryItems(response.documents as unknown as GalleryItem[])
    } catch (error) {
      console.error('Error loading gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (imageId: string) => {
    return storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY!,
      imageId
    ).toString()
  }

  // Transform gallery items for GalleryGrid component
  const transformedItems = galleryItems.map(item => ({
    id: item.$id,
    src: getImageUrl(item.imageId),
    caption: item.caption
  }))

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Photo Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Capturing moments from our events, activities, and community gatherings.
        </p>
      </div>
      
      {galleryItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Photos Yet</h3>
          <p className="text-gray-500">Our photo gallery is being updated. Check back soon for amazing moments!</p>
        </div>
      ) : (
        <GalleryGrid items={transformedItems} />
      )}
    </div>
  )
}
