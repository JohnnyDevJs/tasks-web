'use client'

import toast, { Toaster } from 'react-hot-toast'

export function ToastContainer() {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            borderRadius: 50,
            backgroundColor: '#10383e',
            color: '#fff',
          },
          iconTheme: {
            primary: '#1a5d68',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            borderRadius: 50,
          },
        },
      }}
    />
  )
}

export const Toast = (type: string, message: string) =>
  type === 'success'
    ? toast.success(message, {
      className: 'rounded-lg',
    })
    : type === 'error'
      ? toast.error(message)
      : ''
