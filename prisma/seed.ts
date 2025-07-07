import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const clientData: Prisma.ClientCreateInput[] = []
export async function main() {
  console.log('Start seeding ...')

  for (const data of clientData) {
    const client = await prisma.client.create({
      data: data
    })

    console.log(`Created client: Nome: ${client.nome}, CPF: ${client.cpf}`)

    console.log('Seeding finished.')
  }
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
