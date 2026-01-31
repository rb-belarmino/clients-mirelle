'use client'
import DatePickerInput from '@/app/components/DatePickerInput'
import { useState } from 'react'
import { createClient } from './actions'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

export default function NewClientPage() {
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [values, setValues] = useState<{ [key: string]: string }>({})

  function handleBlur(e: any) {
    setTouched({ ...touched, [e.target.name]: true })
  }

  function handleChange(e: any) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-amber-100 p-2 sm:p-0">
      <form
        action={createClient}
        className="bg-white p-4 sm:p-8 rounded-xl shadow-xl max-w-md w-full space-y-4 mx-2 border border-amber-200"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-amber-900">
          Cadastrar Novo Cliente
        </h2>
        <div>
          <label className="block mb-1 text-amber-700">
            Nome:{' '}
            {touched.nome && !values.nome && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <Input
            name="nome"
            className="bg-amber-50 text-amber-900"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            CPF:
            {touched.cpf && !values.cpf && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <Input
            name="cpf"
            type="text"
            className="bg-amber-50 text-amber-900"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            Senha Gov:
            {touched.senha_gov && !values.senha_gov && (
              <span className="text-red-500 ml-2">* obrigatório</span>
            )}
          </label>
          <Input
            name="senha_gov"
            type="password"
            className="bg-amber-50 text-amber-900"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">Senha ISS:</label>
          <Input
            name="senha_iss"
            type="password"
            className="bg-amber-50 text-amber-900"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            Data de Nascimento:
          </label>
          <DatePickerInput
            name="data_nascimento"
            className="w-full px-3 py-2 rounded bg-amber-50 text-amber-900 focus:border-amber-400 focus:ring-amber-400"
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.data_nascimento}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">CNPJ:</label>
          <Input
            name="cnpj"
            className="bg-amber-50 text-amber-900"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-amber-700">
            Código Simples Nacional:
          </label>
          <Input
            name="cod_simples"
            className="bg-amber-50 text-amber-900"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto transition-transform duration-200 hover:scale-105"
          >
            Salvar
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold w-full sm:w-auto transition-transform duration-200 hover:scale-105"
          >
            <a href="/">Cancelar</a>
          </Button>
        </div>
      </form>
    </main>
  )
}
