'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { ArrowLeft } from 'lucide-react'

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
      <main className="min-h-screen flex items-center justify-center bg-amber-50">
        <Card className="max-w-md w-full shadow-xl border-amber-100 bg-white rounded-2xl">
          <CardContent>
            <div className="text-center text-amber-900 font-semibold py-8">
              Carregando...
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!client) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-amber-50">
        <Card className="max-w-md w-full shadow-xl border-amber-100 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-amber-900 text-2xl font-bold mb-2">
              Cliente não encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              variant="secondary"
              className="w-full mt-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold flex items-center gap-2"
            >
              <Link href="/">
                <ArrowLeft size={18} /> Voltar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-50 p-2 sm:p-0">
      <Card className="max-w-lg w-full mx-2 shadow-2xl border-amber-100 bg-white rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-amber-900 text-3xl font-extrabold mb-4 tracking-tight">
            Detalhes do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <DetailItem label="Nome" value={client.nome} />
            <DetailItem label="CPF" value={client.cpf} />
            <DetailItem label="Senha Gov" value={client.senha_gov} />
            <DetailItem label="Senha ISS" value={client.senha_iss} />
            <DetailItem
              label="Data de Nascimento"
              value={
                client.data_nascimento
                  ? new Date(client.data_nascimento).toLocaleDateString()
                  : ''
              }
            />
            <DetailItem label="CNPJ" value={client.cnpj} />
            <DetailItem
              label="Código Simples Nacional"
              value={client.cod_simples}
            />
          </div>
          <Button
            asChild
            variant="secondary"
            className="w-full mt-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold flex items-center gap-2"
          >
            <Link href="/">
              <ArrowLeft size={18} /> Voltar
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <span className="text-amber-700 font-semibold w-48 sm:text-right sm:pr-4">
        {label}:
      </span>
      <span className="bg-amber-50 px-4 py-2 rounded text-amber-900 flex-1 mt-1 sm:mt-0">
        {value}
      </span>
    </div>
  )
}
