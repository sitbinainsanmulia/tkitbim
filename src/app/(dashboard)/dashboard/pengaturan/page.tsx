import React from 'react';
import { getSiteSettings } from "@/utils/supabase/queries";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

export default async function PengaturanPage() {
  const data = await getSiteSettings();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">Pengaturan Web</h1>
        <p className="text-on-surface-variant">Kelola konten utama, informasi kontak, dan metadata SEO website Anda.</p>
      </div>
      
      <SiteSettingsForm initialData={data || {}} />
    </div>
  );
}
