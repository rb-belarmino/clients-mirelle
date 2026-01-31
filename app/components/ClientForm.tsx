'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

const ClientForm = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senhaGov, setSenhaGov] = useState('')
  const [senhaIss, setSenhaIss] = useState('')
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
          senha_iss: senhaIss,
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
        setSenhaIss('')
        setDataNascimento('')
        setCnpj('')
        setCodSimples('')
        router.refresh()
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
    <div className="max-w-md mx-auto p-4 bg-white shadow-xl rounded-xl mt-8 border border-amber-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-amber-900">
        Cadastrar Novo Cliente
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="password"
          placeholder="Senha Gov"
          value={senhaGov}
          onChange={e => setSenhaGov(e.target.value)}
          required
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="password"
          placeholder="Senha ISS"
          value={senhaIss}
          onChange={e => setSenhaIss(e.target.value)}
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="date"
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChange={e => setDataNascimento(e.target.value)}
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={e => setCnpj(e.target.value)}
          className="bg-amber-50 text-amber-900"
        />
        <Input
          type="number"
          placeholder="Código Simples Nacional"
          value={codSimples}
          onChange={e => setCodSimples(e.target.value)}
          className="bg-amber-50 text-amber-900"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-transform duration-200 hover:scale-105"
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </div>
  )
}

export default ClientForm
