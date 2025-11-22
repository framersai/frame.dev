'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'info' | 'success' | 'error'

interface ToastMessage {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let externalShow: ((message: string, type?: ToastType) => void) | null = null

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    }, 3200)
  }, [])

  useEffect(() => {
    externalShow = show
    return () => {
      externalShow = null
    }
  }, [show])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[90]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl backdrop-blur bg-white/90 dark:bg-zinc-900/90 border ${
              msg.type === 'success'
                ? 'border-emerald-200 dark:border-emerald-800'
                : msg.type === 'error'
                ? 'border-rose-200 dark:border-rose-800'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {msg.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
            {msg.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-500" />}
            {msg.type === 'info' && <Info className="w-5 h-5 text-cyan-500" />}
            <p className="text-sm text-zinc-800 dark:text-zinc-100">{msg.message}</p>
            <button
              onClick={() => setMessages((prev) => prev.filter((m) => m.id !== msg.id))}
              className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 ml-2"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}

const safeShow = (message: string, type: ToastType = 'info') => externalShow?.(message, type)

export const toast = {
  show: safeShow,
  info: (message: string) => safeShow(message, 'info'),
  success: (message: string) => safeShow(message, 'success'),
  error: (message: string) => safeShow(message, 'error'),
  copied: (label: string = 'Content') => safeShow(`${label} copied to clipboard`, 'success'),
}


