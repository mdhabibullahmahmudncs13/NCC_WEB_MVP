"use client"

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 tracking-tight">
              About NITER Computer Club
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Fostering innovation, collaboration, and excellence in technology education 
              at Northern International University of Technology
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To create a dynamic learning environment where students can explore, 
                  innovate, and excel in computer science and technology through 
                  hands-on projects and collaborative learning.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To be the premier technology community at NITER, producing skilled 
                  developers and innovative thinkers who contribute meaningfully to 
                  the global technology landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">What We Do</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Training</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive training programs in modern software development 
                  and emerging technologies.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Project Development</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Real-world project experience through industry partnerships 
                  and open source contributions.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Competitions</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Programming contests, hackathons, and innovation challenges 
                  to test and showcase skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you're a beginner or an experienced developer, there's a place for you in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/members"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Meet Our Members
              </a>
              <a
                href="mailto:info@nitercc.edu"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}