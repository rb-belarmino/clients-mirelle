import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function ClientDetailPage({
  params
}: {
  params: { id: string }
}) {
  const client = await prisma.client.findUnique({
    where: { id: params.id }
  })

  if (!client) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="bg-slate-800 p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Cliente não encontrado</h2>
          <Link href="/" className="text-blue-400 hover:underline">
            Voltar
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Detalhes do Cliente</h2>
        <div className="mb-4">
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold w-1/3">
                  Nome:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">
                  {client.nome}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold">
                  CPF:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">{client.cpf}</td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold">
                  Senha Gov:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">
                  {client.senha_gov}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold">
                  Data de Nascimento:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">
                  {new Date(client.data_nascimento).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold">
                  CNPJ:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">
                  {client.cnpj}
                </td>
              </tr>
              <tr>
                <th className="text-right pr-4 text-slate-400 font-semibold">
                  Código Simples Nacional:
                </th>
                <td className="bg-slate-700 px-4 py-2 rounded">
                  {client.cod_simples}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Voltar
        </Link>
      </div>
    </main>
  )
}
