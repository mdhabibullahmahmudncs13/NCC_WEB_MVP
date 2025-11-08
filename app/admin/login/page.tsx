"use client"
import { useState } from 'react'
import Button from '../../../components/ui/Button'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate Appwrite auth
    alert('Login not implemented yet — integrate Appwrite Auth')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" type="email" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" type="password" required />
        </div>
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  )
}