'use server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { encrypt, decrypt } from '@/utils/crypto'

export async function createClient(formData: FormData) {
  const senha_gov = formData.get('senha_gov') as string
  const senhaCriptografada = encrypt(senha_gov)

  const dataNascimentoRaw = formData.get('data_nascimento') as string
  let dataNascimento: Date | undefined = undefined
  if (dataNascimentoRaw) {
    const parsedDate = new Date(dataNascimentoRaw)
    if (!isNaN(parsedDate.getTime())) {
      dataNascimento = parsedDate
    }
  }

  await prisma.client.create({
    data: {
      nome: formData.get('nome') as string,
      cpf: formData.get('cpf') as string,
      senha_gov: senhaCriptografada,
      data_nascimento: dataNascimento,
      cnpj: formData.get('cnpj') as string,
      cod_simples: formData.get('cod_simples') as string
    }
  })
  redirect('/')
}

export async function getClient(id: string) {
  const client = await prisma.client.findUnique({
    where: { id }
  })
  if (client && client.senha_gov) {
    try {
      client.senha_gov = decrypt(client.senha_gov)
    } catch {}
  }
  return client
}
