import prisma from '@/lib/prisma'
import Search from './components/Search'
import ClientList from './components/ClientList'

export default async function HomePage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight">
          Sistema de Clientes
        </h1>
        <Search />
      </div>
    </main>
  )
}

export const revalidate = 0
