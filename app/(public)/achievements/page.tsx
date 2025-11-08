import AchievementCard from '../../../components/AchievementCard'

const SAMPLE = [
  { id: 'a1', title: 'Won National Hackathon 2024', date: '2024-10-15', description: 'Our team secured first place.' },
  { id: 'a2', title: 'Inter-college Coding Cup', date: '2023-11-20', description: 'Runner-up in regional contest.' }
]

export default function AchievementsPage(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SAMPLE.map(s => (
          <AchievementCard key={s.id} title={s.title} date={s.date} description={s.description} />
        ))}
      </div>
    </div>
  )
}
