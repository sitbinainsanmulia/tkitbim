"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { createTeacher, updateTeacher } from '@/app/actions/admin';
import { uploadImageToStorage } from '@/utils/supabase/storage';

interface Teacher {
  id?: string;
  name: string;
  role: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export function TeacherForm({
  initialData,
  onClose
}: {
  initialData?: Teacher | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("is_active", "true");

    try {
      // Proses upload gambar jika ada file baru yang dipilih
      const file = formData.get("image_file") as File;
      if (file && file.size > 0) {
        // Otomatis dikompres & dikonversi ke webp
        const uploadedUrl = await uploadImageToStorage(file, "public-assets", "teachers");
        formData.set("image_url", uploadedUrl);
      } else if (previewImage && initialData?.image_url === previewImage) {
        formData.set("image_url", initialData.image_url);
      } else {
        // Foto dihapus (kosong)
        formData.set("image_url", "");
      }

      let result;
      if (initialData?.id) {
        result = await updateTeacher(initialData.id, formData);
      } else {
        result = await createTeacher(formData);
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
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2 className="text-xl font-bold text-primary mb-6">
          {initialData ? "Edit Data Guru" : "Tambah Guru Baru"}
        </h2>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col items-center justify-center mb-6 space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-surface-container border-4 border-white shadow-lg">
              {previewImage ? (
                <Image src={previewImage} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl">person</span>
                </div>
              )}
            </div>
            <div className="w-full text-center">
              <label className="text-sm font-bold text-on-surface block text-center mb-2">Pilih Foto Profil</label>
              <input 
                type="file" 
                name="image_file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer mb-2" 
              />
              {previewImage && (
                <button 
                  type="button" 
                  onClick={() => setPreviewImage(null)}
                  className="text-xs text-error font-bold hover:underline"
                >
                  Hapus Foto Saat Ini
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Nama Lengkap & Gelar *</label>
            <input required type="text" name="name" defaultValue={initialData?.name} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Ustzh. Siti Aminah, S.Pd" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Jabatan / Peran *</label>
            <input required type="text" name="role" defaultValue={initialData?.role} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Wali Kelas TK A" />
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
              {loading && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
