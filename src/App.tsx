
function App() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-5 py-10 font-sans sm:px-8"
    >
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-medium text-brand-600">
            Reservation Management
          </p>

          <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">
            داشبورد مدیریت رزروها
          </h1>

          <p className="text-sm leading-7 text-slate-500 sm:text-base">
            محیط مدیریت رزروها، مشتریان و وضعیت خدمات.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-navy-800">
                محیط پروژه آماده است
              </h2>

              <p className="text-sm leading-6 text-slate-500">
                React، TypeScript و Tailwind CSS برای ساخت داشبورد آماده‌اند.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              ثبت رزرو جدید
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'کل رزروها', value: '۱۲' },
            { label: 'در انتظار تأیید', value: '۴' },
            { label: 'رزروهای تأییدشده', value: '۶' },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-bold text-navy-900">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
