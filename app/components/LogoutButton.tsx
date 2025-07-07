'use client'

import { signOut, useSession } from 'next-auth/react'

type SessionUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

export default function LogoutButton() {
  const { data: session } = useSession() as {
    data: { user?: SessionUser } | null
  }
  if (!session) return null
  const userName = session.user?.name || session.user?.email || 'Usuário'
  const userRole = session.user?.role === 'admin' ? 'Administrador' : 'Usuário'
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-amber-900 font-medium text-sm truncate max-w-[160px]"
        title={userName}
      >
        {userName}
      </span>
      <span
        className={`text-xs px-2 py-1 rounded font-semibold ${
          session.user?.role === 'admin'
            ? 'bg-amber-600 text-white'
            : 'bg-amber-100 text-amber-700'
        } ml-1`}
      >
        {userRole}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
      >
        Sair
      </button>
    </div>
  )
}
