'use client'

import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CheckCheck } from 'lucide-react'

import { Button } from './Button'
import { Editor } from './Editor'
import { Form } from './Form'
import { db } from '@/services/firebaseConection'
import { addDoc, collection } from 'firebase/firestore'

import { Toast } from './Toast'

export function CreateTask() {
  const [isTask, setIsTask] = useState('')
  const [isError, setIsError] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    isTask !== '<p><br></p>' && setIsError(false)
  }, [isTask])

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setIsPublic(event.target.checked)
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault()

    if (!isTask || isTask === '<p><br></p>') {
      setIsError(true)
      return
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        task: isTask,
        createdAt: new Date(),
        user: session?.user?.email,
        public: isPublic,
      })

      Toast('success', 'Tarefa adicionada com sucesso.')
      setIsTask('')
      setIsError(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Form onSubmit={handleRegisterTask}>
      <div>
        <Editor
          value={isTask}
          onChange={setIsTask}
          className={isError ? 'border-red-500' : ''}
        />
        {isError && (
          <p className="text-sm text-red-500">Preencha uma tarefa.</p>
        )}
      </div>
      <div className="flex items-center">
        <input
          id="isPublic"
          type="checkbox"
          checked={isPublic}
          onChange={handleChangePublic}
          className="h-4 w-4 cursor-pointer rounded border-2 border-solid border-brown-300 bg-brown-500 text-orange-300 shadow-none focus:outline-none focus:ring-0"
        />
        <label htmlFor="isPublic" className="ml-2 font-medium text-white">
          Publicar esta tarefa
        </label>
      </div>

      <div>
        <Button
          icon={CheckCheck}
          className="mt-2 bg-green-300 text-white hover:bg-green-700"
        >
          Registrar
        </Button>
      </div>
    </Form>
  )
}
