"use client";

import React, { useState } from 'react';
import { ScheduleForm } from './ScheduleForm';
import { deleteSchedule, updateSchedule } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Schedule {
  id?: string;
  time_range: string;
  activity: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export function SchedulesList({ initialSchedules }: { initialSchedules: Schedule[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const handleAdd = () => {
    setEditingSchedule(null);
    setIsFormOpen(true);
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Jadwal?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006767',
      cancelButtonColor: '#ba1a1a',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const res = await deleteSchedule(id);
      if (res.error) {
        Swal.fire('Gagal!', res.error, 'error');
      } else {
        Swal.fire('Terhapus!', 'Jadwal telah dihapus.', 'success');
      }
    }
  };

  const handleToggle = async (schedule: Schedule) => {
    const formData = new FormData();
    formData.append("id", schedule.id!);
    formData.append("time_range", schedule.time_range);
    formData.append("activity", schedule.activity);
    formData.append("description", schedule.description || "");
    formData.append("icon", schedule.icon || "");
    formData.append("display_order", schedule.display_order.toString());
    formData.append("is_active", (!schedule.is_active).toString()); // Toggle

    const res = await updateSchedule(formData);
    if (res.error) {
      Swal.fire('Gagal!', res.error, 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Kelola Jadwal Harian</h1>
          <p className="text-on-surface-variant text-sm mt-1">Atur jadwal harian sekolah yang tampil di beranda.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
        >
          <MaterialIcon name="add" className="text-sm" />
          Tambah Jadwal
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30">
                <th className="p-4 text-sm font-bold text-primary">Waktu & Kegiatan</th>
                <th className="p-4 text-sm font-bold text-primary hidden md:table-cell">Deskripsi</th>
                <th className="p-4 text-sm font-bold text-primary text-center">Urutan</th>
                <th className="p-4 text-sm font-bold text-primary text-center">Status</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialSchedules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    Belum ada data jadwal. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                initialSchedules.map((sched) => (
                  <tr key={sched.id} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container shrink-0 flex items-center justify-center">
                          <MaterialIcon name={sched.icon || 'schedule'} />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{sched.time_range}</p>
                          <p className="text-sm font-medium text-primary">{sched.activity}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant hidden md:table-cell">
                      {sched.description}
                    </td>
                    <td className="p-4 text-center text-on-surface-variant">{sched.display_order}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggle(sched)}
                        className={`px-3 py-1 text-xs font-bold rounded-full ${sched.is_active ? 'bg-green-100 text-green-700' : 'bg-surface-container text-on-surface-variant'}`}
                        title="Klik untuk mengubah status"
                      >
                        {sched.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => handleEdit(sched)}
                        className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors inline-flex items-center justify-center"
                        title="Edit"
                      >
                        <MaterialIcon name="edit" className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDelete(sched.id!)}
                        className="w-8 h-8 rounded-full bg-error/10 text-error hover:bg-error hover:text-white transition-colors inline-flex items-center justify-center"
                        title="Hapus"
                      >
                        <MaterialIcon name="delete" className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <ScheduleForm 
          initialData={editingSchedule} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
