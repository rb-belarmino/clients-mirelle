import { PrismaClient, Prisma } from '@prisma/client'
import { encrypt } from '../utils/crypto'

const prisma = new PrismaClient()

const clientData: Prisma.ClientCreateInput[] = [
  {
    nome: 'Mirelle Amanda',
    cpf: '12345678901',
    senha_gov: 'senha123',
    data_nascimento: new Date('04/06/1991'),
    cnpj: '12345678000195',
    cod_simples: '123456789'
  },
  {
    nome: 'Rodrigo Belarmino',
    cpf: '98765432100',
    senha_gov: 'senha456',
    data_nascimento: new Date('12/25/1985'),
    cnpj: '98765432000198',
    cod_simples: '987654321'
  }
]

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@admin.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    email: 'test@test.com',
    password: 'test123',
    name: 'Usuário de Teste',
    role: 'user'
  }
]

export async function main() {
  console.log('Start seeding ...')

  for (const data of clientData) {
    // Criptografa a senha antes de salvar
    const client = await prisma.client.create({
      data: {
        ...data,
        senha_gov: encrypt(data.senha_gov)
      }
    })

    console.log(`Created client: Nome: ${client.nome}, CPF: ${client.cpf}`)
  }

  for (const data of userData) {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: data
    })
    console.log(`Created user: Email: ${user.email}`)
  }

  console.log('Seeding finished.')
}

export async function seed() {
  try {
    await main()
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
