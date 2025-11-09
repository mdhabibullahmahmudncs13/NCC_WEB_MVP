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
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      {galleryItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No photos added yet.
        </div>
      ) : (
        <GalleryGrid items={transformedItems} />
      )}
    </div>
  )
}
