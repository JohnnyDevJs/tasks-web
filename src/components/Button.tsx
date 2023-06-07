import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ComponentType,
} from 'react'
import { LucideProps } from 'lucide-react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className: string
  icon: ComponentType<LucideProps>
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({
  children,
  className,
  icon: Icon,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex h-10 items-center gap-2 rounded-full px-6 text-sm font-medium uppercase transition duration-500 first-line:flex`}
    >
      {Icon && <Icon size={16} strokeWidth={3} />}
      {children}
    </button>
  )
}
