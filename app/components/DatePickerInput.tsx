'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
    <DatePicker
      selected={startDate}
      onChange={date => {
        setStartDate(date)
        if (onChange) {
          // Simula um evento para compatibilidade com handleChange
          onChange({
            target: { name, value: date ? date.toISOString().slice(0, 10) : '' }
          })
        }
      }}
      dateFormat="yyyy-MM-dd"
      className={className}
      name={name}
      required={required}
      placeholderText="Selecione a data"
      onChangeRaw={e => {
        if (e) e.preventDefault()
      }}
      onBlur={onBlur}
    />
  )
}
