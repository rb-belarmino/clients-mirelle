'use client'
import DatePickerInput from '@/app/components/DatePickerInput'
import { useState } from 'react'
import { createClient } from './actions'

export default function NewClientPage() {
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [values, setValues] = useState<{ [key: string]: string }>({})

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched({ ...setTouched, [e.target.name]: true })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-900 text-white">
      <form
        action={createClient}
        className="bg-amber-800 p-8 rounded shadow max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Cliente</h2>
        <div>
          <label className="block mb-1">
            Nome:{' '}
            {touched.nome && !values.nome && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <input
            name="nome"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">
            CPF:
            {touched.cpf && !values.cpf && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <input
            name="cpf"
            type="text"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">
            Senha Gov:
            {touched.senha_gov && !values.senha_gov && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <input
            name="senha_gov"
            type="password"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">
            Data de Nascimento:
            {touched.data_nascimento && !values.data_nascimento && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <DatePickerInput
            name="data_nascimento"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">CNPJ:</label>
          <input
            name="cnpj"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1">Código Simples Nacional:</label>
          <input
            name="cod_simples"
            className="w-full px-3 py-2 rounded bg-amber-700 text-white focus:border-amber-400 focus:ring-amber-400"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded text-white"
          >
            Salvar
          </button>
          <a
            href="/"
            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-amber-900 font-semibold"
          >
            Cancelar
          </a>
        </div>
      </form>
    </main>
  )
}
