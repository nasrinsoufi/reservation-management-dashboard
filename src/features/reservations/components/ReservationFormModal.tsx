import { useState, type FormEvent } from 'react'
import DatePickerModule from 'react-multi-date-picker'
import DateObject from 'react-date-object'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import { CalendarDays } from 'lucide-react'

import { SERVICE_OPTIONS } from '../reservation.constants'
import type {
  Reservation,
  ServiceId,
} from '../reservation.types'

// سازگاری با ساختار export کتابخانه
const DatePicker =
  (DatePickerModule as unknown as {
    default?: typeof DatePickerModule
  }).default ?? DatePickerModule

type NewReservation = Omit<Reservation, 'id' | 'createdAt'>

interface ReservationFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reservation: NewReservation) => void
}

function getTodayDate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const inputClasses =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

const labelClasses = 'mb-2 block text-sm font-medium text-slate-700'

export default function ReservationFormModal({
  isOpen,
  onClose,
  onSubmit,
}: ReservationFormModalProps) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceId, setServiceId] = useState<ServiceId>(
    SERVICE_OPTIONS[0].id,
  )
  const [date, setDate] = useState(getTodayDate)
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  if (!isOpen) {
    return null
  }

  const pickerValue = date
    ? new DateObject({
        date,
        format: 'YYYY-MM-DD',
        calendar: gregorian,
        }).convert(persian, persian_fa)
    : null

  const todayPersian = new DateObject({
    date: new Date(),
    calendar: persian,
    locale: persian_fa,
  })

  function resetForm() {
  setCustomerName('')
  setPhone('')
  setServiceId(SERVICE_OPTIONS[0].id)
  setDate(getTodayDate())
  setTime('')
  setNotes('')
  }

  function handleClose() {
   resetForm()
   onClose()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
        customerName: customerName.trim(),
        phone: phone.trim(),
        serviceId,
        date,
        time,
        status: 'pending',
        notes: notes.trim(),
    })

     resetForm()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose()
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="reservation-form-title"
              className="text-xl font-bold text-slate-900"
            >
              ثبت رزرو جدید
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              اطلاعات مشتری و زمان رزرو را وارد کنید.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="بستن فرم"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="customer-name" className={labelClasses}>
                نام مشتری *
              </label>
              <input
                id="customer-name"
                name="customerName"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="نام و نام خانوادگی"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="customer-phone" className={labelClasses}>
                شماره تماس *
              </label>
              <input
                id="customer-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                required
                minLength={8}
                maxLength={20}
                pattern="[0-9۰-۹٠-٩+() -]{8,20}"
                title="شماره تماس را با ارقام معتبر وارد کنید."
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="09123456789"
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="reservation-service" className={labelClasses}>
                نوع خدمت *
              </label>
              <select
                id="reservation-service"
                name="serviceId"
                required
                value={serviceId}
                onChange={(event) =>
                  setServiceId(event.target.value as ServiceId)
                }
                className={inputClasses}
              >
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            
            
            <div>
                <label htmlFor="reservation-date" className={labelClasses}>
                    تاریخ رزرو *
                </label>

                <div className="relative">
                    <DatePicker
                    id="reservation-date"
                    name="date"
                    required
                    calendar={persian}
                    locale={persian_fa}
                    value={pickerValue}
                    minDate={todayPersian}
                    format="YYYY/MM/DD"
                    calendarPosition="bottom-right"
                    onChange={(selectedDate) => {
                        if (selectedDate) {
                            const gregorianDate = selectedDate
                            .convert(gregorian, gregorian_en)
                            .format('YYYY-MM-DD')

                            setDate(gregorianDate)
                        } else {
                            setDate('')
                        }
                    }}
                    inputClass={`${inputClasses} pl-10`}
                    containerClassName="w-full"
                    placeholder="انتخاب تاریخ شمسی"
                    />

                    <CalendarDays
                    size={18}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>
            </div>


            <div>
              <label htmlFor="reservation-time" className={labelClasses}>
                ساعت رزرو *
              </label>
              <input
                id="reservation-time"
                name="time"
                type="time"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reservation-notes" className={labelClasses}>
                توضیحات
                <span className="mr-1 font-normal text-slate-400">
                  (اختیاری)
                </span>
              </label>
              <textarea
                id="reservation-notes"
                name="notes"
                rows={3}
                maxLength={500}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="توضیحات تکمیلی درباره رزرو..."
                className={`${inputClasses} resize-y`}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500">
            فیلدهای دارای علامت * الزامی هستند. وضعیت رزرو جدید به‌صورت پیش‌فرض «در انتظار تأیید» خواهد بود.
          </p>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              ثبت رزرو
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
