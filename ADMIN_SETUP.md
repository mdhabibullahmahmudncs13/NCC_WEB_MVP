# Admin Account Setup & Login Guide

## 🔐 Step 1: Create Admin Account in Appwrite

### Using Appwrite Console (Recommended)

1. **Go to your Appwrite project:**
   - Visit [https://cloud.appwrite.io](https://cloud.appwrite.io)
   - Open your project: `690f88ef00349bbcec0c`

2. **Navigate to Authentication:**
   - Click **"Auth"** in the left sidebar
   - Click **"Users"** tab

3. **Create Admin User:**
   - Click **"Create User"** button
   - Fill in the form:
     ```
     User ID: (leave auto-generated)
     Email: admin@ncc.edu
     Password: SecureAdminPass123!
     Name: NCC Admin
     ```
   - Click **"Create"**

4. **Verify User Status:**
   - Ensure the user status is **"Active"**
   - Email verification should be **"Verified"**

## 🚀 Step 2: Set Up Environment Variables

1. **Copy environment file:**
   ```powershell
   cp .env.example .env.local
   ```

2. **Your `.env.local` should contain:**
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=690f88ef00349bbcec0c
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=ncc-main
   NEXT_PUBLIC_APPWRITE_BUCKET_MEMBER_PHOTOS=member-photos
   NEXT_PUBLIC_APPWRITE_BUCKET_ACHIEVEMENTS=achievement-images
   NEXT_PUBLIC_APPWRITE_BUCKET_GALLERY=gallery-photos
   APPWRITE_API_KEY=your_api_key_here
   ```

## 🧪 Step 3: Test Admin Login

1. **Start the development server:**
   ```powershell
   npm run dev
   ```

2. **Navigate to login page:**
   - Go to `http://localhost:3000/admin/login`

3. **Use admin credentials:**
   ```
   Email: admin@ncc.edu
   Password: SecureAdminPass123!
   ```

4. **Successful login should:**
   - Redirect you to `/admin/dashboard`
   - Show "Dashboard" and "Logout" in the header
   - Display the admin panel with management options

## 🔧 Alternative: Create Admin via API

If you prefer to create the admin programmatically:

```javascript
// create-admin.js
const { Client, Users } = require('appwrite');

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('690f88ef00349bbcec0c')
    .setKey('your_api_key_here');

const users = new Users(client);

async function createAdmin() {
    try {
        const admin = await users.create(
            'unique()', // User ID
            'admin@ncc.edu', // Email
            undefined, // Phone (optional)
            'SecureAdminPass123!', // Password
            'NCC Admin' // Name
        );
        
        console.log('✅ Admin user created successfully!');
        console.log('User ID:', admin.$id);
        console.log('Email:', admin.email);
        
        // Verify email
        await users.updateEmailVerification(admin.$id, true);
        console.log('✅ Email verified');
        
    } catch (error) {
        console.error('❌ Error creating admin:', error);
    }
}

createAdmin();
```

Run: `node create-admin.js`

## 🔍 Troubleshooting

### Login Issues

**Problem: "Invalid credentials" error**
- ✅ Check email/password spelling
- ✅ Verify user exists in Appwrite console
- ✅ Ensure user status is "Active"
- ✅ Check email is verified

**Problem: "Project not found" error**
- ✅ Verify `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct
- ✅ Check project exists in Appwrite console
- ✅ Ensure `.env.local` file exists

**Problem: Redirect loop or blank page**
- ✅ Check browser console for errors
- ✅ Clear browser cache and cookies
- ✅ Verify authentication context is properly wrapped

### Development Issues

**Problem: "useAuth must be used within AuthProvider"**
- ✅ Ensure `AuthProvider` wraps your app in `layout.tsx`
- ✅ Check import paths are correct

**Problem: Network errors**
- ✅ Check internet connection
- ✅ Verify Appwrite endpoint URL
- ✅ Check if Appwrite service is down

## 🔐 Security Best Practices

1. **Change Default Credentials:**
   ```
   # After first login, change to:
   Email: your-actual-admin-email@domain.com
   Password: Use a strong, unique password
   ```

2. **Use Strong Passwords:**
   - Minimum 12 characters
   - Include uppercase, lowercase, numbers, symbols
   - Use a password manager

3. **Environment Security:**
   - Never commit `.env.local` to git
   - Use different credentials for production
   - Rotate API keys regularly

## 📱 Testing the Full Flow

1. **Test Public Access:**
   - Visit homepage: `http://localhost:3000`
   - Navigate to members, achievements, gallery
   - Verify pages load without authentication

2. **Test Protected Routes:**
   - Try accessing `/admin/dashboard` without login
   - Should redirect to `/admin/login`

3. **Test Authentication:**
   - Login with admin credentials
   - Access should be granted to admin pages
   - Header should show "Dashboard" and "Logout"

4. **Test Logout:**
   - Click "Logout" button
   - Should redirect to home page
   - Admin pages should be protected again

## 🎉 Success Indicators

✅ **Admin user created in Appwrite console**
✅ **Login page loads without errors**
✅ **Successful login with admin credentials**
✅ **Redirected to admin dashboard**
✅ **Header shows admin navigation**
✅ **Protected routes work correctly**
✅ **Logout functionality works**

Once all these steps are complete, your admin authentication system is fully functional!