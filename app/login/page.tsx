'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    setLoading(false)
    if (res?.ok) {
      router.push('/')
    } else {
      setError('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <Card className="w-full max-w-md shadow-xl border-amber-200">
        <CardHeader>
          <Logo className="mb-2 mx-auto" size={200} />
          <CardTitle className="text-center text-amber-900 text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
        </CardContent>
      </Card>
    </div>
  )
}
