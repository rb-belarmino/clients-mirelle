import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const nome = searchParams.get('nome') || undefined
  try {
    const clients = await prisma.client.findMany({
      where: {
        ativo: true,
        ...(nome ? { nome: { contains: nome, mode: 'insensitive' } } : {})
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(clients, { status: 200 })
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
