import { metadata } from '../layout'

export function Copyright() {
  const { title, description } = metadata
  return (
    <p className="text-sm text-brown-200">
      © Copyright 2023 - {title} | {description}. Todos os direitos reservados.
      Desenvolvido por{' '}
      <a
        href="https://github.com/johnnydevjs"
        className="text-green-300"
        target="_blank"
        rel="noreferrer"
      >
        Johnny Silva
      </a>
    </p>
  )
}
