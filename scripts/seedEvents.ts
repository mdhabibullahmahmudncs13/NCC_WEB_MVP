import { EventsService } from '../services/eventsService'

// Demo events data for initial setup
const demoEvents = [
  {
    title: 'React & Next.js Workshop',
    description: 'Learn modern React development with Next.js framework. Build a complete web application from scratch.',
    type: 'Workshop' as const,
    mode: 'Hybrid' as const,
    status: 'Upcoming' as const,
    date: '2025-11-20',
    time: '10:00',
    duration: '4 hours',
    location: 'NITER Lab Room 301 / Online',
    registrationLink: 'https://forms.google.com/react-workshop',
    maxParticipants: 50,
    tags: ['React', 'Next.js', 'Frontend', 'JavaScript']
  },
  {
    title: 'AI/ML Innovation Hackathon',
    description: '48-hour hackathon focusing on AI/ML solutions for real-world problems. Win exciting prizes!',
    type: 'Hackathon' as const,
    mode: 'Offline' as const,
    status: 'Upcoming' as const,
    date: '2025-12-01',
    time: '09:00',
    duration: '48 hours',
    location: 'NITER Main Campus',
    registrationLink: 'https://forms.google.com/ai-hackathon',
    maxParticipants: 100,
    tags: ['AI', 'Machine Learning', 'Python', 'Competition']
  },
  {
    title: 'Cybersecurity Best Practices',
    description: 'Expert seminar on modern cybersecurity threats and protection strategies for developers.',
    type: 'Seminar' as const,
    mode: 'Online' as const,
    status: 'Running' as const,
    date: '2025-11-09',
    time: '14:00',
    duration: '2 hours',
    registrationLink: 'https://zoom.us/cybersecurity-seminar',
    maxParticipants: 200,
    tags: ['Security', 'Best Practices', 'Networking']
  },
  {
    title: 'Git & GitHub Masterclass',
    description: 'Complete guide to version control with Git and collaborative development using GitHub.',
    type: 'Session' as const,
    mode: 'Hybrid' as const,
    status: 'Past' as const,
    date: '2025-10-25',
    time: '15:00',
    duration: '3 hours',
    location: 'NITER Computer Lab',
    tags: ['Git', 'GitHub', 'Version Control', 'Collaboration']
  },
  {
    title: 'Cloud Computing with AWS',
    description: 'Introduction to cloud services and hands-on AWS deployment strategies.',
    type: 'Webinar' as const,
    mode: 'Online' as const,
    status: 'Past' as const,
    date: '2025-10-15',
    time: '19:00',
    duration: '90 minutes',
    tags: ['AWS', 'Cloud', 'DevOps', 'Infrastructure']
  }
]

export async function seedDemoEvents() {
  console.log('🌱 Seeding demo events...')
  
  try {
    // Check if events already exist
    const existingEvents = await EventsService.getAllEvents()
    if (existingEvents.length > 0) {
      console.log('⚠️ Events already exist. Skipping seeding.')
      return
    }

    // Create demo events
    for (const eventData of demoEvents) {
      try {
        const event = await EventsService.createEvent(eventData)
        console.log(`✅ Created event: ${event.title}`)
      } catch (error) {
        console.error(`❌ Failed to create event: ${eventData.title}`, error)
      }
    }

    console.log('🎉 Demo events seeding completed!')
  } catch (error) {
    console.error('💥 Error during seeding:', error)
  }
}

// Run this script directly for testing
if (typeof window === 'undefined') {
  // Server-side execution (Node.js)
  seedDemoEvents().catch(console.error)
}