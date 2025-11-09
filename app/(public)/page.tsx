"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { segmentsService } from '../../lib/services'

type Segment = {
  $id: string
  title: string
  description: string
  icon?: string
  photoId?: string
}

export default function Home(){
  const [segments, setSegments] = useState<Segment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSegments()
  }, [])

  const loadSegments = async () => {
    try {
      const response = await segmentsService.list()
      setSegments(response.documents as unknown as Segment[])
    } catch (error) {
      console.error('Error loading segments:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white text-gray-900 py-20 overflow-hidden">
        
        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <div className="w-30 h-30 md:w-32 md:h-32 bg-white rounded-full p-3  border-0">
              <img 
                src="/ncc-logo.svg" 
                alt="NITER Computer Club Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
            NITER Computer Club
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional Technology Community at National Institute of Textile Engineering & Research
          </p>
          <div className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-700">
            <p className="mb-6">
              Advancing technological excellence through innovative projects, industry partnerships, and professional development programs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/about"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
            <Link
              href="/members"
              className="bg-transparent border-2 border-gray-600 text-gray-700 hover:bg-gray-700 hover:text-white px-10 py-4 rounded-md font-medium transition-all duration-200"
            >
              Our panel
            </Link>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Core Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Professional development programs designed to advance technical competencies and career readiness
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-lg w-16 h-16 mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Technical Training
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Comprehensive training programs in modern software development methodologies and emerging technologies.
              </p>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Full-stack Web Development</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Mobile Application Development</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Machine Learning & Data Science</li>
                <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Cloud Architecture & DevOps</li>
              </ul>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-2 rounded-lg w-16 h-16 mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Industry Collaboration
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Strategic partnerships with leading technology companies providing real-world project experience and career opportunities.
              </p>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li className="flex items-start"><span className="text-green-600 mr-2">•</span>Enterprise Project Development</li>
                <li className="flex items-start"><span className="text-green-600 mr-2">•</span>Open Source Contributions</li>
                <li className="flex items-start"><span className="text-green-600 mr-2">•</span>Technology Innovation Labs</li>
                <li className="flex items-start"><span className="text-green-600 mr-2">•</span>Professional Mentorship</li>
              </ul>
            </div>
            
            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 rounded-lg w-16 h-16 mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Innovation & Research
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Competitive programming and research initiatives fostering innovation and academic excellence in computer science.
              </p>
              <ul className="text-gray-500 space-y-2 text-sm">
                <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Programming Competitions</li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Research & Development</li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Innovation Challenges</li>
                <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Technical Publications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Segments Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">Specialized Segments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Focused areas of expertise where our members contribute to advancing technology and innovation
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          ) : segments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-3">Segments in Development</h3>
              <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                Our specialized focus areas are currently being structured. We'll announce our segments soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {segments.map(segment => (
                <div key={segment.$id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
                  {/* Photo Section */}
                  {segment.photoId && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={segmentsService.getPhotoUrl(segment.photoId).href} 
                        alt={segment.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      {segment.icon && (
                        <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                          <span className="text-2xl">
                            {segment.icon}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {segment.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {segment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Professional Call to Action */}
      <section className="bg-white text-gray-900 py-20 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Join Our Professional Community
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Advance your career in technology through professional development, industry connections, and collaborative innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/about"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-lg"
            >
              Learn About Membership
            </Link>
            <Link
              href="/achievements"
              className="bg-transparent border border-gray-600 text-gray-700 hover:bg-gray-700 hover:text-white px-8 py-3 rounded-md font-medium transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-500 text-sm">
              For inquiries: <a href="mailto:info@nitercc.edu" className="text-blue-600 hover:text-blue-700">info@nitercc.edu</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
