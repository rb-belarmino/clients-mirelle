'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'

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
    <div className="flex items-center gap-1">
      <span
        className="text-amber-900 font-medium text-xs sm:text-sm truncate max-w-[120px] px-2 py-1"
        title={userName}
      >
        {userName}
      </span>
      <Badge
        className={
          session.user?.role === 'admin'
            ? 'bg-amber-600 text-white px-2 py-1 text-xs font-semibold'
            : 'bg-amber-100 text-amber-700 px-2 py-1 text-xs font-semibold'
        }
      >
        {userRole}
      </Badge>
      <Button
        variant="destructive"
        size="sm"
        className="ml-2 flex items-center gap-1"
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        <LogOut
          className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
          size={16}
        />
        Sair
      </Button>
    </div>
  )
}
