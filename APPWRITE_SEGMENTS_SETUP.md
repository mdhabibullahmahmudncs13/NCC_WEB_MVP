# Appwrite Segments Photo Setup Guide

This guide will help you set up the necessary Appwrite bucket for segment photos in your NCC website.

## Prerequisites
- Appwrite project already configured
- Admin access to Appwrite console

## Step 1: Create Storage Bucket for Segment Photos

1. **Login to Appwrite Console**
   - Go to [Appwrite Console](https://cloud.appwrite.io/)
   - Navigate to your NCC project

2. **Create New Bucket**
   - Go to "Storage" in the left sidebar
   - Click "Create Bucket"
   - Use these settings:
     ```
     Bucket ID: segment-photos
     Name: Segment Photos
     ```

3. **Configure Bucket Permissions**
   Set the following permissions for the `segment-photos` bucket:
   
   **Read Access:**
   - `any` (Allow anyone to read/view photos)
   
   **Create Access:**
   - `users` (Only authenticated users can upload)
   
   **Update Access:**
   - `users` (Only authenticated users can update)
   
   **Delete Access:**
   - `users` (Only authenticated users can delete)

4. **Configure File Security (Optional but Recommended)**
   - Maximum File Size: 5MB
   - Allowed File Extensions: jpg, jpeg, png, webp
   - Enable Antivirus: Yes (if available in your plan)

## Step 2: Environment Variables

The following environment variable has been added to your `.env` file:

```env
NEXT_PUBLIC_APPWRITE_BUCKET_SEGMENT_PHOTOS=segment-photos
```

Make sure this matches your Appwrite bucket ID exactly.

## Step 3: Test the Setup

1. **Test Photo Upload**
   - Go to `/admin/segments` (requires admin login)
   - Create or edit a segment
   - Upload a test photo
   - Verify the photo appears in the segments list

2. **Verify in Appwrite Console**
   - Check the "Storage" > "segment-photos" bucket
   - Confirm uploaded files appear here
   - Test that photos are accessible via the generated URLs

## Features Implemented

### Admin Interface (`/admin/segments`)
- ✅ Photo upload with drag & drop
- ✅ Photo preview before saving
- ✅ Photo removal option
- ✅ Automatic photo cleanup when segment is deleted
- ✅ Visual indicators for segments with photos
- ✅ Photo display in segments list

### Backend Service (`lib/services.ts`)
- ✅ `segmentsService.uploadPhoto()` - Upload and optimize photos
- ✅ `segmentsService.deletePhoto()` - Remove photos from storage
- ✅ `segmentsService.getPhotoUrl()` - Get optimized photo URLs
- ✅ `segmentsService.getPhotoPreview()` - Get thumbnail URLs

### Photo Optimization
- ✅ Automatic resize to max 800x600 pixels
- ✅ 80% quality compression for web optimization
- ✅ Format preservation (JPG/PNG)

## Usage in Code

### Upload a Photo
```typescript
// Upload photo for a segment
const photoFile = new File(...)
const uploadedPhoto = await segmentsService.uploadPhoto(photoFile)
const photoId = uploadedPhoto.$id

// Save segment with photo
await segmentsService.create({
  title: "Segment Title",
  description: "Segment description",
  icon: "🌐",
  photoId: photoId
})
```

### Display Photo
```typescript
// Get photo URL for display
const segment = await segmentsService.getById(segmentId)
if (segment.photoId) {
  const photoUrl = segmentsService.getPhotoUrl(segment.photoId)
  // Use photoUrl.href in img src
}
```

### Delete Photo
```typescript
// When deleting a segment with photo
if (segment.photoId) {
  await segmentsService.deletePhoto(segment.photoId)
}
await segmentsService.delete(segment.$id)
```

## File Structure
```
├── lib/
│   └── services.ts              # Enhanced with photo methods
├── app/admin/segments/
│   └── page.tsx                 # Admin interface with photo upload
├── .env                         # Environment variables
└── APPWRITE_SEGMENTS_SETUP.md   # This setup guide
```

## Troubleshooting

### Common Issues

1. **"Failed to upload photo"**
   - Check bucket ID matches environment variable
   - Verify bucket permissions allow file creation
   - Ensure file size is under 5MB

2. **"Photo not displaying"**
   - Verify bucket has read permissions for `any`
   - Check console for CORS errors
   - Confirm photo ID exists in database

3. **"Permission denied"**
   - Ensure user is authenticated when uploading
   - Check bucket permissions in Appwrite console

### Support
If you encounter issues:
1. Check Appwrite console logs
2. Verify environment variables are loaded correctly
3. Test API endpoints directly in Appwrite console
4. Check browser console for JavaScript errors

## Next Steps
- Consider adding photo galleries for segments if needed
- Implement photo editing features
- Add bulk photo operations
- Consider CDN integration for better performance