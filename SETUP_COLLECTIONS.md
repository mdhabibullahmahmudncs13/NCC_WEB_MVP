# Appwrite Collections Setup Guide

Before you can add members, you need to create the necessary collections in your Appwrite database.

## 🔧 Quick Setup Steps:

### 1. **Create Database** (if not already created)
1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Open your project: `690f88ef00349bbcec0c`
3. Go to **Databases**
4. Create database with ID: `ncc-main`

### 2. **Create Collections**

#### A. **Segments Collection**
1. Click **"Create Collection"**
2. Collection ID: `segments`
3. Name: `Club Segments`

**Add these attributes:**
```
title (String, 255 chars, Required)
description (String, 1000 chars, Required)
icon (String, 255 chars, Optional)
photoId (String, 255 chars, Optional)
```

#### B. **Members Collection**
1. Click **"Create Collection"**
2. Collection ID: `members`
3. Name: `Club Members`

**Add these attributes:**
```
name (String, 255 chars, Required)
role (String, 255 chars, Required)  
photoId (String, 255 chars, Optional)
email (String, 255 chars, Optional)
bio (String, 1000 chars, Optional)
order (Integer, Optional, Default: 0)
```

#### C. **Achievements Collection**
1. Click **"Create Collection"**
2. Collection ID: `achievements`
3. Name: `Club Achievements`

**Add these attributes:**
```
title (String, 255 chars, Required)
date (DateTime, Required)
description (String, 1000 chars, Required)
imageId (String, 255 chars, Optional)
category (String, 100 chars, Optional)
```

#### D. **Gallery Collection**
1. Click **"Create Collection"**
2. Collection ID: `gallery`
3. Name: `Photo Gallery`

**Add these attributes:**
```
imageId (String, 255 chars, Required)
caption (String, 500 chars, Required)
category (String, 100 chars, Optional)
uploadedAt (DateTime, Optional)
```

**Set Permissions for ALL collections:**
- Read: `any` (public read access)
- Create: `users` (authenticated users)
- Update: `users` (authenticated users)
- Delete: `users` (authenticated users)

### 3. **Create Storage Buckets**

#### A. **Member Photos Bucket**
1. Go to **Storage**
2. Create bucket with ID: `member-photos`
3. Settings:
   - Max file size: 5MB (5242880 bytes)
   - Allowed extensions: `jpg,jpeg,png,webp`

#### B. **Achievement Images Bucket**
1. Create bucket with ID: `achievement-images`
2. Same settings as member photos

#### C. **Gallery Photos Bucket**
1. Create bucket with ID: `gallery-photos`
2. Settings:
   - Max file size: 10MB (10485760 bytes)
   - Allowed extensions: `jpg,jpeg,png,webp`

#### D. **Event Photos Bucket**
1. Create bucket with ID: `event-photos`
2. Settings:
   - Max file size: 5MB (5242880 bytes)
   - Allowed extensions: `jpg,jpeg,png,webp`

#### E. **Segment Photos Bucket**
1. Create bucket with ID: `segment-photos`
2. Settings:
   - Max file size: 5MB (5242880 bytes)
   - Allowed extensions: `jpg,jpeg,png,webp`

**Set Permissions for ALL buckets:**
- Read: `any` (public read access)
- Create: `users` (authenticated users)
- Update: `users` (authenticated users)
- Delete: `users` (authenticated users)

### 4. **Test Connection**
1. Go to your admin dashboard: `/admin/dashboard`
2. Use the "Test Connection" button
3. Should show: "✅ Connected! Found X collections"

## 🚨 **Common Issues:**

**"Collection not found" error:**
- Make sure collection ID is exactly `members`
- Check database ID is exactly `ncc-main`

**"Bucket not found" error:**
- Create the `member-photos` storage bucket
- Check bucket permissions allow file uploads

**"Insufficient permissions" error:**
- Check collection permissions allow authenticated users to create/update
- Verify you're logged in as admin

## 📝 **Quick Commands for Testing:**

After setup, try these in the admin panel:

1. **Test Connection** - Should show collections found
2. **Add Member** - Try adding a member without photo first
3. **Upload Photo** - Then try with a small image file

Once collections are created, the "Failed to save member" error should be resolved!