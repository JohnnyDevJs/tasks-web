'use client'

import { FormEvent, ReactNode } from 'react'

type FormProps = {
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function Form({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {children}
    </form>
  )
}
