import StatCard from '../features/reservations/components/StatCard'
import { useReservations } from '../features/reservations/hooks/useReservations'
import ReservationTable from '../features/reservations/components/ReservationTable'
import { useMemo, useState , useEffect, useRef , useCallback} from 'react'
import ReservationFilters from '../features/reservations/components/ReservationFilters'
import type { ReservationStatus } from '../features/reservations/reservation.types'
import ReservationFormModal from '../features/reservations/components/ReservationFormModal'
import Toast, { type ToastType } from '../components/Toast'

function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

  export default function DashboardPage() {
  const today = getLocalDateString(new Date())

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    ReservationStatus | 'all'
  >('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<ToastType>('success')

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.code === 'NumpadAdd' &&
      !event.repeat &&
      !isReservationModalOpen
    ) {
      const target = event.target

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return
      }

      event.preventDefault()
      setIsReservationModalOpen(true)
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [isReservationModalOpen])

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      setToastType(type)
      setToastMessage(message)
    },
    [],
  )

  const handleStorageError = useCallback(
    (message: string) => {
      showToast(message, 'error')
    },
    [showToast],
  )

  const {
    reservations,
    addReservation,
    updateReservationStatus,
  } = useReservations(handleStorageError)

  const handleStatusChange = (
    reservationId: string,
    status: ReservationStatus,
  ) => {
    updateReservationStatus(reservationId, status)

    const statusLabel =
      status === 'pending'
        ? 'در انتظار تأیید'
        : status === 'confirmed'
          ? 'تأییدشده'
          : status === 'completed'
            ? 'انجام شده'
            : 'لغوشده'

    showToast(
      `وضعیت رزرو با موفقیت به «${statusLabel}» تغییر کرد.`,
      'success',
    )
  }



  const addReservationButtonRef = useRef<HTMLButtonElement>(null)
  const wasReservationModalOpenRef = useRef(false)
  const resetFilters = () => {
  setSearchQuery('')
  setStatusFilter('all')
  setSortOrder('asc')
}
  
  const filteredReservations = useMemo(() => {
   const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

   return reservations
    .filter((reservation) => {
      const matchesSearch =
        reservation.customerName
          .toLocaleLowerCase()
          .includes(normalizedQuery) ||
        reservation.phone.includes(normalizedQuery)

      const matchesStatus =
        statusFilter === 'all' ||
        reservation.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = `${a.date}T${a.time}`
      const dateB = `${b.date}T${b.time}`

      return sortOrder === 'asc'
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA)
    })
   }, [reservations, searchQuery, statusFilter, sortOrder])

  const stats = [
    {
      label: 'کل رزروها',
      value: reservations.length,
      accent: 'teal',
    },
    {
      label: 'رزروهای امروز',
      value: reservations.filter(
        (reservation) => reservation.date === today,
      ).length,
      accent: 'blue',
    },
    {
      label: 'رزروهای تأییدشده',
      value: reservations.filter(
        (reservation) => reservation.status === 'confirmed',
      ).length,
      accent: 'green',
    },
    {
      label: 'رزروهای لغوشده',
      value: reservations.filter(
        (reservation) => reservation.status === 'cancelled',
      ).length,
      accent: 'red',
    },
  ] as const

  
  useEffect(() => {
    if (
      wasReservationModalOpenRef.current &&
      !isReservationModalOpen
    ) {
      addReservationButtonRef.current?.focus()
    }

    wasReservationModalOpenRef.current = isReservationModalOpen
  }, [isReservationModalOpen])


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-dashboard-bg px-4 py-8 sm:px-8 lg:px-10"
    >
      
      {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage('')}
          />
       )}

     
    {/* هدر داشبورد */}
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-[#17243F] via-[#203451] to-[#344F70] p-6 shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-300">
              {(() => {
                const now = new Date()
                const date = new Intl.DateTimeFormat('fa-IR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(now)

                const weekday = new Intl.DateTimeFormat('fa-IR', {
                  weekday: 'long',
                }).format(now)

                return `${weekday}، ${date}`
              })()}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-blue-300">
                پنل مدیریت رزروها
              </p>

              <h1 className="text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                روز بخیر، مدیر عزیز!
              </h1>

              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                به پنل مدیریت خوش آمدید. رزروها و برنامه امروزتان را در یک نگاه بررسی کنید.
              </p>
            </div>
          </div>

          <button
            ref={addReservationButtonRef}
            type="button"
            onClick={() => setIsReservationModalOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#3977A8] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#30658F] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-[#203451]"
          >
            <span aria-hidden="true" className="text-xl">+</span>
            ثبت رزرو جدید
          </button>
        </div>
      </header>


        {/* کارت‌های آماری */}
        <section aria-labelledby="stats-heading" className="space-y-4">
          <h2
            id="stats-heading"
            className="text-lg font-bold text-slate-800"
          >
            خلاصه وضعیت رزروها
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                accent={stat.accent}
              />
            ))}
          </div>
        </section>
         
        {/*  نمایش نتایج فیلتر و جدول رزروها*/}
         <ReservationFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
        />

         <ReservationTable 
          reservations={filteredReservations}
          totalReservations={reservations.length}
          onStatusChange={handleStatusChange} 
          onResetFilters={resetFilters}
          />
      </div>

        <ReservationFormModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          onSubmit={(reservation) => {
          addReservation(reservation)
          setIsReservationModalOpen(false)
          showToast('رزرو با موفقیت ثبت شد.', 'success')
          }}
        />
    </main>
  )
}
