'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { redirect } from 'next/navigation'

import { Task } from '@/components/Task'
import { CreateTask } from '@/components/CreatedTask'

import { db } from '@/services/firebaseConection'
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore'

import BgNoData from '../../assets/bg-no-data.svg'
import Image from 'next/image'

type TaskProps = {
  id: string
  createdAt: Date
  public: boolean
  task: string
  user: string
}

export default async function Dashboard() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => {
    async function loadTasks() {
      const tasksRef = collection(db, 'tasks')
      const q = query(
        tasksRef,
        orderBy('createdAt', 'desc'),
        where('user', '==', session?.user?.email),
      )

      onSnapshot(q, (snapshot) => {
        const list = [] as TaskProps[]

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            task: doc.data().task,
            createdAt: doc.data().createdAt,
            user: doc.data().user,
            public: doc.data().public,
          })
        })

        setTasks(list)
      })
    }

    loadTasks()
  }, [session?.user?.email])

  if (!session) return redirect('/')

  return (
    session && (
      <div className="mx-auto flex w-[80rem] max-w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-medium text-white">Qual sua tarefa?</h1>
          <CreateTask />
        </div>
        <div className="flex flex-col gap-4">
          {tasks.length === 0 ? (
            <>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={BgNoData}
                  alt="Nenhuma tarefa encontrada"
                  width={500}
                  height={340}
                />

                <h1 className="text-center text-3xl font-medium text-white">
                  Você ainda não publicou nenhuma tarefa!
                </h1>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center text-3xl font-medium text-white">
                Minhas tarefas
              </h1>
              <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {tasks.map((item) => (
                  <Task
                    user={item.user}
                    id={item.id}
                    key={item.id}
                    task={item.task}
                    public={item.public}
                    createdAt={item.createdAt}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  )
}

Dashboard.auth = true
