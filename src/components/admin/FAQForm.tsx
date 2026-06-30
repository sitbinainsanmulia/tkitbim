"use client";

import React, { useState } from 'react';
import { createFaq, updateFaq } from '@/app/actions/admin';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export function FAQForm({
  initialData,
  onClose
}: {
  initialData?: FAQ | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // Default active jika buat baru
    if (!initialData) {
      formData.set("is_active", "true");
    }

    try {
      let result;
      if (initialData?.id) {
        result = await updateFaq(initialData.id, formData);
      } else {
        result = await createFaq(formData);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-error/10 hover:text-error transition-colors"
        >
          <MaterialIcon name="close" />
        </button>
        
        <h2 className="text-xl font-bold text-primary mb-6">
          {initialData ? "Edit FAQ" : "Tambah FAQ"}
        </h2>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Pertanyaan *</label>
            <input required type="text" name="question" defaultValue={initialData?.question} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Berapa usia minimal mendaftar?" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Jawaban *</label>
            <textarea required name="answer" defaultValue={initialData?.answer} rows={5} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary resize-none" placeholder="Tuliskan jawaban yang lengkap..." />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Urutan Tampil (Angka)</label>
            <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>

          {initialData && <input type="hidden" name="is_active" value={initialData.is_active.toString()} />}

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
