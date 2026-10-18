
interface StatCardProps {
  label: string
  value: number
  accent: 'teal' | 'blue' | 'green' | 'red'
}

const accentClasses = {
  teal: 'bg-teal-50 text-teal-700',
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-green-50 text-green-700',
  red: 'bg-red-50 text-red-700',
} satisfies Record<StatCardProps['accent'], string>

export default function StatCard({
  label,
  value,
  accent,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <span
          aria-hidden="true"
          className={`h-3 w-3 rounded-full ${accentClasses[accent]}`}
        />
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        {value.toLocaleString('fa-IR')}
      </p>
    </article>
  )
}
