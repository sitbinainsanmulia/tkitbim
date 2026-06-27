import { getFacilities } from '@/utils/supabase/queries';
import { FacilitiesList } from '@/components/admin/FacilitiesList';

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  
  return (
    <div className="space-y-6">
      <FacilitiesList initialData={facilities} />
    </div>
  );
}
