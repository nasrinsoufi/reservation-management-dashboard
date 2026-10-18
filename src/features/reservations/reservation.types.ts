
import type {
  SERVICE_OPTIONS,
  RESERVATION_STATUS_OPTIONS,
} from './reservation.constants'

export type ServiceId =
  (typeof SERVICE_OPTIONS)[number]['id']

export type ReservationStatus =
  (typeof RESERVATION_STATUS_OPTIONS)[number]['value']

export interface Reservation {
  id: string
  customerName: string
  phone: string
  serviceId: ServiceId
  date: string
  time: string
  status: ReservationStatus
  notes?: string
  createdAt: string
}
