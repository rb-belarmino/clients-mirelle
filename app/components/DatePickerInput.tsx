'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  name: string
  defaultValue?: string
  required?: boolean
}

export default function DatePickerInput({
  name,
  defaultValue,
  required
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null
  )

  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="yyyy-MM-dd"
      className="w-full px-3 py-2 rounded bg-slate-700 text-white"
      name={name}
      required={required}
      placeholderText="Selecione a data"
      value={startDate ? startDate.toISOString().split('T')[0] : ''}
      onChangeRaw={e => e.preventDefault()}
    />
  )
}
