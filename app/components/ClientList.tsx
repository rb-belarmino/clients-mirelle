'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Eye, Pencil, Trash2, Search as SearchIcon } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'

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
  cnpj: string
  createdAt: string
}

const PAGE_SIZE = 10

export default function ClientList({ search }: { search: string }) {
  const router = useRouter()
  const { data: session } = useSession() as {
    data: (Session & { user?: SessionUser }) | null
  }
  const isAdmin = session?.user?.role === 'admin'
  const [clients, setClients] = useState<Client[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(
      `/api/clients?nome=${encodeURIComponent(search)}&page=${page}&pageSize=${PAGE_SIZE}`
    )
      .then(res => res.json())
      .then(data => {
        setClients(data.clients)
        setTotal(data.total)
      })
      .catch(() => toast.error('Erro ao carregar clientes'))
      .finally(() => setLoading(false))
  }, [page, search])

  const handleView = (id: string) => router.push(`/clients/${id}`)
  const handleEdit = (id: string) => router.push(`/clients/${id}/edit`)
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Cliente desativado com sucesso!')
      setClients(clients.filter(c => c.id !== id))
      setTotal(total - 1)
    } else {
      toast.error('Erro ao desativar cliente.')
    }
    setConfirmId(null)
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // Reset page when search changes
  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <>
      <div className="mb-4 flex items-center gap-2"></div>
      {loading ? (
        <div className="text-center text-amber-400">Carregando...</div>
      ) : (
        <ul className="space-y-4">
          {clients.map(client => (
            <li key={client.id}>
              <Card className="bg-white border border-amber-200 shadow-sm rounded-xl flex flex-col sm:flex-row justify-between items-center p-4">
                <div className="flex-1">
                  <p className="font-semibold text-amber-900">
                    Nome: {client.nome}
                  </p>
                  <p className="text-sm text-amber-700">
                    {client.cnpj && client.cpf ? (
                      <>
                        CNPJ: {client.cnpj} <br />
                        CPF: {client.cpf}
                      </>
                    ) : client.cnpj ? (
                      `CNPJ: ${client.cnpj}`
                    ) : client.cpf ? (
                      `CPF: ${client.cpf}`
                    ) : (
                      ''
                    )}
                  </p>
                  <span className="text-xs text-amber-600 block mt-1">
                    Registrado em:{' '}
                    {new Date(client.createdAt).toLocaleDateString('pt-BR')}
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
      )}
      {/* Paginação */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </Button>
        <span className="text-amber-900 font-semibold">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </Button>
      </div>
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
