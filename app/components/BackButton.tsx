'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

export default function BackButton() {
  const router = useRouter()
  return (
    <Button
      variant="secondary"
      className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold px-4 py-2 rounded flex items-center gap-2 transition-transform duration-200 hover:scale-105"
      onClick={() => router.back()}
    >
      <ArrowLeft
        className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
        size={18}
      />
      Voltar
    </Button>
  )
}
