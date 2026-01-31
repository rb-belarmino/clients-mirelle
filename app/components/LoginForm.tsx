'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  error?: string
  loading?: boolean
}

export default function LoginForm({
  onSubmit,
  error,
  loading
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-amber-700 mb-1">E-mail</label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="bg-amber-50 text-amber-900"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label className="block text-amber-700 mb-1">Senha</label>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="bg-amber-50 text-amber-900"
          placeholder="Sua senha"
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <Button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
        size="lg"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
