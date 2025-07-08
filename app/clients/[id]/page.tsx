'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ClientDetailPage() {
  const params = useParams()
  const { id } = params as { id: string }
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClient() {
      setLoading(true)
      const res = await fetch(`/api/clients/${id}`)
      if (res.ok) {
        const data = await res.json()
        setClient(data)
      }
      setLoading(false)
    }
    fetchClient()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white">
        <div className="bg-amber-800 p-8 rounded shadow">Carregando...</div>
      </main>
    )
  }

  if (!client) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white">
        <div className="bg-amber-800 p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Cliente não encontrado</h2>
          <Link href="/" className="text-amber-200 hover:underline">
            Voltar
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white p-2 sm:p-0">
      <div className="bg-amber-800 p-4 sm:p-8 rounded shadow max-w-md w-full mx-2">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Detalhes do Cliente
        </h2>
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-sm sm:text-base">
            <tbody>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold w-1/3">
                  Nome:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">
                  {client.nome}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold">
                  CPF:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">{client.cpf}</td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold">
                  Senha Gov:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">
                  {client.senha_gov}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold">
                  Data de Nascimento:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">
                  {client.data_nascimento
                    ? new Date(client.data_nascimento).toLocaleDateString()
                    : ''}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold">
                  CNPJ:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">
                  {client.cnpj}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-amber-300 font-semibold">
                  Código Simples Nacional:
                </th>
                <td className="bg-amber-700 px-4 py-2 rounded">
                  {client.cod_simples}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white w-full sm:w-auto text-center"
        >
          Voltar
        </Link>
      </div>
    </main>
  )
}
