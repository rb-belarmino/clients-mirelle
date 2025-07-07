import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import DatePickerInput from '@/app/components/DatePickerInput'

export default function NewClientPage() {
  async function createClient(formData: FormData) {
    'use server'
    const senha_gov = formData.get('senha_gov') as string
    const senha_gov_hash = await bcrypt.hash(senha_gov, 10)

    await prisma.client.create({
      data: {
        nome: formData.get('nome') as string,
        cpf: formData.get('cpf') as string,
        senha_gov: senha_gov_hash,
        data_nascimento: new Date(formData.get('data_nascimento') as string),
        cnpj: formData.get('cnpj') as string,
        cod_simples: BigInt(formData.get('cod_simples') as string)
      }
    })
    redirect('/')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        action={createClient}
        className="bg-slate-800 p-8 rounded shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Cliente</h2>
        <div>
          <label className="block mb-1">Nome:</label>
          <input
            name="nome"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CPF:</label>
          <input
            name="cpf"
            type="text"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Senha Gov:</label>
          <input
            name="senha_gov"
            type="password"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Data de Nascimento:</label>
          <DatePickerInput
            name="data_nascimento"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CNPJ:</label>
          <input
            name="cnpj"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Código Simples Nacional:</label>
          <input
            name="cod_simples"
            className="w-full px-3 py-2 rounded bg-slate-700 text-white"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Salvar
          </button>
          <a
            href="/"
            className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded text-white"
          >
            Cancelar
          </a>
        </div>
      </form>
    </main>
  )
}
