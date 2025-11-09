"use client"
import { useState } from 'react'
import { databases, storage } from '../lib/appwrite'

export default function DatabaseDiagnostic() {
  const [status, setStatus] = useState<string>('Not tested')
  const [testing, setTesting] = useState(false)

  const runDiagnostic = async () => {
    setTesting(true)
    setStatus('Running diagnostic...')
    
    const results: string[] = []
    
    try {
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
      
      // Test required collections
      const requiredCollections = ['segments', 'members', 'achievements', 'gallery']
      const requiredBuckets = ['member-photos', 'achievement-images', 'gallery-photos', 'event-photos', 'segment-photos']
      
      for (const collectionId of requiredCollections) {
        try {
          await databases.listDocuments(databaseId, collectionId)
          results.push(`✅ Collection '${collectionId}' exists`)
        } catch (error) {
          results.push(`❌ Collection '${collectionId}' missing or inaccessible`)
        }
      }
      
      for (const bucketId of requiredBuckets) {
        try {
          await storage.listFiles(bucketId)
          results.push(`✅ Bucket '${bucketId}' exists`)
        } catch (error) {
          results.push(`❌ Bucket '${bucketId}' missing or inaccessible`)
        }
      }
      
      setStatus(results.join('\n'))
      
    } catch (error: any) {
      console.error('Diagnostic failed:', error)
      setStatus(`❌ Diagnostic failed: ${error.message || 'Unknown error'}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Database & Storage Diagnostic</h3>
      <div className="mb-4">
        <strong>Project ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'Not set'}<br/>
        <strong>Database ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'Not set'}
      </div>
      <div className="mb-4 font-mono text-sm whitespace-pre-line bg-white p-3 rounded border max-h-64 overflow-y-auto">
        {status}
      </div>
      <button 
        onClick={runDiagnostic}
        disabled={testing}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 mr-2"
      >
        {testing ? 'Running...' : 'Run Diagnostic'}
      </button>
      <a 
        href="/SETUP_COLLECTIONS.md" 
        target="_blank"
        className="px-4 py-2 bg-green-500 text-white rounded inline-block"
      >
        View Setup Guide
      </a>
    </div>
  )
}