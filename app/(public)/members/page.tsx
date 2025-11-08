import MemberCard from '../../../components/MemberCard'

const SAMPLE_MEMBERS = [
  { id: '1', name: 'John Doe', role: 'President' },
  { id: '2', name: 'Jane Smith', role: 'Vice President' },
  { id: '3', name: 'Ali Khan', role: 'Lead Developer' },
]

export default function MembersPage(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SAMPLE_MEMBERS.map(m => (
          <MemberCard key={m.id} name={m.name} role={m.role} />
        ))}
      </div>
    </div>
  )
}
