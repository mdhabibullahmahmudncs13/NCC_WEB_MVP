"use client"
import { useState } from 'react'
import { databases } from '../lib/appwrite'

export default function AppwriteTest() {
  const [status, setStatus] = useState<string>('Not tested')
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    setStatus('Testing...')
    
    try {
      // Test database connection
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
      const response = await databases.listCollections(databaseId!)
      
      setStatus(`✅ Connected! Found ${response.collections.length} collections: ${response.collections.map(c => c.name).join(', ')}`)
    } catch (error: any) {
      console.error('Connection test failed:', error)
      setStatus(`❌ Failed: ${error.message || 'Unknown error'}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Appwrite Connection Test</h3>
      <div className="mb-2">
        <strong>Project ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'Not set'}
      </div>
      <div className="mb-2">
        <strong>Database ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'Not set'}
      </div>
      <div className="mb-2">
        <strong>Status:</strong> {status}
      </div>
      <button 
        onClick={testConnection}
        disabled={testing}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Test Connection'}
      </button>
    </div>
  )
}