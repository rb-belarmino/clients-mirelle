'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SHOW_TOAST_UNTIL = new Date('2026-02-10T23:59:59Z')

export default function LayoutChangeToast() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('hideLayoutChangeToast')) return

    const now = new Date()
    if (now > SHOW_TOAST_UNTIL) return

    if (!shown) {
      toast.info(
        <div>
          <div className="font-semibold mb-1">Bem-vindo ao novo layout!</div>
          <div className="text-sm mb-2">
            O sistema foi modernizado para 2026.
          </div>
          <button
            className="text-xs underline text-amber-700"
            onClick={() => {
              localStorage.setItem('hideLayoutChangeToast', '1')
              setShown(true)
              toast.dismiss()
            }}
          >
            Não mostrar novamente
          </button>
        </div>,
        { duration: 10000 }
      )
      setShown(true)
    }
  }, [shown])

  return null
}
