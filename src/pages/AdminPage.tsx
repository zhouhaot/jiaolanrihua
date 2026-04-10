const AdminPage = () => {
  return (
    <div className="container-app py-16">
      <div className="card-modern p-8">
        <p className="pill mb-4">Admin Preview</p>
        <h1 className="section-title mb-2">Admin dashboard is coming soon</h1>
        <p className="section-subtitle">
          Next phase will include a real-time operations board with activity feed, conversion funnel, top products, and order metrics.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Active users today</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">1,284</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Checkout conversion</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">7.9%</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Add-to-cart rate</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">28.4%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage