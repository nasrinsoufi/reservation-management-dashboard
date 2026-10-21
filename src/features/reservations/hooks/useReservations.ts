import { useEffect, useState } from 'react'

import { MOCK_RESERVATIONS } from '../reservation.mock-data'
import type {
  Reservation,
  ReservationStatus,
} from '../reservation.types'

type NewReservation = Omit<Reservation, 'id' | 'createdAt'>

const STORAGE_KEY = 'reservation-management-reservations'

function loadReservations(): Reservation[] {
  try {
    const storedReservations = localStorage.getItem(STORAGE_KEY)

    if (storedReservations === null) {
      return MOCK_RESERVATIONS
    }

    const parsedReservations: unknown = JSON.parse(storedReservations)

    if (!Array.isArray(parsedReservations)) {
      return MOCK_RESERVATIONS
    }

    return parsedReservations as Reservation[]
  } catch {
    return MOCK_RESERVATIONS
  }
}

export function useReservations(
  onStorageError?: (message: string) => void,
) {
  const [reservations, setReservations] =
    useState<Reservation[]>(loadReservations)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reservations),
      )
    } catch {
      onStorageError?.(
        'ذخیره‌سازی رزروها ناموفق بود. فضای ذخیره‌سازی مرورگر را بررسی کنید.',
      )
    }
  }, [reservations, onStorageError])

  const addReservation = (data: NewReservation) => {
    const newReservation: Reservation = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setReservations((currentReservations) => [
      newReservation,
      ...currentReservations,
    ])
  }

  const updateReservationStatus = (
    reservationId: string,
    status: ReservationStatus,
  ) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status }
          : reservation,
      ),
    )
  }

  return {
    reservations,
    addReservation,
    updateReservationStatus,
  }
}
