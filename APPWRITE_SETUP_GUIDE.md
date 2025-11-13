# Appwrite Setup Guide for NCC Segment Members System

## 🎯 Overview

This guide explains how to set up Appwrite to support the complete NCC website functionality, including the new **Segment Members System** where each segment can have their own members with detailed profiles, photos, and skills tracking.

## 📋 Prerequisites

- Appwrite Cloud account or self-hosted Appwrite instance
- Basic understanding of databases and collections
- Admin access to your Appwrite project

## 🚀 Quick Setup Steps

### 1. **Create Appwrite Project**

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Create a new project or use an existing one
3. Note your **Project ID** - you'll need this for your `.env` file

### 2. **Database Setup**

Create a new database:
1. Navigate to **Databases** in the Appwrite console
2. Click **Create Database**
3. Name it: `ncc-website-db`
4. Note the **Database ID** for your environment variables

### 3. **Collections Setup**

Create the following collections in your database:

#### **Collection 1: Members**
- **Collection ID**: `members`
- **Name**: `Members`

**Attributes:**
```
name          | String  | Required | Size: 100
role          | String  | Required | Size: 100  
photoId       | String  | Optional | Size: 50
email         | String  | Optional | Size: 150
bio           | String  | Optional | Size: 1000
order         | Integer | Optional | Default: 0
position      | String  | Optional | Size: 100   # NEW for segments
skills        | String  | Optional | Size: 500    # NEW: JSON array as string
joinDate      | String  | Optional | Size: 50     # NEW: When joined
segmentId     | String  | Optional | Size: 50     # NEW: Segment assignment
```

**Indexes:**
```
segmentId     | Key    | ASC  | [segmentId]
order         | Key    | ASC  | [order]
```

#### **Collection 2: Segments** 
- **Collection ID**: `segments`
- **Name**: `Segments`

**Attributes:**
```
title         | String  | Required | Size: 100
description   | String  | Required | Size: 500
icon          | String  | Optional | Size: 10
photoId       | String  | Optional | Size: 50
founded       | String  | Optional | Size: 20     # NEW
activities    | String  | Optional | Size: 1000   # NEW: JSON array
vision        | String  | Optional | Size: 500    # NEW
mission       | String  | Optional | Size: 500    # NEW
achievements  | String  | Optional | Size: 1000   # NEW: JSON array
contact       | String  | Optional | Size: 150    # NEW
```

#### **Collection 3: Achievements**
- **Collection ID**: `achievements`
- **Name**: `Achievements`

**Attributes:**
```
title         | String  | Required | Size: 200
date          | String  | Required | Size: 20
description   | String  | Required | Size: 1000
imageId       | String  | Optional | Size: 50
category      | String  | Optional | Size: 100
```

#### **Collection 4: Gallery**
- **Collection ID**: `gallery`
- **Name**: `Gallery`

**Attributes:**
```
imageId       | String  | Required | Size: 50
caption       | String  | Required | Size: 300
category      | String  | Optional | Size: 100
uploadedAt    | String  | Required | Size: 30
```

#### **Collection 5: Events**
- **Collection ID**: `events`
- **Name**: `Events`

**Attributes:**
```
title         | String  | Required | Size: 200
description   | String  | Required | Size: 1000
date          | String  | Required | Size: 30
location      | String  | Optional | Size: 200
photoIds      | String  | Optional | Size: 1000  # JSON array of photo IDs
```

### 4. **Storage Buckets Setup**

Create the following storage buckets:

#### **Bucket 1: Member Photos**
- **Bucket ID**: `member-photos`
- **Name**: `Member Photos`
- **File Size Limit**: `5MB`
- **Allowed File Extensions**: `jpg,jpeg,png,webp`
- **Enabled**: `true`
- **Encryption**: `true`

#### **Bucket 2: Segment Photos**
- **Bucket ID**: `segment-photos`  
- **Name**: `Segment Photos`
- **File Size Limit**: `10MB`
- **Allowed File Extensions**: `jpg,jpeg,png,webp`
- **Enabled**: `true`
- **Encryption**: `true`

#### **Bucket 3: Achievement Images**
- **Bucket ID**: `achievement-images`
- **Name**: `Achievement Images`
- **File Size Limit**: `10MB`
- **Allowed File Extensions**: `jpg,jpeg,png,webp`
- **Enabled**: `true`
- **Encryption**: `true`

#### **Bucket 4: Gallery Photos**
- **Bucket ID**: `gallery-photos`
- **Name**: `Gallery Photos`
- **File Size Limit**: `10MB`
- **Allowed File Extensions**: `jpg,jpeg,png,webp`
- **Enabled**: `true`
- **Encryption**: `true`

#### **Bucket 5: Event Photos**
- **Bucket ID**: `event-photos`
- **Name**: `Event Photos`
- **File Size Limit**: `10MB`
- **Allowed File Extensions**: `jpg,jpeg,png,webp`
- **Enabled**: `true`
- **Encryption**: `true`

### 5. **Permissions Setup**

For **all collections**, set these permissions:

**Read Permissions:**
- `any` (allows public read access)

**Write Permissions (Create, Update, Delete):**
- Add your admin user ID
- Or use `users` for authenticated users only

For **all storage buckets**, set these permissions:

