"use client";

import React, { useState } from 'react';
import { createProgram, updateProgram } from '@/app/actions/admin';

interface Program {
  id?: string;
  title: string;
  description: string;
  age_range: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export function ProgramForm({
  initialData,
  onClose
}: {
  initialData?: Program | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", "true"); // Secara default program baru aktif, atau diurus terpisah

    let result;
    if (initialData?.id) {
      result = await updateProgram(initialData.id, formData);
    } else {
      result = await createProgram(formData);
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
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2 className="text-xl font-bold text-primary mb-6">
          {initialData ? "Edit Program" : "Tambah Program Baru"}
        </h2>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Nama Program *</label>
            <input required type="text" name="title" defaultValue={initialData?.title} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Taman Kanak-kanak A" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Rentang Usia *</label>
            <input required type="text" name="age_range" defaultValue={initialData?.age_range} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Usia 4 - 5 Tahun" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Ikon (Material Symbol) *</label>
            <input required type="text" name="icon" defaultValue={initialData?.icon || "school"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: school, menu_book, escalator_warning" />
            <p className="text-xs text-on-surface-variant">Kunjungi <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Fonts Icons</a> untuk melihat daftar ikon.</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Deskripsi Singkat</label>
            <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Urutan Tampil (Angka)</label>
            <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>

          {/* Hidden field to keep status */}
          {initialData && <input type="hidden" name="is_active" value={initialData.is_active.toString()} />}

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full font-label-sm font-bold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors">
              Batal
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-full font-label-sm font-bold text-on-primary bg-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2">
              {loading && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
