import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('nome') || undefined
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

  const where = search
    ? {
        ativo: true,
        OR: [
          { nome: { contains: search, mode: 'insensitive' as const } },
          { cpf: { contains: search, mode: 'insensitive' as const } },
          { cnpj: { contains: search, mode: 'insensitive' as const } }
        ]
      }
    : { ativo: true }

  try {
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.client.count({ where })
    ])
    return NextResponse.json({ clients, total }, { status: 200 })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await prisma.client.create({ data })
    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
}
