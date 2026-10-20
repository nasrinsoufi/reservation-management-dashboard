import { RotateCcw } from 'lucide-react'

interface ResetFiltersButtonProps {
  onClick: () => void
}

export default function ResetFiltersButton({
  onClick,
}: ResetFiltersButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-600 bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700 hover:bg-brand-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:translate-y-0 active:scale-[0.98]"
    >
      <RotateCcw size={16} aria-hidden="true" />
      پاک‌کردن فیلترها
    </button>
  )
}