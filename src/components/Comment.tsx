'use client'

import { useSession } from 'next-auth/react'
import { Trash2 } from 'lucide-react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebaseConection'

import { Label } from './Label'
import { Toast } from './Toast'
import { Dialog } from './Dialog'

type CommentProps = {
  id: string
  comment: string
  user: string
  name: string
}

async function handleDeleteComment(id: string) {
  const docRef = doc(db, 'comments', id)
  await deleteDoc(docRef)

  Toast('success', 'Comentário deletado com sucesso.')
}

export function Comment({ id, comment, name, user }: CommentProps) {
  const { data: session } = useSession()

  return (
    <article
      className="flex animate-[slideInUp_.4s_ease-in-out] items-center justify-between rounded-lg bg-brown-300 p-4"
      key={id}
    >
      <div className="first flex flex-1 flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="h-7 rounded-full bg-green-300 px-4 text-xs font-medium uppercase text-white">
              {name}
            </Label>
            {user === session?.user?.email && (
              <Dialog
                title="Deseja mesmo excluir esse comentário?"
                onClick={() => handleDeleteComment(id)}
              >
                <Trash2
                  size={20}
                  strokeWidth={3}
                  className="cursor-pointer text-orange-300"
                />
              </Dialog>
            )}
          </div>
        </div>

        <div
          className="text-base text-white"
          dangerouslySetInnerHTML={{ __html: comment }}
        />
      </div>
    </article>
  )
}
