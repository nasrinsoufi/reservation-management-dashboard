
import type { Reservation } from './reservation.types'

const getDateFromToday = (offsetDays: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getCreatedAt = (daysAgo: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  return date.toISOString()
}

export const MOCK_RESERVATIONS = [
  {
    id: 'res-001',
    customerName: 'علی رضایی',
    phone: '09121234567',
    serviceId: 'consultation',
    date: getDateFromToday(0),
    time: '09:00',
    status: 'confirmed',
    notes: 'بررسی اولیه درخواست',
    createdAt: getCreatedAt(5),
  },
  {
    id: 'res-002',
    customerName: 'سارا محمدی',
    phone: '09123456789',
    serviceId: 'online',
    date: getDateFromToday(0),
    time: '10:30',
    status: 'pending',
    notes: '',
    createdAt: getCreatedAt(2),
  },
  {
    id: 'res-003',
    customerName: 'محمد کریمی',
    phone: '09351234567',
    serviceId: 'design',
    date: getDateFromToday(0),
    time: '12:00',
    status: 'completed',
    notes: 'هماهنگی انجام شده',
    createdAt: getCreatedAt(7),
  },
  {
    id: 'res-004',
    customerName: 'نگار احمدی',
    phone: '09127654321',
    serviceId: 'in-person',
    date: getDateFromToday(1),
    time: '09:30',
    status: 'confirmed',
    notes: '',
    createdAt: getCreatedAt(1),
  },
  {
    id: 'res-005',
    customerName: 'امیر حسینی',
    phone: '09361234567',
    serviceId: 'technical',
    date: getDateFromToday(1),
    time: '11:00',
    status: 'pending',
    notes: 'نیاز به بررسی فنی',
    createdAt: getCreatedAt(1),
  },
  {
    id: 'res-006',
    customerName: 'مریم صادقی',
    phone: '09129876543',
    serviceId: 'maintenance',
    date: getDateFromToday(2),
    time: '14:00',
    status: 'confirmed',
    notes: '',
    createdAt: getCreatedAt(3),
  },
  {
    id: 'res-007',
    customerName: 'رضا مرادی',
    phone: '09391234567',
    serviceId: 'consultation',
    date: getDateFromToday(2),
    time: '15:30',
    status: 'cancelled',
    notes: 'لغو از طرف مشتری',
    createdAt: getCreatedAt(4),
  },
  {
    id: 'res-008',
    customerName: 'الهام موسوی',
    phone: '09121112233',
    serviceId: 'design',
    date: getDateFromToday(3),
    time: '10:00',
    status: 'pending',
    notes: 'بررسی نمونه‌کارها',
    createdAt: getCreatedAt(2),
  },
  {
    id: 'res-009',
    customerName: 'حسین جعفری',
    phone: '09351112233',
    serviceId: 'other',
    date: getDateFromToday(3),
    time: '13:00',
    status: 'confirmed',
    notes: '',
    createdAt: getCreatedAt(6),
  },
  {
    id: 'res-010',
    customerName: 'فاطمه حیدری',
    phone: '09123334455',
    serviceId: 'online',
    date: getDateFromToday(-1),
    time: '16:00',
    status: 'completed',
    notes: 'جلسه به پایان رسیده',
    createdAt: getCreatedAt(3),
  },
  {
    id: 'res-011',
    customerName: 'مهدی اکبری',
    phone: '09363334455',
    serviceId: 'technical',
    date: getDateFromToday(-2),
    time: '11:30',
    status: 'cancelled',
    notes: '',
    createdAt: getCreatedAt(5),
  },
  {
    id: 'res-012',
    customerName: 'پریسا کاظمی',
    phone: '09125556677',
    serviceId: 'in-person',
    date: getDateFromToday(5),
    time: '09:00',
    status: 'pending',
    notes: 'مشتری جدید',
    createdAt: getCreatedAt(0),
  },
] satisfies Reservation[]
