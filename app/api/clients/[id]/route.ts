import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json(
      {
        message: 'Acesso negado: apenas administradores podem deletar clientes.'
      },
      { status: 403 }
    )
  }
  const { id } = await context.params
  try {
    await prisma.client.update({
      where: { id },
      data: { ativo: false }
    })
    return NextResponse.json({ message: 'Cliente desativado com sucesso' })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao desativar cliente' },
      { status: 500 }
    )
  }
}
