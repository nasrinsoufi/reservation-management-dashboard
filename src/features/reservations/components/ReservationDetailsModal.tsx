import {
  SERVICE_OPTIONS,
  RESERVATION_STATUS_OPTIONS,
} from "../reservation.constants";
import type { Reservation, ReservationStatus } from "../reservation.types";

interface ReservationDetailsModalProps {
  reservation: Reservation;
  onClose: () => void;
  onStatusChange: (status: ReservationStatus) => void;
}

const statusClasses = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  completed: "bg-blue-50 text-blue-700 ring-blue-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
} satisfies Record<ReservationStatus, string>;

function formatPersianDate(dateString: string): string {
  const date = new Date(`${dateString}T12:00:00`);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: "persian",
  }).format(date);
}

function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    calendar: "persian",
  }).format(new Date(dateString));
}

export default function ReservationDetailsModal({
  reservation,
  onClose,
  onStatusChange,
}: ReservationDetailsModalProps) {
  const service = SERVICE_OPTIONS.find(
    (option) => option.id === reservation.serviceId,
  );

  const status = RESERVATION_STATUS_OPTIONS.find(
    (option) => option.value === reservation.status,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-details-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="reservation-details-title"
              className="text-xl font-bold text-slate-900"
            >
              جزئیات رزرو
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              اطلاعات کامل رزرو ثبت‌شده
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن جزئیات رزرو"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ×
          </button>
        </div>

        <div className="my-5 border-t border-slate-100" />

        <dl className="space-y-5">
          <div>
            <dt className="text-sm text-slate-500">نام مشتری</dt>
            <dd className="mt-1 break-words font-semibold text-slate-900">
              {reservation.customerName}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">شماره تماس</dt>
            <dd
              dir="ltr"
              className="mt-1 text-right font-medium text-slate-800"
            >
              {reservation.phone}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">نوع خدمت</dt>
            <dd className="mt-1 font-medium text-slate-800">
              {service?.label ?? "خدمت نامشخص"}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-slate-500">تاریخ رزرو</dt>
              <dd className="mt-1 font-medium text-slate-800">
                {formatPersianDate(reservation.date)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500">ساعت رزرو</dt>
              <dd
                dir="ltr"
                className="mt-1 text-right font-medium text-slate-800"
              >
                {reservation.time}
              </dd>
            </div>
          </div>

          <div>
            <dt className="text-sm text-slate-500">وضعیت فعلی</dt>

            <dd className="mt-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                  statusClasses[reservation.status]
                }`}
              >
                {status?.label ?? "نامشخص"}
              </span>
            </dd>

            <label
              htmlFor="reservation-status"
              className="mt-4 block text-sm font-medium text-slate-700"
            >
              تغییر وضعیت رزرو
            </label>

            <select
              id="reservation-status"
              value={reservation.status}
              onChange={(event) =>
                onStatusChange(event.target.value as ReservationStatus)
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {RESERVATION_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <dt className="text-sm text-slate-500">توضیحات</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
              {reservation.notes?.trim() || "توضیحاتی ثبت نشده است."}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">زمان ثبت رزرو</dt>
            <dd className="mt-1 text-sm text-slate-700">
              {formatDateTime(reservation.createdAt)}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#3977A8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#30658F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            بستن
          </button>
        </div>
      </section>
    </div>
  );
}
