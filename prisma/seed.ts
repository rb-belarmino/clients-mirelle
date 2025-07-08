import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '../utils/bcrypt'

const prisma = new PrismaClient()

const clientData: Prisma.ClientCreateInput[] = []

const userData: Prisma.UserCreateInput[] = [
  
]

export async function main() {
  console.log('Start seeding ...')

  for (const data of clientData) {
    const client = await prisma.client.create({
      data: {
        ...data,
        senha_gov: data.senha_gov 
      }
    })

    console.log(`Created client: Nome: ${client.nome}, CPF: ${client.cpf}`)
  }

  for (const data of userData) {
    const hashedPassword = await hashPassword(data.password)
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        ...data,
        password: hashedPassword
      }
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
