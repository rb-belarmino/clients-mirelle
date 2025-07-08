'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DatePickerInput from '@/app/components/DatePickerInput'
import toast from 'react-hot-toast'

export default function EditClientPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }

  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState<any>(null)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senhaGov, setSenhaGov] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [codSimples, setCodSimples] = useState('')

  useEffect(() => {
    async function fetchClient() {
      setLoading(true)
      const res = await fetch(`/api/clients/${id}`)
      if (res.ok) {
        const data = await res.json()
        setClient(data)
        setNome(data.nome || '')
        setCpf(data.cpf || '')
        setSenhaGov(data.senha_gov || '')
        setDataNascimento(
          data.data_nascimento ? data.data_nascimento.split('T')[0] : ''
        )
        setCnpj(data.cnpj || '')
        setCodSimples(data.cod_simples || '')
      }
      setLoading(false)
    }
    fetchClient()
  }, [id])

  function handleCpfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '')
    setCpf(value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        cpf: cpf.replace(/\D/g, ''),
        senha_gov: senhaGov,
        data_nascimento: dataNascimento,
        cnpj,
        cod_simples: codSimples
      })
    })
    setLoading(false)
    if (res.ok) {
      toast.success('Cliente atualizado com sucesso!')
      router.push(`/clients/${id}`)
    } else {
      toast.error('Erro ao atualizar cliente.')
    }
  }

  if (loading)
    return <div className="text-center text-amber-200">Carregando...</div>
  if (!client)
    return <div className="text-red-500">Cliente não encontrado.</div>

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white p-2 sm:p-0">
      <form
        onSubmit={handleSubmit}
        className="bg-amber-800 p-4 sm:p-8 rounded shadow max-w-md w-full space-y-4 mx-2"
      >
        <h2 className="text-2xl font-bold mb-4 text-amber-100 text-center">
          Editar Cliente
        </h2>
        <div>
          <label className="block mb-1 text-amber-200">Nome:</label>
          <input
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">CPF:</label>
          <input
            name="cpf"
            value={cpf}
            onChange={handleCpfChange}
            maxLength={14}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">Senha Gov:</label>
          <input
            name="senha_gov"
            value={senhaGov}
            onChange={e => setSenhaGov(e.target.value)}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">
            Data de Nascimento:
          </label>
          <DatePickerInput
            name="data_nascimento"
            defaultValue={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">CNPJ:</label>
          <input
            name="cnpj"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">
            Código Simples Nacional:
          </label>
          <input
            name="cod_simples"
            value={codSimples}
            onChange={e => setCodSimples(e.target.value)}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-white w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/clients/${id}`)}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-amber-900 font-semibold w-full sm:w-auto text-center"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  )
}
