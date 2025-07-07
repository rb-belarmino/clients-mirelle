'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const ClientForm = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senhaGov, setSenhaGov] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [codSimples, setCodSimples] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          cpf,
          senha_gov: senhaGov,
          data_nascimento: dataNascimento
            ? new Date(dataNascimento).toISOString()
            : undefined,
          cnpj,
          cod_simples: codSimples
        })
      })

      const data = await response.json()

      if (response.ok) {
        setNome('')
        setCpf('')
        setSenhaGov('')
        setDataNascimento('')
        setCnpj('')
        setCodSimples('')
        router.refresh()
        console.log('Client created:', data)
        router.push('/')
      } else {
        setError(data.message || 'Failed to create client')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-amber-50 shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-amber-900">Create Client</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <input
          type="password"
          placeholder="Senha Gov"
          value={senhaGov}
          onChange={e => setSenhaGov(e.target.value)}
          required
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChange={e => setDataNascimento(e.target.value)}
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={e => setCnpj(e.target.value)}
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <input
          type="number"
          placeholder="Código Simples Nacional"
          value={codSimples}
          onChange={e => setCodSimples(e.target.value)}
          className="w-full p-2 border border-amber-300 rounded focus:border-amber-500 focus:ring-amber-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-2 text-white ${
            isLoading ? 'bg-amber-300' : 'bg-amber-600 hover:bg-amber-700'
          } rounded`}
        >
          {isLoading ? 'Creating...' : 'Create Client'}
        </button>
      </form>
    </div>
  )
}

export default ClientForm
