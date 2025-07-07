'use client'

import { useState, useEffect } from 'react'
import ClientList from './ClientList'

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
    <div className="p-6 bg-amber-50 rounded-xl shadow-lg mt-8 max-w-4xl w-full">
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full p-2 rounded bg-amber-100 text-amber-900 border border-amber-300 focus:border-amber-500 focus:ring-amber-500"
      />
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
