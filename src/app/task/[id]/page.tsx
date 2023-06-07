'use client'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { db } from '@/services/firebaseConection'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'

import { CreateComment } from '@/components/CreatedComment'
import { Comment } from '@/components/Comment'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import BgNoData from '../../../assets/bg-no-data.svg'

type TaskProps = {
  params: {
    id: string
  }
}

type CommentProps = {
  id: string
  comment: string
  taskId: string
  user: string
  name: string
}

export default async function Task({ params }: TaskProps) {
  const { id } = params
  const { data: session } = useSession()
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    async function loadComments() {
      const commentsRef = collection(db, 'comments')
      const q = query(commentsRef, where('taskId', '==', id))

      onSnapshot(q, (snapshot) => {
        const list = [] as CommentProps[]

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
          })
        })

        setComments(list)
      })
    }

    loadComments()
  }, [id])

  if (!session) return redirect('/')

  const docRef = doc(db, 'tasks', id)
  const snapshot = await getDoc(docRef)

  if (snapshot.data() === undefined) {
    return redirect('/')
  }

  if (!snapshot.data()?.public) {
    return redirect('/')
  }

  const miliseconds = snapshot.data()?.createdAt?.seconds * 1000

  const getTask = {
    task: snapshot.data()?.task,
    public: snapshot.data()?.public,
    createdAt: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: id,
  }

  return (
    <div className="mx-auto flex w-[80rem] max-w-full flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium text-white">Tarefa</h1>
        <div
          className="rounded-lg bg-brown-300 p-4 text-white"
          dangerouslySetInnerHTML={{ __html: getTask.task }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-medium text-white">
          Deixar comentário
        </h1>
        <CreateComment taskId={getTask.taskId} />
      </div>

      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <>
            <div className="flex flex-col items-center gap-4">
              <Image
                src={BgNoData}
                alt="Nenhum comentário encontrado"
                width={500}
                height={340}
              />

              <h1 className="text-center text-3xl font-medium text-white">
                Esta tarefa não possui nenhum comentário!
              </h1>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center text-3xl font-medium text-white">
              Comentários
            </h1>
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              {comments.map((comment) => (
                <Comment
                  user={comment.user}
                  id={comment.id}
                  key={comment.id}
                  comment={comment.comment}
                  name={comment.name}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
