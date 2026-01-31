'use client'

import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { UserPlus } from 'lucide-react'

export default function AdminCreateButton() {
  const { data: session } = useSession() as {
    data: (Session & { user?: { role?: string | null } }) | null
  }
  const isAdmin = session?.user?.role === 'admin'

  if (!isAdmin) return null

  return (
    <a
      href="/clients/new"
      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded transition w-full sm:w-auto text-center flex items-center gap-2"
    >
      <UserPlus
        className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
        size={20}
      />
      Cadastrar novo
    </a>
  )
}
