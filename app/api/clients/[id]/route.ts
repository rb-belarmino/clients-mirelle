import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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
