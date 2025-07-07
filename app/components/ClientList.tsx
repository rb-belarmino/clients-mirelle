'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

type SessionUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

type Client = {
  id: string
  nome: string
  cpf: string
  createdAt: string
}

export default function ClientList({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const { data: session } = useSession() as {
    data: (Session & { user?: SessionUser }) | null
  }
  const isAdmin = session?.user?.role === 'admin'
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [clientList, setClientList] = useState(clients)

  const handleView = (id: string) => router.push(`/clients/${id}`)
  const handleEdit = (id: string) => router.push(`/clients/${id}/edit`)
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Cliente desativado com sucesso!')
      setClientList(clientList.filter(c => c.id !== id))
    } else {
      toast.error('Erro ao desativar cliente.')
    }
    setConfirmId(null)
  }

  return (
    <>
      <ul className="space-y-4">
        {clientList.map(client => (
          <li
            key={client.id}
            className="bg-amber-100 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-amber-900">
                Nome: {client.nome}
              </p>
              <p className="text-sm text-amber-700">CPF: {client.cpf}</p>
            </div>
            <span className="text-xs text-amber-600 mr-4">
              Registrado em: {new Date(client.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              <button
                className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs"
                onClick={() => handleView(client.id)}
              >
                Visualizar
              </button>
              {isAdmin && (
                <>
                  <button
                    className="bg-amber-400 hover:bg-amber-500 text-amber-900 px-3 py-1 rounded text-xs font-semibold"
                    onClick={() => handleEdit(client.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    onClick={() => setConfirmId(client.id)}
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {confirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-amber-900">
              Tem certeza que deseja excluir este cliente?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(confirmId)}
              >
                Sim, excluir
              </button>
              <button
                className="bg-amber-200 text-amber-900 px-4 py-2 rounded"
                onClick={() => setConfirmId(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
