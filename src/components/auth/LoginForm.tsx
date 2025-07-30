'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import pb from '@/lib/pocketbase'

type LoginFormState = {
  email: string
  password: string
  error: string | null
  loading: boolean
}

const LoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    error: null,
    loading: false,
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, error: null })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setForm((prev) => ({ ...prev, loading: true, error: null }))

    try {
      await pb.collection('users').authWithPassword(form.email, form.password)
      router.push('/dashboard') // success: go to dashboard
    } catch (err: any) {
      console.error('Login error:', err)
      setForm((prev) => ({
        ...prev,
        error: 'Invalid email or password',
        loading: false,
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {form.error && (
        <div className="text-red-600 text-sm">{form.error}</div>
      )}

      <button
        type="submit"
        disabled={form.loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        {form.loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginForm