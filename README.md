# NITER Computer Club (NCC) - Web MVP

A modern, minimalistic website for the NITER Computer Club built with Next.js 14 and Appwrite backend.

## 🚀 Quick Start

1. **Install dependencies:**
```powershell
cd c:\Users\mdhab\Documents\GitHub\NCC_WEB_MVP
npm install
```

2. **Set up Appwrite backend** (see detailed guide below)

3. **Configure environment variables:**
```powershell
cp .env.example .env.local
# Edit .env.local with your Appwrite credentials
```

4. **Run the development server:**
```powershell
npm run dev
```

Visit `http://localhost:3000` to see the website.

## 📦 What's Included

- **Frontend:** Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend:** Appwrite (Database, Authentication, Storage)
- **Pages:** Home, Members, Achievements, Gallery, Admin Panel
- **Components:** Reusable UI components (Header, Footer, Cards)
- **Admin Features:** CRUD operations for all content types

## 🔧 Appwrite Backend Setup

### Step 1: Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or use self-hosted Appwrite
2. Create a new account or sign in
3. Create a new project
4. Note down your **Project ID** and **API Endpoint**

### Step 2: Create API Key

1. In your Appwrite project, go to **Settings > API Keys**
2. Click **Create API Key**
3. Name: `NCC-Web-Admin`
4. Scopes: Select all scopes (for admin operations)
5. Save the **API Key** (you won't see it again)

### Step 3: Create Storage Buckets

Go to **Storage** and create these buckets:

1. **member-photos**
   - Bucket ID: `member-photos`
   - Permissions: 
     - Read: `any`
     - Create/Update/Delete: `users` (admin only)
   - File Size Limit: 5MB
   - Allowed File Extensions: `jpg,jpeg,png,webp`

2. **achievement-images**
   - Bucket ID: `achievement-images`
   - Same permissions and settings as above

3. **gallery-photos**
   - Bucket ID: `gallery-photos`
   - Same permissions and settings as above

### Step 4: Create Database Collections

Go to **Databases** and create a database called `ncc-main`. Then create these collections:

#### Collection 1: `segments`
```json
{
  "collectionId": "segments",
  "attributes": [
    {
      "key": "title",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "description",
      "type": "string",
      "size": 1000,
      "required": true
    },
    {
      "key": "icon",
      "type": "string",
      "size": 255,
      "required": false
    }
  ],
  "permissions": {
    "read": ["any"],
    "create": ["users"],
    "update": ["users"],
    "delete": ["users"]
  }
}
```

#### Collection 2: `members`
```json
{
  "collectionId": "members",
  "attributes": [
    {
      "key": "name",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "role",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "photoId",
      "type": "string",
      "size": 255,
      "required": false
    },
    {
      "key": "email",
      "type": "string",
      "size": 255,
      "required": false
    },
    {
      "key": "bio",
      "type": "string",
      "size": 1000,
      "required": false
    },
    {
      "key": "order",
      "type": "integer",
      "required": false,
      "default": 0
    }
  ],
  "permissions": {
    "read": ["any"],
    "create": ["users"],
    "update": ["users"],
    "delete": ["users"]
  }
}
```

#### Collection 3: `achievements`
```json
{
  "collectionId": "achievements",
  "attributes": [
    {
      "key": "title",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "date",
      "type": "datetime",
      "required": true
    },
    {
      "key": "description",
      "type": "string",
      "size": 1000,
      "required": true
    },
    {
      "key": "imageId",
      "type": "string",
      "size": 255,
      "required": false
    }
  ],
  "permissions": {
    "read": ["any"],
    "create": ["users"],
    "update": ["users"],
    "delete": ["users"]
  }
}
```

#### Collection 4: `gallery`
```json
{
  "collectionId": "gallery",
  "attributes": [
    {
      "key": "imageId",
      "type": "string",
      "size": 255,
      "required": true
    },
    {
      "key": "caption",
      "type": "string",
      "size": 500,
      "required": true
    }
  ],
  "permissions": {
    "read": ["any"],
    "create": ["users"],
    "update": ["users"],
    "delete": ["users"]
  }
}
```

### Step 5: Create Admin User

1. Go to **Auth > Users**
2. Click **Create User**
3. Fill in:
   - **Email:** your admin email
   - **Password:** strong password
   - **Name:** Admin User
4. Save the user

### Step 6: Configure Environment Variables

Create `.env.local` file with your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=ncc-main
NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS=member-photos
NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS=achievement-images
NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY=gallery-photos
APPWRITE_API_KEY=your_api_key_here
```

### Step 7: Test the Connection

1. Start your dev server: `npm run dev`
2. Go to `/admin/login`
3. Use the admin credentials you created
4. Test CRUD operations in the admin panel

## 🛠️ Development Commands

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
├── app/
│   ├── (public)/          # Public pages
│   │   ├── page.tsx       # Home page
│   │   ├── members/       # Members page
│   │   ├── achievements/  # Achievements page
│   │   └── gallery/       # Gallery page
│   ├── admin/             # Admin panel
│   │   ├── login/         # Admin login
│   │   ├── dashboard/     # Admin dashboard
│   │   └── [management]/  # CRUD pages
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
├── lib/
│   └── appwrite.ts        # Appwrite client config
└── public/                # Static assets
```

## 🔐 Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Regularly rotate your API keys
- Review and adjust Appwrite permissions as needed
- Enable rate limiting in production

## 🚀 Deployment

1. **Deploy to Vercel/Netlify**
2. **Set environment variables** in your hosting platform
3. **Update Appwrite settings:**
   - Add your production domain to Appwrite project settings
   - Update CORS settings if needed
4. **Test all functionality** on production

## 📖 Next Steps

- [ ] Implement authentication flow
- [ ] Add CRUD operations for all collections
- [ ] Set up image upload functionality
- [ ] Add form validation
- [ ] Implement search and filtering
- [ ] Add dark mode
- [ ] Set up analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
