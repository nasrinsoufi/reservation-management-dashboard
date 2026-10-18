
import { useState } from 'react'

import { MOCK_RESERVATIONS } from '../reservation.mock-data'
import type {
  Reservation,
  ReservationStatus,
} from '../reservation.types'

type NewReservation = Omit<Reservation, 'id' | 'createdAt'>

export function useReservations() {
  const [reservations, setReservations] =
    useState<Reservation[]>(MOCK_RESERVATIONS)

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
