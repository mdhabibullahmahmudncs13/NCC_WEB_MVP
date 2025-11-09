# Appwrite Events Backend Setup

## 📋 Required Appwrite Configuration Steps

### 1. Database Setup
1. Go to your Appwrite Console: https://cloud.appwrite.io
2. Navigate to **Databases** section
3. Select your existing database: `ncc-main`

### 2. Create Events Collection
Create a new collection with the following specifications:

**Collection ID:** `events`
**Collection Name:** `Events`

### 3. Collection Attributes
Add the following attributes to the `events` collection:

| Attribute Key | Type | Size | Required | Default | Array |
|---------------|------|------|----------|---------|-------|
| `title` | String | 200 | ✅ Yes | - | ❌ No |
| `description` | String | 2000 | ✅ Yes | - | ❌ No |
| `type` | Enum | - | ✅ Yes | - | ❌ No |
| `mode` | Enum | - | ✅ Yes | - | ❌ No |
| `status` | Enum | - | ✅ Yes | - | ❌ No |
| `date` | String | 20 | ✅ Yes | - | ❌ No |
| `time` | String | 10 | ✅ Yes | - | ❌ No |
| `duration` | String | 50 | ✅ Yes | - | ❌ No |
| `location` | String | 300 | ❌ No | - | ❌ No |
| `registrationLink` | String | 500 | ❌ No | - | ❌ No |
| `maxParticipants` | Integer | - | ❌ No | - | ❌ No |
| `currentParticipants` | Integer | - | ❌ No | 0 | ❌ No |
| `photoId` | String | 50 | ❌ No | - | ❌ No |
| `photoUrl` | String | 500 | ❌ No | - | ❌ No |
| `tags` | String | 50 | ❌ No | - | ✅ Yes |

### 4. Enum Values Configuration

#### For `type` attribute:
- Workshop
- Hackathon
- Seminar
- Session
- Webinar

#### For `mode` attribute:
- Online
- Offline
- Hybrid

#### For `status` attribute:
- Past
- Running
- Upcoming

### 5. Collection Permissions
Set the following permissions:

#### Read Permissions:
- `any` (Allow public read access for the events page)

#### Create Permissions:
- `users` (Only authenticated users can create events)

#### Update Permissions:
- `users` (Only authenticated users can update events)

#### Delete Permissions:
- `users` (Only authenticated users can delete events)

### 6. Index Configuration (Optional but Recommended)
Create the following indexes for better query performance:

1. **Status Index:**
   - Key: `status_index`
   - Type: `key`
   - Attributes: `status`

2. **Type Index:**
   - Key: `type_index`
   - Type: `key`
   - Attributes: `type`

3. **Date Index:**
   - Key: `date_index`
   - Type: `key`
   - Attributes: `date`

4. **Status-Date Index:**
   - Key: `status_date_index`
   - Type: `key`
   - Attributes: `status, date`

### 7. Storage Bucket for Event Photos
Create a storage bucket for event photos:

1. Go to **Storage** section in Appwrite Console
2. Click **Create Bucket**
3. Set the following configuration:
   - **Bucket ID:** `event-photos`
   - **Bucket Name:** `Event Photos`
   - **File Security:** Enabled
   - **Maximum File Size:** 10MB (10485760 bytes)
   - **Allowed File Extensions:** jpg, jpeg, png, webp, gif
   - **Compression:** gzip
   - **Encryption:** Enabled
   - **Antivirus:** Enabled

#### Storage Permissions:
- **Read Permissions:** `any` (public read access)
- **Create Permissions:** `users` (authenticated users only)
- **Update Permissions:** `users` (authenticated users only)
- **Delete Permissions:** `users` (authenticated users only)

## 🔧 Environment Variables
Ensure your `.env` file contains:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=ncc-main
NEXT_PUBLIC_APPWRITE_BUCKET_EVENT_PHOTOS=event-photos
APPWRITE_API_KEY=your_api_key
```

## 📝 Collection Schema Summary

```json
{
  "collectionId": "events",
  "name": "Events",
  "attributes": [
    {
      "key": "title",
      "type": "string",
      "size": 200,
      "required": true
    },
    {
      "key": "description", 
      "type": "string",
      "size": 2000,
      "required": true
    },
    {
      "key": "type",
      "type": "string",
      "size": 20,
      "required": true,
      "elements": ["Workshop", "Hackathon", "Seminar", "Session", "Webinar"]
    },
    {
      "key": "mode",
      "type": "string", 
      "size": 20,
      "required": true,
      "elements": ["Online", "Offline", "Hybrid"]
    },
    {
      "key": "status",
      "type": "string",
      "size": 20, 
      "required": true,
      "elements": ["Past", "Running", "Upcoming"]
    },
    {
      "key": "date",
      "type": "string",
      "size": 20,
      "required": true
    },
    {
      "key": "time",
      "type": "string",
      "size": 10,
      "required": true
    },
    {
      "key": "duration",
      "type": "string",
      "size": 50,
      "required": true
    },
    {
      "key": "location",
      "type": "string",
      "size": 300,
      "required": false
    },
    {
      "key": "registrationLink",
      "type": "string",
      "size": 500,
      "required": false
    },
    {
      "key": "maxParticipants",
      "type": "integer",
      "required": false
    },
    {
      "key": "currentParticipants", 
      "type": "integer",
      "required": false,
      "default": 0
    },
    {
      "key": "tags",
      "type": "string",
      "size": 50,
      "required": false,
      "array": true
    }
  ]
}
```

## 🚀 Testing the Setup

After creating the collection, you can test the setup by:

1. Starting your development server: `npm run dev`
2. Logging into the admin panel: `/admin/login`
3. Navigate to Events Management: `/admin/events`
4. Try creating a test event
5. Check if the event appears on the public events page: `/events`

## 📖 API Usage Examples

### Create Event
```typescript
import { EventsService } from '../services/eventsService'

const newEvent = await EventsService.createEvent({
  title: "React Workshop",
  description: "Learn React fundamentals",
  type: "Workshop",
  mode: "Hybrid", 
  status: "Upcoming",
  date: "2025-12-01",
  time: "10:00",
  duration: "3 hours",
  location: "NITER Lab",
  tags: ["React", "Frontend"]
})
```

### Get All Events
```typescript
const events = await EventsService.getAllEvents()
```

### Filter Events
```typescript
const upcomingEvents = await EventsService.getEventsByStatus("Upcoming")
const workshops = await EventsService.getEventsByType("Workshop")
const onlineEvents = await EventsService.getEventsByMode("Online")
```

## 🔍 Troubleshooting

### Common Issues:
1. **Permission Denied**: Check collection permissions in Appwrite Console
2. **Attribute Missing**: Ensure all required attributes are created with correct types
3. **Enum Values**: Verify enum values match exactly (case-sensitive)
4. **Environment Variables**: Confirm all environment variables are set correctly

### Debug Steps:
1. Check browser console for error messages
2. Verify Appwrite Console shows the collection and attributes
3. Test API calls directly from Appwrite Console
4. Ensure user is authenticated for admin operations