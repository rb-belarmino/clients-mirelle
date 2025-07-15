import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { hashPassword } from '@/utils/bcrypt'
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

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
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

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
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

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
  // Impede que o admin delete a si mesmo
  if ((session.user as any)?.id === id) {
    return NextResponse.json(
      { message: 'Você não pode deletar seu próprio usuário.' },
      { status: 400 }
    )
  }

  // Impede deletar usuário com role 'admin'
  const userToDelete = await prisma.user.findUnique({ where: { id } })
  if (userToDelete?.email === 'admin@admin.com') {
    return NextResponse.json(
      { message: 'Não é permitido deletar o usuário admin@admin.com.' },
      { status: 400 }
    )
  }

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { message: 'Erro ao deletar usuário.' },
      { status: 500 }
    )
  }
}
