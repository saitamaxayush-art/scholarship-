/** Placeholder shapes shown while results "load". Hidden from assistive tech; the
 *  surrounding region carries aria-busy and a text status instead. */
export function ScholarshipCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-[26px] bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-6" aria-hidden="true">
      <div className="flex gap-2">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-6 w-32 opacity-60" />
      </div>
      <div className="skeleton mt-5 h-6 w-4/5" />
      <div className="skeleton mt-2 h-4 w-1/2 opacity-60" />
      <div className="skeleton mt-4 h-4 w-full opacity-60" />
      <div className="skeleton mt-2 h-4 w-3/4 opacity-60" />
      <div className="skeleton mt-6 h-8 w-28" />
      <div className="mt-6 flex gap-2">
        <div className="skeleton h-9 w-32" />
        <div className="skeleton h-9 w-20 opacity-60" />
      </div>
    </div>
  );
}

export function TrackerCardSkeleton() {
  return (
    <div className="rounded-[20px] bg-white p-4 shadow-soft ring-1 ring-ink/5" aria-hidden="true">
      <div className="skeleton h-4 w-4/5" />
      <div className="skeleton mt-2 h-3 w-1/2 opacity-60" />
      <div className="skeleton mt-4 h-2 w-full opacity-60" />
      <div className="mt-4 flex justify-between">
        <div className="skeleton h-7 w-16 opacity-60" />
        <div className="skeleton h-7 w-24" />
      </div>
    </div>
  );
}
