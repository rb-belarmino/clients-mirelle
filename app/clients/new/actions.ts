'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function createClient(formData: FormData) {
  const senha_gov = formData.get('senha_gov') as string
  const senha_gov_hash = await bcrypt.hash(senha_gov, 10)

  await prisma.client.create({
    data: {
      nome: formData.get('nome') as string,
      cpf: formData.get('cpf') as string,
      senha_gov: senha_gov_hash,
      data_nascimento: new Date(formData.get('data_nascimento') as string),
      cnpj: formData.get('cnpj') as string,
      cod_simples: formData.get('cod_simples') as string
    }
  })
  redirect('/')
}
