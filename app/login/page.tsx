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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/contabilidade.webp"
          alt="Contabilidade"
          className="w-full h-full object-cover object-center opacity-60"
        />
        {/* Overlay amarelado */}
        <div className="absolute inset-0 bg-amber-100/80" />
      </div>
      {/* Conteúdo central */}
      <div className="relative z-10 flex items-center justify-center w-full min-h-screen">
        <Card className="w-full max-w-md shadow-xl border-amber-200 bg-white/90 backdrop-blur-md">
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
    </div>
  )
}
