
export const SERVICE_OPTIONS = [
  { id: 'consultation', label: 'مشاوره تخصصی' },
  { id: 'in-person', label: 'جلسه حضوری' },
  { id: 'online', label: 'جلسه آنلاین' },
  { id: 'technical', label: 'خدمات فنی' },
  { id: 'design', label: 'خدمات طراحی' },
  { id: 'maintenance', label: 'سرویس و نگهداری' },
  { id: 'other', label: 'سایر خدمات' },
] as const

export const RESERVATION_STATUS_OPTIONS = [
  { value: 'pending', label: 'در انتظار تأیید' },
  { value: 'confirmed', label: 'تأیید شده' },
  { value: 'completed', label: 'انجام شده' },
  { value: 'cancelled', label: 'لغو شده' },
] as const
