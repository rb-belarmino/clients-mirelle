import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { NextAuthProvider } from './providers'
import LogoutButton from './components/LogoutButton'

export const metadata: Metadata = {
  title: 'MA - Contabilidade'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster position="top-right" />
        <NextAuthProvider>
          <div className="w-full flex justify-end p-4">
            <LogoutButton />
          </div>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
