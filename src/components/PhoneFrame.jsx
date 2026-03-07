export function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d1e8c0,_#e7edf4_42%,_#dde4ed_100%)] sm:px-6 sm:py-8">
      <div className="mx-auto min-h-screen w-full max-w-[390px] overflow-hidden bg-slate-100 shadow-2xl ring-1 ring-slate-300 sm:min-h-[780px] sm:rounded-[32px]">
        <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-slate-300 sm:mt-4" />
        <main className="h-[calc(100vh-18px)] overflow-y-auto px-4 pb-8 pt-4 sm:h-[740px] sm:px-5 sm:pt-5">
          {children}
        </main>
      </div>
    </div>
  )
}
