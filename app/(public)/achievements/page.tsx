"use client"
import { useState, useEffect } from 'react'
import AchievementCard from '../../../components/AchievementCard'
import { achievementsService } from '../../../lib/services'

type Achievement = {
  $id: string
  title: string
  date: string
  description: string
  imageId?: string
  category?: string
}

export default function AchievementsPage(){
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      const response = await achievementsService.list()
      setAchievements(response.documents)
    } catch (error) {
      console.error('Error loading achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No achievements added yet.
          </div>
        ) : (
          achievements.map(achievement => (
            <AchievementCard 
              key={achievement.$id} 
              title={achievement.title} 
              date={formatDate(achievement.date)} 
              description={achievement.description}
              imageId={achievement.imageId}
            />
          ))
        )}
      </div>
    </div>
  )
}
