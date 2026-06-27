import { getRegistrations, getSiteSettings } from '@/utils/supabase/queries';
import { RegistrationsList } from '@/components/admin/RegistrationsList';

export const metadata = {
  title: 'Manajemen Pendaftaran - Admin Dashboard',
  description: 'Kelola data calon siswa baru',
};

export const dynamic = "force-dynamic";

export default async function RegistrationsPage() {
  const registrations = await getRegistrations();
  const settings = await getSiteSettings();

  return <RegistrationsList initialRegistrations={registrations} settings={settings} />;
}
