import {
  RESERVATION_STATUS_OPTIONS,
} from '../reservation.constants'
import type { ReservationStatus } from '../reservation.types'
import {
  Search,
  ListFilter,
  CalendarClock,
} from 'lucide-react'
import ResetFiltersButton from '../../../components/ResetFiltersButton'

type StatusFilter = ReservationStatus | 'all'
type SortOrder = 'asc' | 'desc'

interface ReservationFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (value: StatusFilter) => void
  sortOrder: SortOrder
  onSortOrderChange: (value: SortOrder) => void
}

export default function ReservationFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
}: ReservationFiltersProps) {
  return (
    <section
      aria-label="جست‌وجو و فیلتر رزروها"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* جست‌وجو */}
        <div>
          <label
            htmlFor="reservation-search"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
          <Search size={16} className="text-brand-600" aria-hidden="true" />
            جست‌وجوی مشتری
          </label>

          <input
            id="reservation-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="نام یا شماره تماس مشتری..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* فیلتر وضعیت */}
        <div>
          <label
            htmlFor="reservation-status"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <ListFilter size={16} className="text-brand-600" aria-hidden="true" />
            وضعیت رزرو
          </label>

          <select
            id="reservation-status"
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value as StatusFilter)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">همه وضعیت‌ها</option>

            {RESERVATION_STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* مرتب‌سازی */}
        <div>
          <label
            htmlFor="reservation-sort"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <CalendarClock size={16} className="text-brand-600" aria-hidden="true" />
            مرتب‌سازی بر اساس تاریخ و ساعت
          </label>

          <select
            id="reservation-sort"
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as SortOrder)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="asc">نزدیک‌ترین رزرو ابتدا</option>
            <option value="desc">دورترین رزرو ابتدا</option>
          </select>
        </div>
        {/* پاک کردن فیلترها */}
        <ResetFiltersButton
          onClick={() => {
            onSearchChange('')
            onStatusFilterChange('all')
            onSortOrderChange('asc')
          }}
        />
      </div>
    </section>
  )
}
