import { getAdmins } from "@/app/actions/admin-users";
import { AdminUsersList } from "@/components/admin/AdminUsersList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Manajemen Admin - Dashboard',
};

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { users, error } = await getAdmins();

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-error-container text-error p-4 rounded-xl">
          <h2 className="font-bold mb-2">Gagal memuat data admin</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 lg:p-8 bg-surface-container-lowest overflow-y-auto">
      <AdminUsersList initialAdmins={users || []} currentUserId={user.id} />
    </main>
  );
}
