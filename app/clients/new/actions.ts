'use server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createClient(formData: FormData) {
  await prisma.client.create({
    data: {
      nome: formData.get('nome') as string,
      cpf: formData.get('cpf') as string,
      senha_gov: formData.get('senha_gov') as string,
      data_nascimento: new Date(formData.get('data_nascimento') as string),
      cnpj: formData.get('cnpj') as string,
      cod_simples: formData.get('cod_simples') as string
    }
  })
  redirect('/')
}