**File Permissions:**
- **Read**: `any` (public read access)
- **Create**: `users` (authenticated users can upload)
- **Update**: `users` (authenticated users can modify)  
- **Delete**: `users` (authenticated users can delete)

### 6. **Environment Variables**

Update your `.env.local` file with your Appwrite configuration:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id-here

# Storage Bucket IDs
NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS=member-photos
NEXT_PUBLIC_APPWRITE_BUCKET_SEGMENT_PHOTOS=segment-photos
NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS=achievement-images
NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY=gallery-photos
NEXT_PUBLIC_APPWRITE_BUCKET_EVENTS=event-photos
```

### 7. **Authentication Setup**

1. Go to **Auth** → **Settings** in Appwrite console
2. Enable desired login methods:
   - **Email/Password** (recommended for admin)
   - **OAuth providers** (optional for future user registration)
3. Set **Security** settings:
   - Session length: 30 days (recommended)
   - Password policy: Enable strong passwords

## 🎯 Segment Members System Features

The new system supports:

### **Enhanced Member Profiles**
- **Basic Info**: Name, role, position within segment
- **Contact**: Email address
- **Profile**: Bio, skills list, join date
- **Visual**: Profile photo upload
- **Organization**: Display order, segment assignment

### **Rich Segment Profiles** 
- **Identity**: Title, description, icon, header photo
- **Purpose**: Vision and mission statements
- **Activity**: List of activities and focus areas
- **Success**: Key achievements and milestones
- **Contact**: Segment-specific contact information
- **Timeline**: Founded date and history

### **Admin Management**
- **Member Assignment**: Add/remove members from segments
- **Profile Management**: Edit all member and segment details
- **Photo Management**: Upload and manage profile/header photos
- **Organization**: Reorder members and manage display

## 🧪 Testing Your Setup

### 1. **Test Database Connection**
```bash
npm run dev
```
Check browser console for any Appwrite connection errors.

### 2. **Test Admin Authentication**
1. Go to `/admin/login`
2. Create an admin user in Appwrite Auth
3. Login with your admin credentials
4. Verify access to admin dashboard

### 3. **Test Segment Creation**
1. Navigate to `/admin/segments`
2. Click "Create Segment"
3. Fill in segment details with photo upload
4. Save and verify it appears in the list

### 4. **Test Member Management**
1. Go to a segment profile: `/segments/[segmentId]`
2. Click "Add Member" (admin only)
3. Fill member details with photo upload
4. Save and verify member appears in segment

### 5. **Test Public Access**
1. Visit homepage `/`
2. Click on a segment card
3. Verify segment profile loads with members
4. Test responsive design on mobile

## 🔐 Security Best Practices

### **Collection Permissions**
- **Public Collections**: Segments, Members, Achievements, Gallery, Events
- **Read Access**: `any` (public can view)
- **Write Access**: Admin users only or `users` for authenticated

### **Storage Security**
- **File Upload**: Limit to authenticated users
- **File Types**: Restrict to images only
- **File Size**: Set reasonable limits (5-10MB)
- **File Naming**: Use Appwrite's auto-generated IDs

### **Authentication**
- **Admin Users**: Use strong passwords
- **Session Management**: Set appropriate session lengths  
- **API Keys**: Never expose in client-side code

## 🚨 Troubleshooting

### **Common Issues:**

#### **"Collection not found"**
- Verify collection IDs match exactly in Appwrite console
- Check database ID is correct in environment variables
- Ensure collections exist in the specified database

#### **"Insufficient permissions"**
- Check read/write permissions on collections
- Verify user authentication status
- Confirm user IDs in permission settings

#### **Photo upload fails**
- Check storage bucket exists and has correct ID
- Verify file size limits
- Confirm file type restrictions  
- Check storage permissions

#### **Segment members not showing**
- Verify `segmentId` attribute exists in members collection
- Check that members have correct `segmentId` values
- Confirm proper indexing on `segmentId`

### **Environment Variable Issues:**
```bash
# Verify all required variables are set
echo $NEXT_PUBLIC_APPWRITE_PROJECT_ID
echo $NEXT_PUBLIC_APPWRITE_DATABASE_ID
# Check .env.local file exists and is properly formatted
```

## 📚 Additional Resources

- **Appwrite Documentation**: [https://appwrite.io/docs](https://appwrite.io/docs)
- **Next.js Appwrite Integration**: [https://appwrite.io/docs/quick-starts/nextjs](https://appwrite.io/docs/quick-starts/nextjs)
- **Database Best Practices**: [https://appwrite.io/docs/databases](https://appwrite.io/docs/databases)

## 🎉 What's Next?

Once your Appwrite setup is complete, you can:

1. **Create Segments**: Use the admin panel to create club segments
2. **Add Members**: Assign members to segments with detailed profiles
3. **Upload Content**: Add photos, achievements, and events
4. **Customize**: Modify segment details and member information
5. **Scale**: Add more segments and members as your club grows

Your NCC website is now ready with a complete segment members system! 🚀

## 💡 Pro Tips

- **Backup Regularly**: Export your database collections periodically
- **Monitor Usage**: Check Appwrite dashboard for usage metrics
- **Optimize Images**: Compress images before upload for better performance
- **Test Permissions**: Always test with different user roles
- **Document Changes**: Keep track of schema modifications

Need help? Check the troubleshooting section above or refer to the Appwrite documentation for detailed guidance.