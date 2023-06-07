import Image from 'next/image'
import Link from 'next/link'
import TasksLogo from '../../assets/tasks-logo.svg'

export function Brand() {
  return (
    <Link href="/">
      <Image src={TasksLogo} alt="Tasks" width={100} height={28} />
    </Link>
  )
}
