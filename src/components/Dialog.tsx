'use client'

import { MouseEventHandler, ReactNode } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from './Button'
import { Ban, Check } from 'lucide-react'

type DialogProps = {
  title: string
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function Dialog({ title, children, onClick }: DialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-brown-900/90" />
        <AlertDialog.Content className="fixed inset-0 m-auto h-36 w-full max-w-lg text-white">
          <div className="mx-4 flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-brown-300 shadow-2xl shadow-black/50">
            <AlertDialog.Title className="overflow-hidden text-center text-lg font-medium  text-white sm:text-xl md:text-2xl">
              {title}
            </AlertDialog.Title>

            <div className="flex items-center justify-center gap-3">
              <AlertDialog.Cancel asChild>
                <Button icon={Ban} className="bg-gray-300 hover:bg-gray-600">
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  icon={Check}
                  className="bg-green-300 hover:bg-green-600"
                  onClick={onClick}
                >
                  Sim, excluir
                </Button>
              </AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
