'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (res?.ok) {
      router.push('/')
    } else {
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-amber-900 text-center">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-amber-700 mb-2">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-amber-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-amber-700 mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-amber-400"
            required
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
