'use client'

import Image from 'next/image'
import BgHero from '../assets/bg-hero.svg'
import { Label } from './Label'
import { db } from '@/services/firebaseConection'
import { collection, getDocs } from 'firebase/firestore'

export function Hero() {
  const getData = async (data: string, title: string) => {
    const dataRef = collection(db, data)

    const dataSnapshot = await getDocs(dataRef)
    const dataSnapshotSize = dataSnapshot.size || 0

    return dataSnapshotSize > 1
      ? `${dataSnapshotSize} ${title}`
      : `${dataSnapshotSize} ${title}s`
  }

  const tasks = getData('tasks', 'tasks')
  const comments = getData('comments', 'comentários')

  return (
    <section
      id="hero"
      className="inset-0 flex w-full flex-col items-center justify-center gap-8"
    >
      <Image
        src={BgHero}
        width={600}
        height={390}
        alt="Sistema feito para você organizar seus estudos e tarefas"
      />

      <h1 className="w-[30rem] max-w-full text-center text-3xl font-medium text-white max-sm:text-2xl">
        Sistema feito para você organizar seus estudos e tarefas
      </h1>

      <div className="flex items-center gap-5 max-sm:flex-col">
        <Label className="bg-gray-300 text-white">+{tasks}</Label>
        <Label className="bg-green-400 text-white">+{comments}</Label>
      </div>
    </section>
  )
}
