import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }

  const { name, email, password, role } = await req.json()
  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { message: 'Dados obrigatórios faltando.' },
      { status: 400 }
    )
  }

  // Verifica se já existe usuário com o mesmo email
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { message: 'Email já cadastrado.' },
      { status: 409 }
    )
  }

  // Cria usuário (senha em texto puro, ajuste para hash se desejar)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password, // Em produção, use hash!
      role
    }
  })

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(users)
}
