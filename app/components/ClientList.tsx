'use client'

import { useRouter } from 'next/navigation'

type Client = {
  id: string
  nome: string
  cpf: string
  createdAt: string
}

export default function ClientList({ clients }: { clients: Client[] }) {
  const router = useRouter()

  const handleView = (id: string) => router.push(`/clients/${id}`)
  const handleEdit = (id: string) => router.push(`/clients/${id}/edit`)
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' })
      router.refresh()
    }
  }

  return (
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
          <span className="text-xs text-slate-500 mr-4">
            Registrado em: {new Date(client.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
              onClick={() => handleView(client.id)}
            >
              Visualizar
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
              onClick={() => handleEdit(client.id)}
            >
              Editar
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
              onClick={() => handleDelete(client.id)}
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
