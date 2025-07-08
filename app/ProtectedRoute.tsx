import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
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

export default async function ProtectedRoute({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <>{children}</>
}
