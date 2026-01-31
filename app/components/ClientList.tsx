'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'

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
          <li key={client.id}>
            <Card className="bg-white border border-amber-200 shadow-sm rounded-xl flex flex-col sm:flex-row justify-between items-center p-4">
              <div className="flex-1">
                <p className="font-semibold text-amber-900">
                  Nome: {client.nome}
                </p>
                <p className="text-sm text-amber-700">CPF: {client.cpf}</p>
                <span className="text-xs text-amber-600 block mt-1">
                  Registrado em:{' '}
                  {new Date(client.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                  onClick={() => handleView(client.id)}
                >
                  <Eye
                    className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                    size={16}
                  />
                  Visualizar
                </Button>
                {isAdmin && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => handleEdit(client.id)}
                    >
                      <Pencil
                        className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                        size={16}
                      />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1 transition-transform duration-200 hover:scale-105"
                      onClick={() => setConfirmId(client.id)}
                    >
                      <Trash2
                        className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                        size={16}
                      />
                      Excluir
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
      {confirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <Card className="bg-white p-6 rounded-xl shadow-lg text-center border border-amber-200 max-w-sm w-full">
            <p className="mb-4 text-amber-900 font-semibold">
              Tem certeza que deseja excluir este cliente?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="destructive"
                className="flex items-center gap-1"
                onClick={() => handleDelete(confirmId)}
              >
                <Trash2
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                  size={16}
                />
                Sim, excluir
              </Button>
              <Button
                variant="secondary"
                className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold"
                onClick={() => setConfirmId(null)}
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
