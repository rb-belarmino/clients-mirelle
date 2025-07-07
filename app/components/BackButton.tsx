'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded transition"
      onClick={() => router.back()}
    >
      ← Voltar
    </button>
  )
}
