import Image from 'next/image'
import loading from '../assets/loading.svg'

export default function Loading() {
  return (
    <section
      id="loading"
      className="flex items-center justify-center overflow-hidden bg-brown-900"
    >
      <Image src={loading} alt="" width={64} />
    </section>
  )
}
