import { useState } from 'react'
import ReservationDetailsModal from './ReservationDetailsModal'
import {
  SERVICE_OPTIONS,
  RESERVATION_STATUS_OPTIONS,
} from '../reservation.constants'
import type {
  Reservation,
  ReservationStatus,
} from '../reservation.types'

interface ReservationTableProps {
  reservations: Reservation[]
  onStatusChange: (
    reservationId: string,
    status: ReservationStatus
  ) => void
}

const statusClasses = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  completed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
} satisfies Record<ReservationStatus, string>

function formatPersianDate(dateString: string): string {
  const date = new Date(`${dateString}T12:00:00`)

  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    calendar: 'persian',
  }).format(date)
}

export default function ReservationTable({
  reservations,
  onStatusChange,
}: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] =
  useState<Reservation | null>(null)

  if (reservations.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
        <h3 className="text-base font-semibold text-slate-800">
          رزروی برای نمایش وجود ندارد
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          پس از ثبت رزرو، اطلاعات آن در این بخش نمایش داده می‌شود.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* نمای کارت‌ها در موبایل */}
      <section className="space-y-4 md:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            فهرست رزروها
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            فهرست رزروهای ثبت‌شده و وضعیت آن‌ها
          </p>
        </div>

        <div className="space-y-3">
          {reservations.map((reservation) => {
            const service = SERVICE_OPTIONS.find(
              (option) => option.id === reservation.serviceId,
            )

            const status = RESERVATION_STATUS_OPTIONS.find(
              (option) => option.value === reservation.status,
            )

            return (
              <article
                key={reservation.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                {/* نام مشتری و وضعیت رزرو */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="break-words font-bold text-slate-900">
                      {reservation.customerName}
                    </h3>

                    <p
                      dir="ltr"
                      className="mt-1 text-right text-sm text-slate-500"
                    >
                      {reservation.phone}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      statusClasses[reservation.status]
                    }`}
                  >
                    {status?.label ?? 'نامشخص'}
                  </span>
                </div>

                <div className="my-4 border-t border-slate-100" />

                {/* جزئیات رزرو */}
                <dl className="grid grid-cols-2 gap-x-3 gap-y-4 text-sm">
                  <div>
                    <dt className="text-slate-500">
                      نوع خدمت
                    </dt>

                    <dd className="mt-1 font-medium text-slate-800">
                      {service?.label ?? 'خدمت نامشخص'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">
                      تاریخ
                    </dt>

                    <dd className="mt-1 font-medium text-slate-800">
                      {formatPersianDate(reservation.date)}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">
                      ساعت
                    </dt>

                    <dd
                      dir="ltr"
                      className="mt-1 text-right font-medium text-slate-800"
                    >
                      {reservation.time}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">
                     توضیحات
                    </dt>

                    <dd className="mt-1 break-words font-medium text-slate-800">
                      {reservation.notes?.trim() || '—'}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setSelectedReservation(reservation)}
                  className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                 >
                  مشاهده جزئیات
                </button>
              </article>
            )
          })}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
          تعداد رزروها: {reservations.length.toLocaleString('fa-IR')}
        </div>
      </section>

      {/* نمای جدول در تبلت و دسکتاپ */}
      <section className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            فهرست رزروها
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            فهرست رزروهای ثبت‌شده و وضعیت آن‌ها
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right text-sm">
            <thead className="bg-slate-50 text-xs font-semibold text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-4">
                  مشتری
                </th>

                <th scope="col" className="px-5 py-4">
                  شماره تماس
                </th>

                <th scope="col" className="px-5 py-4">
                  خدمت
                </th>

                <th scope="col" className="px-5 py-4">
                  تاریخ
                </th>

                <th scope="col" className="px-5 py-4">
                  ساعت
                </th>

                <th scope="col" className="px-5 py-4">
                  وضعیت
                </th>

                <th scope="col" className="px-5 py-4">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {reservations.map((reservation) => {
                const service = SERVICE_OPTIONS.find(
                  (option) => option.id === reservation.serviceId,
                )

                const status = RESERVATION_STATUS_OPTIONS.find(
                  (option) => option.value === reservation.status,
                )

                return (
                  <tr
                    key={reservation.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                      {reservation.customerName}
                    </td>

                    <td
                      dir="ltr"
                      className="whitespace-nowrap px-5 py-4 text-right text-slate-600"
                    >
                      {reservation.phone}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {service?.label ?? 'خدمت نامشخص'}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {formatPersianDate(reservation.date)}
                    </td>

                    <td
                      dir="ltr"
                      className="whitespace-nowrap px-5 py-4 text-right text-slate-600"
                    >
                      {reservation.time}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                          statusClasses[reservation.status]
                        }`}
                      >
                        {status?.label ?? 'نامشخص'}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedReservation(reservation)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        مشاهده جزئیات
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          تعداد رزروها: {reservations.length.toLocaleString('fa-IR')}
        </div>
      </section>

      {selectedReservation && (
        <ReservationDetailsModal
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
        onStatusChange={(status) => {
          onStatusChange(selectedReservation.id, status)

          setSelectedReservation((current) =>
            current ? { ...current, status } : null
          )
         }}
        />
      )}
    </>
  )
}
