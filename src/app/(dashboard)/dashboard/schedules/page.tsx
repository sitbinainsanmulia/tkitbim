import { getAllSchedules } from "@/utils/supabase/queries";
import { SchedulesList } from "@/components/admin/SchedulesList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Manajemen Jadwal | Admin TK IT Bina Insan Mulia',
  description: 'Kelola jadwal kegiatan sehari-hari',
};

export default async function AdminSchedulesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const schedules = await getAllSchedules();

  return (
    <div className="space-y-6">
      <SchedulesList initialSchedules={schedules} />
    </div>
  );
}
