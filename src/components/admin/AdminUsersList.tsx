"use client";

import { useState } from "react";
import { createAdmin, updateAdmin, deleteAdmin } from "@/app/actions/admin-users";
import { useRouter } from "next/navigation";

export function AdminUsersList({ 
  initialAdmins, 
  currentUserId 
}: { 
  initialAdmins: any[],
  currentUserId: string
}) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const router = useRouter();

  const handleOpenModal = (admin: any = null) => {
    setEditingAdmin(admin);
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAdmin(null);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      let result;
      if (editingAdmin) {
        formData.append("id", editingAdmin.id);
        result = await updateAdmin(formData);
      } else {
        result = await createAdmin(formData);
      }
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: editingAdmin ? "Admin berhasil diperbarui!" : "Admin baru berhasil ditambahkan!" });
        // Refresh page to get latest data
        setTimeout(() => {
          handleCloseModal();
          router.refresh();
        }, 1500);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Terjadi kesalahan" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (id !== currentUserId) {
      alert("Anda hanya dapat menghapus akun Anda sendiri.");
      return;
    }
    
    if (confirm("Apakah Anda yakin ingin menghapus akun Anda? Anda akan langsung keluar dari sistem setelah penghapusan berhasil.")) {
      try {
        const result = await deleteAdmin(id);
        if (result.error) {
          alert(result.error);
        } else {
          alert("Akun berhasil dihapus.");
          window.location.href = "/login"; // Redirect to login
        }
      } catch (error: any) {
        alert(error.message || "Gagal menghapus admin");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-primary">Manajemen Admin</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          Tambah Admin
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-lowest border-b border-outline-variant/30 text-on-surface-variant text-sm">
              <tr>
                <th className="p-4 font-semibold">Nama</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Dibuat Pada</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                    Tidak ada admin lain ditemukan.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-on-surface flex items-center gap-2">
                        {admin.name}
                        {admin.id === currentUserId && (
                          <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-0.5 rounded-full font-medium">Anda</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm">
                      {admin.email}
                    </td>
                    <td className="p-4 text-on-surface-variant text-sm">
                      {new Date(admin.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(admin)}
                        className="p-2 text-primary hover:bg-primary-container rounded-lg transition-colors"
                        title="Edit Admin"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        disabled={admin.id !== currentUserId}
                        className={`p-2 rounded-lg transition-colors ${admin.id === currentUserId ? 'text-error hover:bg-error-container' : 'text-outline opacity-50 cursor-not-allowed'}`}
                        title={admin.id === currentUserId ? "Hapus Akun Sendiri" : "Hanya bisa menghapus akun sendiri"}
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {editingAdmin ? "Edit Admin" : "Tambah Admin Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              {message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-primary-container text-primary-fixed-variant' : 'bg-error-container text-error'}`}>
                  {message.text}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-on-surface">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingAdmin?.name} 
                  required 
                  className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-on-surface">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  defaultValue={editingAdmin?.email} 
                  required 
                  className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-on-surface">
                  {editingAdmin ? "Password Baru (Opsional)" : "Password"}
                </label>
                <input 
                  type="password" 
                  name="password" 
                  required={!editingAdmin} 
                  className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" 
                  placeholder={editingAdmin ? "Kosongkan jika tidak ingin mengubah password" : "Minimal 6 karakter"}
                  minLength={6}
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading && <span className="material-symbols-outlined text-sm animate-spin">refresh</span>}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
