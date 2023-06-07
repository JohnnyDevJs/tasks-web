'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type EditorProps = {
  value: string
  className: string
  onChange: (value: string) => void
}

export function Editor({ value, className, onChange }: EditorProps) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      className={`${className} rounded-lg border-2 border-solid border-brown-300 bg-brown-500 text-white placeholder:text-lg placeholder:text-brown-300`}
    />
  )
}
