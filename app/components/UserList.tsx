'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export default function UserList() {
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

  if (loading) return <p>Carregando usuários...</p>

  return (
    <div className="bg-white rounded shadow p-4 max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Usuários</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-amber-100">
            <th className="p-2">Nome</th>
            <th className="p-2">Email</th>
            <th className="p-2">Permissão</th>
            <th className="p-2">Criado em</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b">
              <td className="p-2">
                {editId === user.id ? (
                  <input
                    className="border p-1 rounded"
                    value={editForm.name || ''}
                    onChange={e =>
                      setEditForm(f => ({ ...f, name: e.target.value }))
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="p-2">
                {editId === user.id ? (
                  <input
                    className="border p-1 rounded"
                    value={editForm.email || ''}
                    onChange={e =>
                      setEditForm(f => ({ ...f, email: e.target.value }))
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2">
                {editId === user.id ? (
                  <select
                    className="border p-1 rounded"
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
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded"
                      onClick={handleEditSubmit as any}
                    >
                      Salvar
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => setEditId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-amber-600 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => setResetId(user.id)}
                >
                  Resetar Senha
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {resetId && (
        <form
          onSubmit={handleResetPassword}
          className="mt-4 flex gap-2 items-center"
        >
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Nova senha"
            value={resetPassword}
            onChange={e => setResetPassword(e.target.value)}
            required
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            Salvar nova senha
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            type="button"
            onClick={() => setResetId(null)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  )
}
