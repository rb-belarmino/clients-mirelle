'use client'

import { useState, useEffect } from 'react'
import ClientList from './ClientList'
import { Input } from '@/app/components/ui/input'
import { Search as SearchIcon } from 'lucide-react'

type Client = {
  id: string
  nome: string
  cpf: string
  createdAt: string
}

export default function Search() {
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      const res = await fetch(`/api/clients?nome=${encodeURIComponent(search)}`)
      const data = await res.json()
      setClients(data)
      setLoading(false)
    }
    fetchClients()
  }, [search])

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl mt-8 max-w-4xl w-full border border-amber-200">
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-amber-50 text-amber-900 pr-10"
        />
        <SearchIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none"
          size={20}
        />
      </div>
      <h2 className="text-2xl font-bold text-amber-900 text-center mb-6">
        Clientes Cadastrados
      </h2>
      {loading ? (
        <p className="text-amber-400 text-center">Carregando...</p>
      ) : clients.length === 0 ? (
        <p className="text-amber-400 text-center">Nenhum cliente encontrado.</p>
      ) : (
        <ClientList clients={clients} />
      )}
    </div>
  )
}
