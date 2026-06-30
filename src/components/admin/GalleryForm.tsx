"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { createGallery, updateGallery } from '@/app/actions/admin';
import { uploadImageToStorage } from '@/utils/supabase/storage';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Gallery {
  id?: string;
  image_url: string;
  caption: string;
  category: string;
  display_order: number;
}

export function GalleryForm({
  initialData,
  onClose
}: {
  initialData?: Gallery | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const file = formData.get("image_file") as File;
      if (file && file.size > 0) {
        const uploadedUrl = await uploadImageToStorage(file, "public-assets", "galleries");
        formData.set("image_url", uploadedUrl);
      } else if (initialData?.image_url) {
        formData.set("image_url", initialData.image_url);
      } else {
        throw new Error("Pilih foto terlebih dahulu!");
      }

      let result;
      if (initialData?.id) {
        result = await updateGallery(initialData.id, formData);
      } else {
        result = await createGallery(formData);
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
          {initialData ? "Edit Foto Galeri" : "Tambah Foto Galeri"}
        </h2>

        {error && (
          <div className="p-4 bg-error/10 text-error rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex flex-col items-center justify-center mb-6 space-y-4">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30 shadow-inner">
              {previewImage ? (
                <Image src={previewImage} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant gap-2">
                  <MaterialIcon name="add_photo_alternate" className="text-4xl" />
                  <span className="text-sm">Belum ada foto terpilih</span>
                </div>
              )}
            </div>
            <div className="w-full">
              <input 
                type="file" 
                name="image_file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Kategori (Opsional)</label>
            <input type="text" name="category" defaultValue={initialData?.category} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: Kegiatan Belajar, Outbound, Lomba" />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Keterangan / Caption (Opsional)</label>
            <textarea name="caption" defaultValue={initialData?.caption} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Tuliskan keterangan singkat foto ini" />
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
