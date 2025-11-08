type Props = {
  title: string
  date?: string
  description?: string
}

export default function AchievementCard({ title, date, description }: Props){
  return (
    <div className="border rounded p-4">
      <div className="font-semibold">{title}</div>
      {date && <div className="text-sm text-gray-500">{date}</div>}
      {description && <p className="mt-2 text-sm text-gray-700">{description}</p>}
    </div>
  )
}
