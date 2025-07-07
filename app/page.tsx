import prisma from '@/lib/prisma'
import Search from './components/Search'

export default async function HomePage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  return (
    <main className="min-h-screen bg-amber-200 text-amber-900 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-amber-900">
          Sistema de Clientes
        </h1>
        <div className="w-full flex justify-end mb-6">
          <a
            href="/clients/new"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Cadastrar novo
          </a>
        </div>
        <Search />
      </div>
    </main>
  )
}

export const revalidate = 0
