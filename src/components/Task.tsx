'use client'

import Link from 'next/link'
import { Share2, Trash2 } from 'lucide-react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConection'

import { Label } from './Label'
import { Toast } from './Toast'
import { Dialog } from './Dialog'

type TaskProps = {
  id: string
  createdAt: Date
  public: boolean
  task: string
  user: string
}

async function handleShareTask(id: string) {
  await navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_URL}/task/${id}`,
  )
}

async function handleDeleteTask(id: string) {
  const docRef = doc(db, 'tasks', id)
  await deleteDoc(docRef)

  Toast('success', 'Tarefa deletada com sucesso.')
}

export function Task({ id, task, public: isPublic }: TaskProps) {
  const excerptTask = task.substring(0, 150).concat('...')

  return (
    <div
      className="flex animate-[slideInUp_.4s_ease-in-out] items-center justify-between rounded-lg bg-brown-300 p-4"
      key={id}
    >
      <div className="first flex flex-1 flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {isPublic ? (
              <>
                <Label className="h-7 rounded-full bg-green-300 px-4 text-xs font-medium uppercase text-white">
                  Público
                </Label>
                <button onClick={() => handleShareTask(id)}>
                  <Share2 size={16} strokeWidth={3} className="text-gray-300" />
                </button>
              </>
            ) : (
              <Label className="h-7 rounded-full bg-gray-300 px-4 text-xs font-medium uppercase text-white">
                Rascunho
              </Label>
            )}
          </div>

          <Dialog
            title="Deseja mesmo excluir essa tarefa?"
            onClick={() => handleDeleteTask(id)}
          >
            <Trash2
              size={20}
              strokeWidth={3}
              className="cursor-pointer text-orange-300"
            />
          </Dialog>
        </div>
        {isPublic ? (
          <Link
            href={`/task/${id}`}
            className="text-base text-white"
            dangerouslySetInnerHTML={{ __html: excerptTask }}
          />
        ) : (
          <div
            className="text-base text-white"
            dangerouslySetInnerHTML={{ __html: excerptTask }}
          />
        )}
      </div>
    </div>
  )
}
