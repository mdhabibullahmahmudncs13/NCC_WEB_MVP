"use client"
import { useState, useEffect } from 'react'
import MemberCard from '../../../components/MemberCard'
import { membersService } from '../../../lib/services'

type Member = {
  $id: string
  name: string
  role: string
  photoId?: string
  email?: string
  bio?: string
  order: number
}

export default function MembersPage(){
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await membersService.list()
      setMembers(response.documents)
    } catch (error) {
      console.error('Error loading members:', error)
    } finally {
      setLoading(false)
    }
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
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {members.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No members added yet.
          </div>
        ) : (
          members.map(member => (
            <MemberCard 
              key={member.$id} 
              name={member.name} 
              role={member.role}
              photoId={member.photoId}
            />
          ))
        )}
      </div>
    </div>
  )
}
