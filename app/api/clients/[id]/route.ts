import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { decrypt, encrypt } from '@/utils/crypto'

import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '@/utils/bcrypt'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (
          user &&
          (await comparePassword(credentials.password, user.password))
        ) {
          const { password, ...userWithoutPass } = user
          return userWithoutPass
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user)
        (session.user as any).role = (token as any).role || (user as any)?.role
      return session
    },
    async jwt({ token, user }) {
      if (user) (token as any).role = (user as any).role
      return token
    }
  },
  pages: { signIn: '/login' }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
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

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json(
      {
        message: 'Acesso negado: apenas administradores podem editar clientes.'
      },
      { status: 403 }
    )
  }
  const { id } = await context.params
  const body = await request.json()
  try {
    const client = await prisma.client.update({
      where: { id },
      data: {
        nome: body.nome,
        cpf: body.cpf,
        senha_gov: body.senha_gov ? encrypt(body.senha_gov) : undefined,
        data_nascimento: body.data_nascimento
          ? new Date(body.data_nascimento)
          : undefined,
        cnpj: body.cnpj,
        cod_simples: body.cod_simples
      }
    })
    return NextResponse.json(client)
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar cliente' },
      { status: 500 }
    )
  }
}
