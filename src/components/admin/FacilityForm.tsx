"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { addFacility, updateFacility, deleteFacility } from '@/app/actions/admin';
import { uploadImageToStorage } from '@/utils/supabase/storage';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Facility {
  id?: string;
  title: string;
  description: string;
  image_url: string;
}

export function FacilityForm({
  initialData,
  onClose
}: {
  initialData?: Facility | null;
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
        const uploadedUrl = await uploadImageToStorage(file, "public-assets", "facilities");
        formData.set("image_url", uploadedUrl);
      } else if (initialData?.image_url) {
        formData.set("image_url", initialData.image_url);
      } else {
        throw new Error("Pilih foto terlebih dahulu!");
      }

      let result;
      if (initialData?.id) {
        result = await updateFacility(initialData.id, formData);
      } else {
        result = await addFacility(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data fasilitas berhasil disimpan.',
        confirmButtonColor: '#1d5e3f'
      });
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-md text-xl font-bold text-primary">
            {initialData ? 'Edit Fasilitas' : 'Tambah Fasilitas'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
            <MaterialIcon name="close" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-error/10 text-error rounded-xl flex items-start gap-3">
              <MaterialIcon name="error" />
              <p className="font-body-sm">{error}</p>
            </div>
          )}

          <form id="facility-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-label-md text-on-surface mb-2">Foto Fasilitas <span className="text-error">*</span></label>
              <div className="mt-2 flex justify-center rounded-xl border border-dashed border-outline-variant/50 px-6 py-10 bg-surface-container-lowest hover:bg-surface-container-low transition-colors relative overflow-hidden group">
                <div className="text-center relative z-10">
                  {previewImage ? (
                    <div className="mb-4">
                      <Image src={previewImage} alt="Preview" width={400} height={300} className="mx-auto rounded-lg object-cover h-48 w-full" unoptimized />
                    </div>
                  ) : (
                    <MaterialIcon name="image" className="text-4xl text-on-surface-variant/50 mb-2" />
                  )}
                  <div className="mt-2 flex justify-center text-sm leading-6 text-on-surface-variant">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                      <span>{previewImage ? 'Ganti foto' : 'Upload foto'}</span>
                      <input id="file-upload" name="image_file" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-on-surface-variant/70">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block font-label-md text-on-surface mb-2">Nama Fasilitas <span className="text-error">*</span></label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={initialData?.title}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md"
                  placeholder="Misal: Ruang Kelas Ber-AC"
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-label-md text-on-surface mb-2">Deskripsi Fasilitas</label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  defaultValue={initialData?.description}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md resize-none"
                  placeholder="Jelaskan fasilitas secara singkat..."
                />
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full font-label-md text-primary hover:bg-primary/5 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="facility-form"
            disabled={loading}
            className="px-6 py-2.5 rounded-full font-label-md bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <MaterialIcon name="progress_activity" className="text-sm" spin />
                Menyimpan...
              </>
            ) : (
              'Simpan Fasilitas'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
