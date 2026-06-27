import { getRegistrations } from '@/utils/supabase/queries';

export default async function DashboardPage() {
  const registrations = await getRegistrations();
  
  const total = registrations.length;
  const accepted = registrations.filter((r: any) => r.status === 'Diterima').length;
  const pending = registrations.filter((r: any) => r.status === 'Menunggu' || !r.status).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Overview</h1>
        <p className="font-body-md text-on-surface-variant">Selamat datang di panel admin TK IT Bina Insan Mulia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Simple Stat Cards */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">groups</span>
          </div>
          <div>
            <p className="font-label-sm text-on-surface-variant">Total Pendaftar</p>
            <h3 className="font-display-lg text-3xl font-bold text-on-surface">{total}</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-start gap-4">
          <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">verified</span>
          </div>
          <div>
            <p className="font-label-sm text-on-surface-variant">Diterima</p>
            <h3 className="font-display-lg text-3xl font-bold text-on-surface">{accepted}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30 flex items-start gap-4">
          <div className="w-12 h-12 bg-tertiary-container/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary">pending_actions</span>
          </div>
          <div>
            <p className="font-label-sm text-on-surface-variant">Menunggu Review</p>
            <h3 className="font-display-lg text-3xl font-bold text-on-surface">{pending}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
