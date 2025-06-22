import prisma from '@/lib/prisma'
import Search from './components/Search'

async function ClientList() {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="p-6 bg-slate-800 rounded-xl shadow-lg mt-8 max-w-4xl w-full">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Clientes Cadastrados
      </h2>
      {clients.length === 0 ? (
        <p className="text-slate-400 text-center">
          Nenhum cliente cadastrado ainda.
        </p>
      ) : (
        <ul className="space-y-4">
          {clients.map(client => (
            <li
              key={client.id}
              className="bg-slate-700 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-white">Nome: {client.nome}</p>
                <p className="text-sm text-slate-300">CPF: {client.cpf}</p>
              </div>
              <span className="text-xs text-slate-500">
                Registrado em: {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function HomePage() {
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
