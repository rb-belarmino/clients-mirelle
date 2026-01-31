'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import AdminCreateUserButton from './AdminCreateUserButton'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card } from '@/app/components/ui/card'
import { Pencil, KeyRound, Trash2, Save, X } from 'lucide-react'

export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export default function UserList() {
  const { data: session } = useSession() as {
    data: { user?: { id?: string } } | null
  }
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<User>>({})
  const [resetId, setResetId] = useState<string | null>(null)
  const [resetPassword, setResetPassword] = useState('')

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => toast.error('Erro ao carregar usuários'))
      .finally(() => setLoading(false))
  }, [])

  const handleEdit = (user: User) => {
    setEditId(user.id)
    setEditForm({ name: user.name, email: user.email, role: user.role })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/users/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })
    if (res.ok) {
      toast.success('Usuário atualizado!')
      setUsers(users =>
        users.map(u => (u.id === editId ? ({ ...u, ...editForm } as User) : u))
      )
      setEditId(null)
    } else {
      toast.error('Erro ao atualizar usuário')
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/users/${resetId}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: resetPassword })
    })
    if (res.ok) {
      toast.success('Senha redefinida!')
      setResetId(null)
      setResetPassword('')
    } else {
      toast.error('Erro ao redefinir senha')
    }
  }

  const handleDelete = async (id: string) => {
    if (session?.user?.id === id) {
      toast.error('Você não pode deletar seu próprio usuário.')
      return
    }
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Usuário deletado com sucesso!')
      setUsers(users => users.filter(u => u.id !== id))
    } else {
      const data = await res.json().catch(() => null)
      toast.error(data?.message || 'Erro ao deletar usuário')
    }
  }

  if (loading)
    return (
      <Card className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto mt-8 border border-amber-200 text-center">
        <p className="text-amber-400">Carregando usuários...</p>
      </Card>
    )

  return (
    <Card className="bg-white rounded-xl shadow-xl p-6 max-w-7xl mx-auto mt-8 border border-amber-200">
      <div className="flex justify-end mb-4">
        <AdminCreateUserButton />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-amber-900 text-center">
        Usuários
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-amber-100">
              <th className="p-2 rounded-l">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Permissão</th>
              <th className="p-2">Criado em</th>
              <th className="p-2 rounded-r">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-2">
                  {editId === user.id ? (
                    <Input
                      value={editForm.name || ''}
                      onChange={e =>
                        setEditForm(f => ({ ...f, name: e.target.value }))
                      }
                      className="bg-amber-50 text-amber-900"
                      required
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="p-2">
                  {editId === user.id ? (
                    <Input
                      value={editForm.email || ''}
                      onChange={e =>
                        setEditForm(f => ({ ...f, email: e.target.value }))
                      }
                      className="bg-amber-50 text-amber-900"
                      required
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-2">
                  {editId === user.id ? (
                    <select
                      className="bg-amber-50 text-amber-900 border rounded px-2 py-1"
                      value={editForm.role || 'user'}
                      onChange={e =>
                        setEditForm(f => ({ ...f, role: e.target.value }))
                      }
                    >
                      <option value="user">Usuário</option>
                      <option value="admin">Administrador</option>
                    </select>
                  ) : user.role === 'admin' ? (
                    'Administrador'
                  ) : (
                    'Usuário'
                  )}
                </td>
                <td className="p-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 flex gap-2">
                  {editId === user.id ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        onClick={handleEditSubmit as any}
                        type="button"
                      >
                        <Save
                          className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                          size={16}
                        />
                        Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-gray-300 hover:bg-gray-400 text-amber-900 flex items-center gap-1"
                        onClick={() => setEditId(null)}
                        type="button"
                      >
                        <X
                          className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                          size={16}
                        />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-amber-200 hover:bg-amber-300 text-amber-900 flex items-center gap-1"
                      onClick={() => handleEdit(user)}
                      type="button"
                    >
                      <Pencil
                        className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                        size={16}
                      />
                      Editar
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-blue-200 hover:bg-blue-300 text-blue-900 flex items-center gap-1"
                    onClick={() => setResetId(user.id)}
                    type="button"
                  >
                    <KeyRound
                      className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                      size={16}
                    />
                    Resetar Senha
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex items-center gap-1"
                    onClick={() => handleDelete(user.id)}
                    type="button"
                  >
                    <Trash2
                      className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
                      size={16}
                    />
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {resetId && (
        <form
          onSubmit={handleResetPassword}
          className="mt-4 flex gap-2 items-center"
        >
          <Input
            type="password"
            className="bg-amber-50 text-amber-900"
            placeholder="Nova senha"
            value={resetPassword}
            onChange={e => setResetPassword(e.target.value)}
            required
          />
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
            type="submit"
          >
            <Save
              className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
              size={16}
            />
            Salvar nova senha
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-gray-300 hover:bg-gray-400 text-amber-900 flex items-center gap-1"
            type="button"
            onClick={() => setResetId(null)}
          >
            <X
              className="transition-transform duration-200 hover:scale-110 hover:opacity-80"
              size={16}
            />
            Cancelar
          </Button>
        </form>
      )}
    </Card>
  )
}
