import Search from './components/Search'
import ProtectedRoute from './ProtectedRoute'
import AdminCreateButton from './components/AdminCreateButton'
import UsersButton from './components/UsersButton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

export default async function HomePage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-amber-100 flex flex-col items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-4xl shadow-2xl border-amber-200 animate-in fade-in duration-700">
          <CardHeader>
            <CardTitle className="text-center text-amber-900 text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
              Sistema de Clientes
            </CardTitle>
            <div className="w-full flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
              <AdminCreateButton />
              <UsersButton />
            </div>
          </CardHeader>
          <CardContent>
            <Search />
          </CardContent>
        </Card>
      </main>
    </ProtectedRoute>
  )
}
