import { useEffect } from 'react'
import {
  CheckCircle2,
  XCircle,
  Info,
  X,
} from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const toastStyles: Record<
  ToastType,
  {
    container: string
    icon: string
    progress: string
    role: 'status' | 'alert'
  }
> = {
  success: {
    container: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    icon: 'text-emerald-600',
    progress: 'bg-emerald-500',
    role: 'status',
  },
  error: {
    container: 'border-red-200 bg-red-50 text-red-800',
    icon: 'text-red-600',
    progress: 'bg-red-500',
    role: 'alert',
  },
  info: {
    container: 'border-sky-200 bg-sky-50 text-sky-800',
    icon: 'text-sky-600',
    progress: 'bg-sky-500',
    role: 'status',
  },
}

const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export default function Toast({
  message,
  type = 'success',
  duration = 4000,
  onClose,
}: ToastProps) {
  const styles = toastStyles[type]
  const Icon = toastIcons[type]

  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, duration)

    return () => window.clearTimeout(timeoutId)
  }, [message, duration, onClose])

  return (
    <div
      role={styles.role}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={`fixed inset-x-4 top-4 z-[60] mx-auto w-auto max-w-md overflow-hidden rounded-xl border shadow-lg sm:right-6 sm:left-auto ${styles.container}`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon
          size={22}
          aria-hidden="true"
          className={`shrink-0 ${styles.icon}`}
        />

        <p className="flex-1 text-sm font-medium leading-6">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="بستن پیام"
          className="shrink-0 rounded-md p-1 transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div
        aria-hidden="true"
        className="h-1 w-full bg-black/5"
      >
        <div
          className={`toast-progress h-full ${styles.progress}`}
          style={{
            animation: `toast-progress ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>
        {`
          @keyframes toast-progress {
            from { width: 100%; }
            to { width: 0%; }
          }

          @media (prefers-reduced-motion: reduce) {
            .toast-progress {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  )
}
