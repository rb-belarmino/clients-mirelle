'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DatePickerInput from '@/app/components/DatePickerInput'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
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
  const [senhaIss, setSenhaIss] = useState('')
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
        setSenhaIss(data.senha_iss || '')
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
        senha_iss: senhaIss,
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
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="text-center text-amber-400">Carregando...</div>
      </main>
    )
  if (!client)
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="text-red-500">Cliente não encontrado.</div>
      </main>
    )

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-100 p-2 sm:p-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-8 rounded-xl shadow-xl max-w-md w-full space-y-4 mx-2 border border-amber-200"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-900">
          Editar Cliente
        </h2>
        <div>
          <label className="block mb-1 text-amber-700">Nome:</label>
          <Input
            name="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="bg-amber-50 text-amber-900"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">CPF:</label>
          <Input
            name="cpf"
            value={cpf}
            onChange={handleCpfChange}
            maxLength={14}
            className="bg-amber-50 text-amber-900"
            required
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">Senha Gov:</label>
          <Input
            name="senha_gov"
            value={senhaGov}
            onChange={e => setSenhaGov(e.target.value)}
            className="bg-amber-50 text-amber-900"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">Senha ISS:</label>
          <Input
            name="senha_iss"
            value={senhaIss}
            onChange={e => setSenhaIss(e.target.value)}
            className="bg-amber-50 text-amber-900"
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            Data de Nascimento:
          </label>
          <DatePickerInput
            name="data_nascimento"
            defaultValue={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">CNPJ:</label>
          <Input
            name="cnpj"
            value={cnpj}
            onChange={e => setCnpj(e.target.value)}
            className="bg-amber-50 text-amber-900"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            Código Simples Nacional:
          </label>
          <Input
            name="cod_simples"
            value={codSimples}
            onChange={e => setCodSimples(e.target.value)}
            className="bg-amber-50 text-amber-900"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto transition-transform duration-200 hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold w-full sm:w-auto transition-transform duration-200 hover:scale-105"
            onClick={() => router.push(`/clients/${id}`)}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  )
}
