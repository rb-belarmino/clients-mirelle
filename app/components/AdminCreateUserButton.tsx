'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import toast from 'react-hot-toast'

export default function AdminCreateUserButton() {
  const { data: session } = useSession() as {
    data: (Session & { user?: { role?: string | null } }) | null
  }
  const isAdmin = session?.user?.role === 'admin'
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  if (!isAdmin) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSuccess('Usuário criado com sucesso!')
        toast.success('Usuário criado com sucesso!')
        setForm({ name: '', email: '', password: '', role: 'user' })
        setShowForm(false)
      } else {
        const data = await res.json()
        setError(data.message || 'Erro ao criar usuário.')
        toast.error(data.message || 'Erro ao criar usuário.')
      }
    } catch (err) {
      setError('Erro ao criar usuário.')
      toast.error('Erro ao criar usuário.')
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      <button
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded transition w-full sm:w-auto text-center"
        style={{ minWidth: 140 }}
        onClick={() => setShowForm(v => !v)}
        type="button"
      >
        Criar Usuário
      </button>
      {showForm && (
        <div className="absolute right-0 z-20 mt-2 w-80">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-xl flex flex-col gap-2 border border-amber-200"
          >
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Salvar'}
            </button>
            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        </div>
      )}
    </div>
  )
}
