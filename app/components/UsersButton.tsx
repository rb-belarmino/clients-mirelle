'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type SessionUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

export default function UsersButton() {
  const router = useRouter()
  const { data: session } = useSession() as {
    data: { user?: SessionUser } | null
  }
  if (!session || session.user?.role !== 'admin') return null
  return (
    <button
      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded transition w-full sm:w-auto text-center"
      onClick={() => router.push('/users')}
    >
      Usuários
    </button>
  )
}
