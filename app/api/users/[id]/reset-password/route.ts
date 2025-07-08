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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 })
  }
  const { id } = (req as any).params || {} // Corrige para pegar id do req.params
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
