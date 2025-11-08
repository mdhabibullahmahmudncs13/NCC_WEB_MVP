type Props = {
  name: string
  role?: string
  photo?: string
}

export default function MemberCard({ name, role, photo }: Props){
  return (
    <div className="border rounded p-4 flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-3">
        {photo ? <img src={photo} alt={name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Photo</div>}
      </div>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </div>
  )
}
