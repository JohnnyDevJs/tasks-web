import React, { ReactNode } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

type DropdownProps = {
  children: ReactNode
  avatar?: string
  title: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function Dropdown({ children, avatar, title, onClick }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="cursor-pointer">
        <button className="flex items-center gap-2 focus:outline-none focus:ring-0">
          {avatar && (
            <Image
              src={avatar}
              alt={title}
              width={40}
              height={40}
              className="rounded-full border-2 border-solid border-brown-300 p-[.2rem]"
            />
          )}

          <span className="flex items-center gap-1 text-sm font-medium">
            {title}
            <ChevronDown
              size={14}
              strokeWidth={3}
              className="text-orange-300"
            />
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative w-full min-w-[9rem] rounded-lg bg-brown-300"
          sideOffset={8}
          align="center"
        >
          <button
            className="flex w-full items-center gap-1 p-4 text-sm text-white"
            onClick={onClick}
          >
            {children}
          </button>

          <DropdownMenu.Arrow className="mr-24 fill-brown-300" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
