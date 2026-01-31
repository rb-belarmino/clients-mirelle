import Search from './components/Search'
import ProtectedRoute from './ProtectedRoute'
import AdminCreateButton from './components/AdminCreateButton'
import UsersButton from './components/UsersButton'
import LayoutChangeToast from './components/LayoutChangeToast'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

export default async function HomePage() {
  return (
    <ProtectedRoute>
      <LayoutChangeToast />
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
        <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-4 sm:p-8">
          <Card className="w-full max-w-4xl shadow-2xl border-amber-200 animate-in fade-in duration-700 bg-white/90 backdrop-blur-md">
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
      </div>
    </ProtectedRoute>
  )
}
