import React from 'react';
import { getRegistrations, getSiteSettings } from "@/utils/supabase/queries";
import { RegistrationsTable } from "@/components/admin/RegistrationsTable";

export default async function PendaftarPage() {
  const data = await getRegistrations();
  const settings = await getSiteSettings();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Data Pendaftar</h1>
        <p className="text-on-surface-variant">Kelola daftar calon siswa, hubungi via WhatsApp, dan perbarui status pendaftaran.</p>
      </div>
      
      <RegistrationsTable initialData={data} settings={settings} />
    </div>
  );
}
