import React, { ReactNode } from 'react'
import Link from 'next/link'
import { LucideProps } from 'lucide-react'

type LinkPageProps = {
  children: ReactNode
  className: string
  path: string
  icon: React.ComponentType<LucideProps>
}

export function LinkPage({
  children,
  className,
  path,
  icon: Icon,
}: LinkPageProps) {
  return (
    <Link
      href={path}
      className={`${className} flex h-10 items-center gap-2 rounded-full px-6 text-sm font-medium uppercase transition duration-500 first-line:flex`}
    >
      {Icon && <Icon size={16} strokeWidth={3} />}
      {children}
    </Link>
  )
}
