import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { hashPassword } from '@/utils/bcrypt'

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
  const hashedPassword = await hashPassword(password)
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword }
  })
  return NextResponse.json({ ok: true })
}
