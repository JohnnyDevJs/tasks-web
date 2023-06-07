'use client'

import { useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { CheckCheck } from 'lucide-react'

import { Button } from './Button'
import { Editor } from './Editor'
import { Form } from './Form'
import { db } from '@/services/firebaseConection'
import { addDoc, collection } from 'firebase/firestore'

import { Toast } from './Toast'

type CreatedCommentProps = {
  taskId: string
}

export function CreateComment({ taskId }: CreatedCommentProps) {
  const { data: session } = useSession()
  const [isComment, setIsComment] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    isComment !== '<p><br></p>' && setIsError(false)
  }, [isComment])

  async function handleRegisterComment(event: FormEvent) {
    event.preventDefault()

    if (!session?.user?.email || !session?.user?.email) return

    if (!isComment || isComment === '<p><br></p>') {
      setIsError(true)
      return
    }

    try {
      await addDoc(collection(db, 'comments'), {
        comment: isComment,
        createdAt: new Date(),
        user: session?.user?.email,
        name: session.user.name,
        taskId,
      })

      Toast('success', 'Comentário adicionado com sucesso.')
      setIsComment('')
      setIsError(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form onSubmit={handleRegisterComment}>
      <div>
        <Editor
          value={isComment}
          onChange={setIsComment}
          className={isError ? 'border-red-500' : ''}
        />
        {isError && (
          <p className="text-sm text-red-500">insira um comentário.</p>
        )}
      </div>
      <div>
        <Button
          icon={CheckCheck}
          className="mt-2 bg-green-300 text-white hover:bg-green-700"
        >
          Enviar comentário
        </Button>
      </div>
    </Form>
  )
}
