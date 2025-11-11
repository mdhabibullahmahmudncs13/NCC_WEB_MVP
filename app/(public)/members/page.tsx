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
      setMembers(response.documents as unknown as Member[])
    } catch (error) {
      console.error('Error loading members:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 sm:mb-6">Our Panel</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Meet the dedicated members who drive innovation and excellence in our community
          </p>
        </div>

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-3">No Members Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
              Our team profiles are being updated. Check back soon to meet our amazing members!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {members.map(member => (
              <MemberCard 
                key={member.$id} 
                name={member.name} 
                role={member.role}
                photoId={member.photoId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
