'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar } from 'lucide-react'

type Props = {
  name: string
  defaultValue?: string
  required?: boolean
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  className?: string
}

export default function DatePickerInput({
  name,
  defaultValue,
  required,
  onChange,
  onBlur,
  className
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null
  )

  return (
    <div className="relative">
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date)
          if (onChange) {
            onChange({
              target: {
                name,
                value: date ? date.toISOString().slice(0, 10) : ''
              }
            })
          }
        }}
        dateFormat="yyyy-MM-dd"
        className={`w-full px-3 py-2 rounded bg-amber-50 text-amber-900 border border-amber-200 focus:border-amber-400 focus:ring-amber-400 ${className}`}
        name={name}
        required={required}
        placeholderText="Selecione a data"
        onChangeRaw={e => {
          if (e) e.preventDefault()
        }}
        onBlur={onBlur}
      />
      <Calendar
        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none"
        size={18}
      />
    </div>
  )
}
