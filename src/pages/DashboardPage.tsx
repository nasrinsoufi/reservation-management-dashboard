import StatCard from '../features/reservations/components/StatCard'
import { useReservations } from '../features/reservations/hooks/useReservations'
import ReservationTable from '../features/reservations/components/ReservationTable'
import { useMemo, useState , useEffect, useRef} from 'react'
import ReservationFilters from '../features/reservations/components/ReservationFilters'
import type { ReservationStatus } from '../features/reservations/reservation.types'
import ReservationFormModal from '../features/reservations/components/ReservationFormModal'

function getLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function DashboardPage() {
  const { reservations , addReservation  } = useReservations()
  const today = getLocalDateString(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    ReservationStatus | 'all'
  >('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const addReservationButtonRef = useRef<HTMLButtonElement>(null)
  const wasReservationModalOpenRef = useRef(false)
  
  useEffect(() => {
    if (!successMessage) return

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage('')
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [successMessage])


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
      className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-10"
    >
      
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold">
            ✓
          </span>
          <span>{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="mr-auto rounded-md px-2 py-1 text-emerald-800 hover:bg-emerald-100"
            aria-label="بستن پیام"
          >
            ×
          </button>
        </div>
      )}

     {/* هدر داشبورد */}
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand-600">
              پنل مدیریت
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              داشبورد مدیریت رزروها
            </h1>

            <p className="text-sm leading-7 text-slate-500">
              رزروها، مشتریان و وضعیت خدمات را در یک نگاه مدیریت کنید.
            </p>
          </div>

          <button
            ref={addReservationButtonRef}
            type="button"
            onClick={() => setIsReservationModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          >
            <span aria-hidden="true" className="text-lg">+</span>
            ثبت رزرو جدید
          </button>
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

         <ReservationTable reservations={filteredReservations} />
      </div>

        <ReservationFormModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          onSubmit={(reservation) => {
          addReservation(reservation)
          setIsReservationModalOpen(false)
          setSuccessMessage('رزرو با موفقیت ثبت شد.')
          }}
        />
    </main>
  )
}
