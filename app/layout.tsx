import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from './components/ui/sonner'
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
      <body className="bg-amber-50 min-h-screen font-sans">
        <Toaster position="top-right" />
        <NextAuthProvider>
          <header className="w-full fixed top-0 left-0 z-50 bg-white/90 shadow-md flex justify-end items-center px-6 py-3">
            <LogoutButton />
          </header>
          <div className="pt-20">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
