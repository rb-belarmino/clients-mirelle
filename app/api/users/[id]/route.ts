import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
  const { id } = params
  const { name, email, role } = await req.json()
  if (!name || !email || !role) {
    return NextResponse.json(
      { message: 'Dados obrigatórios faltando.' },
      { status: 400 }
    )
  }
  const user = await prisma.user.update({
    where: { id },
    data: { name, email, role }
  })
  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
  const { id } = params
  const { password } = await req.json()
  if (!password) {
    return NextResponse.json({ message: 'Senha obrigatória.' }, { status: 400 })
  }
  await prisma.user.update({
    where: { id },
    data: { password }
  })
  return NextResponse.json({ ok: true })
}
