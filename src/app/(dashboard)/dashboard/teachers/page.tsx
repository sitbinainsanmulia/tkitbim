import React from 'react';
import { getAdminTeachers } from '@/utils/supabase/queries';
import { TeachersList } from '@/components/admin/TeachersList';

export default async function TeachersPage() {
  const teachers = await getAdminTeachers();
  return <TeachersList initialTeachers={teachers} />;
}
