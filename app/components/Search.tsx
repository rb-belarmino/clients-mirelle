'use client'

import { useState, useEffect } from 'react'

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
    <div className="p-6 bg-slate-800 rounded-xl shadow-lg mt-8 max-w-4xl w-full">
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
      />
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Clientes Cadastrados
      </h2>
      {loading ? (
        <p className="text-slate-400 text-center">Carregando...</p>
      ) : clients.length === 0 ? (
        <p className="text-slate-400 text-center">Nenhum cliente encontrado.</p>
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
