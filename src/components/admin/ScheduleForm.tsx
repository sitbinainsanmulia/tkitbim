"use client";

import React, { useState } from 'react';
import { createSchedule, updateSchedule } from '@/app/actions/admin';
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

export function ScheduleForm({
  initialData,
  onClose
}: {
  initialData?: Schedule | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (initialData?.id) {
      formData.set("id", initialData.id);
    }
    formData.set("is_active", "true"); // Secara default aktif

    let result;
    if (initialData?.id) {
      result = await updateSchedule(formData);
    } else {
      result = await createSchedule(formData);
    }

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-error/10 hover:text-error transition-colors"
        >
          <MaterialIcon name="close" />
        </button>
        
        <h2 className="text-xl font-bold text-primary mb-6">
          {initialData ? "Edit Jadwal" : "Tambah Jadwal Baru"}
        </h2>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Rentang Waktu *</label>
            <input required type="text" name="time_range" defaultValue={initialData?.time_range} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: 07:30 - 08:00" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Nama Kegiatan *</label>
            <input required type="text" name="activity" defaultValue={initialData?.activity} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Penyambutan & Bermain Bebas" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Deskripsi Singkat</label>
            <textarea name="description" defaultValue={initialData?.description} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Ikon (Material Symbol)</label>
            <input type="text" name="icon" defaultValue={initialData?.icon || "schedule"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: schedule, home, restaurant" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Urutan Tampil (Angka)</label>
            <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full font-label-sm font-bold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors">
              Batal
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-full font-label-sm font-bold text-on-primary bg-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2">
              {loading && <MaterialIcon name="progress_activity" spin />}
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
