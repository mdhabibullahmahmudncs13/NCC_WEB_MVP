# Appwrite Backend Setup Guide

This guide will walk you through setting up the complete Appwrite backend for the NITER Computer Club (NCC) website.

## 📋 Prerequisites

- Appwrite Cloud account (or self-hosted Appwrite)
- Basic understanding of databases and APIs
- Admin email for the system

## 🚀 Step 1: Create Appwrite Project

1. **Sign in to Appwrite**
   - Go to [Appwrite Cloud](https://cloud.appwrite.io)
   - Create account or sign in

2. **Create New Project**
   - Click "Create Project"
   - Project Name: `NCC Website`
   - Project ID: Will be auto-generated (save this!)
   - Region: Choose closest to your users

3. **Note Important Details**
   ```
   Project ID: [your-project-id]
   Endpoint: https://cloud.appwrite.io/v1
   ```

## 🔑 Step 2: Generate API Key

1. **Navigate to API Keys**
   - Go to **Settings → API Keys**
   - Click **"Create API Key"**

2. **Configure API Key**
   - Name: `NCC-Admin-Key`
   - Scopes: **Select ALL scopes** for full admin access
   - Expiry: Never (or set long expiry)

3. **Save the Key**
   - Copy the generated API key immediately
   - You won't be able to see it again!

## 💾 Step 3: Create Database

1. **Create Database**
   - Go to **Databases**
   - Click **"Create Database"**
   - Database ID: `ncc-main`
   - Name: `NCC Main Database`

## 📁 Step 4: Create Collections

### Collection 1: Segments

Create collection for club segments/divisions.

**Collection Settings:**
- Collection ID: `segments`
- Name: `Club Segments`

**Attributes:**
```json
[
  {
    "key": "title",
    "type": "string",
    "size": 255,
    "required": true,
    "array": false
  },
  {
    "key": "description",
    "type": "string", 
    "size": 1000,
    "required": true,
    "array": false
  },
  {
    "key": "icon",
    "type": "string",
    "size": 255,
    "required": false,
    "array": false
  }
]
```

**Permissions:**
- **Read:** `any` (public read access)
- **Create:** `users` (authenticated users only)
- **Update:** `users` (authenticated users only)
- **Delete:** `users` (authenticated users only)

**Sample Data:**
```json
[
  {
    "title": "Web Development",
    "description": "Building modern web applications using cutting-edge technologies like React, Next.js, and Node.js",
    "icon": "🌐"
  },
  {
    "title": "AI & Machine Learning", 
    "description": "Exploring artificial intelligence, machine learning algorithms, and data science projects",
    "icon": "🤖"
  },
  {
    "title": "Mobile Development",
    "description": "Creating cross-platform mobile applications using React Native and Flutter",
    "icon": "📱"
  }
]
```

### Collection 2: Members

Create collection for club members.

**Collection Settings:**
- Collection ID: `members`
- Name: `Club Members`

**Attributes:**
```json
[
  {
    "key": "name",
    "type": "string",
    "size": 255,
    "required": true,
    "array": false
  },
  {
    "key": "role",
    "type": "string",
    "size": 255,
    "required": true,
    "array": false
  },
  {
    "key": "photoId",
    "type": "string",
    "size": 255,
    "required": false,
    "array": false
  },
  {
    "key": "email",
    "type": "string",
    "size": 255,
    "required": false,
    "array": false
  },
  {
    "key": "bio",
    "type": "string",
    "size": 1000,
    "required": false,
    "array": false
  },
  {
    "key": "order",
    "type": "integer",
    "required": false,
    "array": false,
    "default": 0
  },
  {
    "key": "isActive",
    "type": "boolean",
    "required": false,
    "array": false,
    "default": true
  }
]
```

**Permissions:** Same as segments

**Sample Data:**
```json
[
  {
    "name": "John Doe",
    "role": "President",
    "email": "john@niter.edu",
    "bio": "Computer Science student passionate about web development and leadership",
    "order": 1,
    "isActive": true
  },
  {
    "name": "Jane Smith",
    "role": "Vice President",
    "email": "jane@niter.edu", 
    "bio": "AI enthusiast and competitive programmer",
    "order": 2,
    "isActive": true
  }
]
```

### Collection 3: Achievements

Create collection for club achievements.

**Collection Settings:**
- Collection ID: `achievements`
- Name: `Club Achievements`

**Attributes:**
```json
[
  {
    "key": "title",
    "type": "string",
    "size": 255,
    "required": true,
    "array": false
  },
  {
    "key": "date",
    "type": "datetime",
    "required": true,
    "array": false
  },
  {
    "key": "description",
    "type": "string",
    "size": 1000,
    "required": true,
    "array": false
  },
  {
    "key": "imageId",
    "type": "string",
    "size": 255,
    "required": false,
    "array": false
  },
  {
    "key": "category",
    "type": "string",
    "size": 100,
    "required": false,
    "array": false
  }
]
```

**Permissions:** Same as segments

**Sample Data:**
```json
[
  {
    "title": "Won National Hackathon 2024",
    "date": "2024-10-15T00:00:00.000Z",
    "description": "Our team 'Code Warriors' secured first place in the inter-university hackathon with an innovative healthcare app",
    "category": "Competition"
  },
  {
    "title": "Inter-college Coding Championship",
    "date": "2024-08-20T00:00:00.000Z", 
    "description": "Runner-up position in the regional coding contest with 50+ participating teams",
    "category": "Competition"
  }
]
```

### Collection 4: Gallery

Create collection for photo gallery.

**Collection Settings:**
- Collection ID: `gallery`
- Name: `Photo Gallery`

**Attributes:**
```json
[
  {
    "key": "imageId",
    "type": "string",
    "size": 255,
    "required": true,
    "array": false
  },
  {
    "key": "caption",
    "type": "string",
    "size": 500,
    "required": true,
    "array": false
  },
  {
    "key": "uploadedAt",
    "type": "datetime",
    "required": false,
    "array": false
  },
  {
    "key": "category",
    "type": "string",
    "size": 100,
    "required": false,
    "array": false
  }
]
```

**Permissions:** Same as segments

## 🗂️ Step 5: Create Storage Buckets

### Bucket 1: Member Photos

**Bucket Settings:**
- Bucket ID: `member-photos`
- Name: `Member Profile Photos`

**Configuration:**
- **Maximum File Size:** 5MB (5242880 bytes)
- **Allowed File Extensions:** `jpg,jpeg,png,webp`
- **Encryption:** Enabled
- **Antivirus:** Enabled

**Permissions:**
- **Read:** `any` (public read)
- **Create:** `users` (authenticated users)
- **Update:** `users` (authenticated users)
- **Delete:** `users` (authenticated users)

### Bucket 2: Achievement Images

**Bucket Settings:**
- Bucket ID: `achievement-images`
- Name: `Achievement Photos`

**Configuration:** Same as member-photos

### Bucket 3: Gallery Photos

**Bucket Settings:**
- Bucket ID: `gallery-photos`
- Name: `Gallery Images`

**Configuration:**
- **Maximum File Size:** 10MB (10485760 bytes)
- **Allowed File Extensions:** `jpg,jpeg,png,webp`
- **Encryption:** Enabled
- **Antivirus:** Enabled

**Permissions:** Same as member-photos

## 👤 Step 6: Create Admin User

1. **Navigate to Authentication**
   - Go to **Auth → Users**
   - Click **"Create User"**

2. **User Details**
   ```
   User ID: (auto-generated)
   Email: admin@ncc.edu (or your email)
   Password: [Strong password]
   Name: NCC Admin
   ```

3. **Set User Status**
   - Status: **Active**
   - Email Verification: **Verified**

4. **Save Credentials**
   - Write down the email and password
   - These will be used for admin login

## 🔧 Step 7: Configure Environment Variables

Create `.env.local` file in your project root:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here

# Database
NEXT_PUBLIC_APPWRITE_DATABASE_ID=ncc-main

# Storage Buckets
NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS=member-photos
NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS=achievement-images
NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY=gallery-photos

# Server-side API Key (NEVER expose to client)
APPWRITE_API_KEY=your_api_key_here

# Collection IDs
NEXT_PUBLIC_COLLECTION_SEGMENTS=segments
NEXT_PUBLIC_COLLECTION_MEMBERS=members
NEXT_PUBLIC_COLLECTION_ACHIEVEMENTS=achievements
NEXT_PUBLIC_COLLECTION_GALLERY=gallery
```

## ✅ Step 8: Test Your Setup

### Test Database Connection

Create a test file `test-appwrite.js`:

```javascript
const { Client, Databases } = require('appwrite');

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('your_project_id')
    .setKey('your_api_key');

const databases = new Databases(client);

async function testConnection() {
    try {
        const response = await databases.listCollections('ncc-main');
        console.log('✅ Database connection successful!');
        console.log('Collections:', response.collections.map(c => c.name));
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

testConnection();
```

Run: `node test-appwrite.js`

### Test in Your App

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Test admin login:**
   - Go to `http://localhost:3000/admin/login`
   - Use your admin credentials

3. **Check collections:**
   - Verify data loads on public pages
   - Test CRUD operations in admin panel

## 🔒 Security Best Practices

### API Key Security
- ✅ Never commit API keys to version control
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys regularly
- ✅ Store keys in secure environment variables

### Permissions Review
- ✅ Set `any` read access only for public data
- ✅ Restrict write access to authenticated users
- ✅ Use role-based permissions for different user types
- ✅ Regularly audit permissions

### File Upload Security
- ✅ Set appropriate file size limits
- ✅ Restrict file types to images only
- ✅ Enable antivirus scanning
- ✅ Use content validation

## 🔍 Troubleshooting

### Common Issues

**1. "Project not found" error**
- ✅ Check `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct
- ✅ Verify project exists in Appwrite console

**2. "Insufficient permissions" error**
- ✅ Check API key has all required scopes
- ✅ Verify collection permissions are set correctly

**3. "Collection not found" error**
- ✅ Ensure collection IDs match exactly
- ✅ Check database ID is correct

**4. File upload fails**
- ✅ Check file size and type restrictions
- ✅ Verify bucket permissions
- ✅ Ensure bucket ID is correct

### Debug Steps

1. **Check Appwrite Console Logs**
   - Go to your project dashboard
   - Check for error messages

2. **Verify Environment Variables**
   ```javascript
   console.log('Project ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
   console.log('Database ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
   ```

3. **Test API Connectivity**
   - Use Appwrite's built-in API explorer
   - Test endpoints manually

## 📚 Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Web SDK](https://appwrite.io/docs/getting-started-for-web)
- [Appwrite Authentication](https://appwrite.io/docs/client/account)
- [Appwrite Database](https://appwrite.io/docs/client/database)
- [Appwrite Storage](https://appwrite.io/docs/client/storage)

## 🆘 Support

If you encounter issues:
1. Check this guide thoroughly
2. Review Appwrite documentation
3. Check the project's GitHub issues
4. Contact the development team

---

**Next:** Once Appwrite is set up, return to the main README for implementing the frontend integration and CRUD operations.