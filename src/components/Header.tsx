'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { LayoutDashboard, LogOut, User } from 'lucide-react'

import { Brand } from '@/app/elements/Brand'

import { LinkPage } from './LinkPage'
import { Dropdown } from './Dropdown'
import { Button } from './Button'

export function Header() {
  const { data: session } = useSession()
  return (
    <header
      id="header"
      className="relative w-full items-center justify-between bg-brown-900 pb-14 pt-4 text-white"
    >
      <div className="mx-auto flex w-[80rem] max-w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Brand />

          {session && (
            <LinkPage
              path="/dashboard"
              className="bg-orange-300 hover:bg-orange-500"
              icon={LayoutDashboard}
            >
              Meu Painel
            </LinkPage>
          )}
        </div>

        {session ? (
          <Dropdown
            title={`${session.user?.name}`}
            avatar={`${session.user?.image}`}
            onClick={() => signOut()}
          >
            <LogOut size={16} strokeWidth={3} className="text-gray-300" />
            Sair
          </Dropdown>
        ) : (
          <Button
            icon={User}
            className="bg-orange-300 hover:bg-orange-500"
            onClick={() => signIn('google')}
          >
            Acessar
          </Button>
        )}
      </div>
    </header>
  )
}
