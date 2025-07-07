'use client'

import { signOut, useSession } from 'next-auth/react'

export default function LogoutButton() {
  const { data: session } = useSession()
  if (!session) return null
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-4"
    >
      Sair
    </button>
  )
}
