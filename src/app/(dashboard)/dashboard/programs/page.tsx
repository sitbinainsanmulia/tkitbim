import React from 'react';
import { getAdminPrograms } from '@/utils/supabase/queries';
import { ProgramsList } from '@/components/admin/ProgramsList';

export default async function ProgramsPage() {
  const programs = await getAdminPrograms();
  return <ProgramsList initialPrograms={programs} />;
}
