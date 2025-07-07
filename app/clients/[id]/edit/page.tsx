import prisma from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DatePickerInput from '@/app/components/DatePickerInput'
import { encrypt, decrypt } from '@/utils/crypto'

export default async function EditClientPage({
  params
}: {
  params: { id: string }
}) {
  const client = await prisma.client.findUnique({ where: { id: params.id } })

  if (!client) {
    return <div className="text-red-500">Cliente não encontrado.</div>
  }

  client.senha_gov = decrypt(client.senha_gov)

  async function updateClient(formData: FormData) {
    'use server'
    const senha_gov = formData.get('senha_gov') as string
    const senhaCriptografada = encrypt(senha_gov)
    await prisma.client.update({
      where: { id: params.id },
      data: {
        nome: formData.get('nome') as string,
        cpf: formData.get('cpf') as string,
        senha_gov: senhaCriptografada,
        data_nascimento: new Date(formData.get('data_nascimento') as string),
        cnpj: formData.get('cnpj') as string,
        cod_simples: formData.get('cod_simples') as string
      }
    })
    redirect(`/clients/${params.id}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white p-2 sm:p-0">
      <form
        action={updateClient}
        className="bg-amber-800 p-4 sm:p-8 rounded shadow max-w-md w-full space-y-4 mx-2"
      >
        <h2 className="text-2xl font-bold mb-4 text-amber-100 text-center">
          Editar Cliente
        </h2>
        <div>
          <label className="block mb-1 text-amber-200">Nome:</label>
          <input
            name="nome"
            defaultValue={client.nome}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">CPF:</label>
          <input
            name="cpf"
            defaultValue={client.cpf}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">Senha Gov:</label>
          <input
            name="senha_gov"
            defaultValue={client.senha_gov}
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
            defaultValue={
              client.data_nascimento
                ? client.data_nascimento.toISOString().split('T')[0]
                : ''
            }
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-200">CNPJ:</label>
          <input
            name="cnpj"
            defaultValue={client.cnpj ?? ''}
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
            defaultValue={client.cod_simples ?? ''}
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-white w-full sm:w-auto"
          >
            Salvar
          </button>
          <Link
            href={`/`}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-amber-900 font-semibold w-full sm:w-auto text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  )
}
