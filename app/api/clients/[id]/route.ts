import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { decrypt } from '@/utils/crypto'

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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  try {
    const client = await prisma.client.findUnique({ where: { id } })
    if (!client) {
      return NextResponse.json(
        { message: 'Cliente não encontrado' },
        { status: 404 }
      )
    }
    // Descriptografa senha_gov antes de retornar
    if (client.senha_gov) {
      try {
        client.senha_gov = decrypt(client.senha_gov)
      } catch {}
    }
    return NextResponse.json(client)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar cliente' },
      { status: 500 }
    )
  }
}
