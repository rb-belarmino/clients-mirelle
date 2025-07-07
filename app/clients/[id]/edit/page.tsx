import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function EditClientPage({
  params
}: {
  params: { id: string }
}) {
  const client = await prisma.client.findUnique({ where: { id: params.id } })

  if (!client) {
    return <div className="text-red-500">Cliente não encontrado.</div>
  }

  async function updateClient(formData: FormData) {
    'use server'
    await prisma.client.update({
      where: { id: params.id },
      data: {
        nome: formData.get('nome') as string,
        cpf: formData.get('cpf') as string,
        senha_gov: formData.get('senha_gov') as string,
        data_nascimento: new Date(formData.get('data_nascimento') as string),
        cnpj: formData.get('cnpj') as string,
        cod_simples: Number(formData.get('cod_simples'))
      }
    })
    redirect(`/clients/${params.id}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        action={updateClient}
        className="bg-slate-800 p-8 rounded shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
        <div>
          <label className="block mb-1">Nome:</label>
          <input
            name="nome"
            defaultValue={client.nome}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CPF:</label>
          <input
            name="cpf"
            defaultValue={client.cpf}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Senha Gov:</label>
          <input
            name="senha_gov"
            defaultValue={client.senha_gov}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            defaultValue={
              client.data_nascimento
                ? client.data_nascimento.toISOString().split('T')[0]
                : ''
            }
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CNPJ:</label>
          <input
            name="cnpj"
            defaultValue={client.cnpj ?? ''}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Código Simples Nacional:</label>
          <input
            name="cod_simples"
            defaultValue={client.cod_simples ?? ''}
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Salvar
          </button>
          <Link
            href={`/`}
            className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded text-white"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  )
}
