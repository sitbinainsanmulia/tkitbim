import { getAdminGalleries } from '@/utils/supabase/queries';
import { GalleriesList } from '@/components/admin/GalleriesList';

export const metadata = {
  title: 'Manajemen Galeri - Admin Dashboard',
  description: 'Kelola foto galeri dokumentasi kegiatan',
};

export const dynamic = "force-dynamic";

export default async function GalleriesPage() {
  const galleries = await getAdminGalleries();

  return <GalleriesList initialGalleries={galleries} />;
}
