"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryForm } from './GalleryForm';
import { deleteGallery } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Gallery {
  id?: string;
  image_url: string;
  caption: string;
  category: string;
  display_order: number;
}

export function GalleriesList({ initialGalleries }: { initialGalleries: Gallery[] }) {
  const [galleries] = useState<Gallery[]>(initialGalleries);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<Gallery | null>(null);

  const handleEdit = (gallery: Gallery) => {
    setEditingData(gallery);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingData(null);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Foto?',
      text: "Foto galeri ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-full px-6 py-2',
        cancelButton: 'rounded-full px-6 py-2'
      }
    });

    if (result.isConfirmed) {
      const res = await deleteGallery(id);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Terhapus!',
          text: 'Foto berhasil dihapus dari galeri.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Daftar Foto Galeri</h2>
          <p className="text-on-surface-variant text-sm">Kelola dokumentasi kegiatan sekolah yang tampil di halaman utama.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <MaterialIcon name="add_photo_alternate" />
          <span className="hidden sm:inline">Tambah Foto</span>
        </button>
      </div>

      {galleries.length === 0 ? (
        <div className="bg-surface rounded-3xl p-12 text-center border border-outline-variant/30">
          <MaterialIcon name="photo_library" className="text-6xl text-outline-variant/50 mb-4 block" />
          <h3 className="text-lg font-bold text-on-surface mb-2">Belum ada foto galeri</h3>
          <p className="text-on-surface-variant">Tambahkan foto dokumentasi kegiatan untuk memperindah website sekolah Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
              <div className="relative w-full aspect-square bg-surface-container">
                <Image 
                  src={gallery.image_url} 
                  alt={gallery.caption || "Foto Galeri"} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {gallery.category && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {gallery.category}
                  </div>
                )}
                
                <div className="absolute top-3 right-3 bg-surface/90 text-primary text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  #{gallery.display_order}
                </div>

                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button 
                    onClick={() => handleEdit(gallery)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 shadow-lg transition-transform"
                    title="Edit Foto"
                  >
                    <MaterialIcon name="edit" />
                  </button>
                  <button 
                    onClick={() => gallery.id && handleDelete(gallery.id)}
                    className="w-12 h-12 bg-error rounded-full flex items-center justify-center text-white hover:scale-110 shadow-lg transition-transform"
                    title="Hapus Foto"
                  >
                    <MaterialIcon name="delete" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 grow">
                <p className="text-sm text-on-surface line-clamp-2">
                  {gallery.caption || <span className="italic text-on-surface-variant/50">Tanpa keterangan</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <GalleryForm 
          initialData={editingData} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
}
