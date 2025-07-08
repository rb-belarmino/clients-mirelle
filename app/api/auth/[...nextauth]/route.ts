import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { comparePassword } from '@/utils/bcrypt'

// Defina authOptions, mas NÃO exporte
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com'
        },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // Busca usuário no banco
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (
          user &&
          (await comparePassword(credentials.password, user.password))
        ) {
          // Remova a senha do objeto retornado
          const { password, ...userWithoutPass } = user
          return userWithoutPass
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  callbacks: {
    async session({
      session,
      token,
      user
    }: {
      session: any
      token: any
      user?: any
    }) {
      // Inclui o campo role na sessão
      if (session.user) {
        session.user.role = token.role || user?.role
      }
      return session
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
