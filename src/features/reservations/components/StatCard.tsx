import {
  CalendarDays,
  CalendarCheck,
  CircleCheck,
  CircleX,
} from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  accent: 'teal' | 'blue' | 'green' | 'red'
}

const accentClasses = {
  teal: {
    icon: CalendarDays,
    iconColor: 'text-brand-600',
    background: 'bg-brand-50',
  },
  blue: {
    icon: CalendarCheck,
    iconColor: 'text-blue-600',
    background: 'bg-blue-50',
  },
  green: {
    icon: CircleCheck,
    iconColor: 'text-green-600',
    background: 'bg-green-50',
  },
  red: {
    icon: CircleX,
    iconColor: 'text-red-600',
    background: 'bg-red-50',
  },
} satisfies Record<
  StatCardProps['accent'],
  {
    icon: typeof CalendarDays
    iconColor: string
    background: string
  }
>

export default function StatCard({
  label,
  value,
  accent,
}: StatCardProps) {
  const { icon: Icon, iconColor, background } =
    accentClasses[accent]

  return (
    <article className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <span
          aria-hidden="true"
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${background}`}
        >
          <Icon size={22} strokeWidth={1.8} className={iconColor} />
        </span>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-[#17243F]">
        {value.toLocaleString('fa-IR')}
      </p>
    </article>
  )
}
