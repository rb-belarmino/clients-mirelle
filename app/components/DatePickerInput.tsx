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
      className="w-full px-3 py-2 rounded bg-amber-50 border border-amber-300 text-amber-900 focus:border-amber-500 focus:ring-amber-500"
      name={name}
      required={required}
      placeholderText="Selecione a data"
      value={startDate ? startDate.toISOString().split('T')[0] : ''}
      onChangeRaw={e => e.preventDefault()}
    />
  )
}
