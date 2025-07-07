import prisma from '@/lib/prisma'
import Search from './components/Search'
import ProtectedRoute from './ProtectedRoute'
import AdminCreateButton from './components/AdminCreateButton'
import AdminCreateUserButton from './components/AdminCreateUserButton'

export default async function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-amber-200 text-amber-900 flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 tracking-tight text-amber-900 text-center">
            Sistema de Clientes
          </h1>
          <div className="w-full flex flex-col sm:flex-row sm:justify-end mb-6 gap-2">
            <AdminCreateButton />
            <AdminCreateUserButton />
          </div>
          <Search />
        </div>
      </main>
    </ProtectedRoute>
  )
}
