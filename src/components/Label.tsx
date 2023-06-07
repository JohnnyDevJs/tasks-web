import { ReactNode } from 'react'

type LabelProps = {
  children: ReactNode
  className: string
}

export function Label({ children, className }: LabelProps) {
  return (
    <div
      className={`${className} flex h-12 items-center rounded-full px-4 font-medium`}
    >
      {children}
    </div>
  )
}
