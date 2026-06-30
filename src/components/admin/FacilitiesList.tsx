"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { deleteFacility } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { FacilityForm } from './FacilityForm';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Facility {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function FacilitiesList({ initialData }: { initialData: Facility[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  const handleAdd = () => {
    setEditingFacility(null);
    setIsFormOpen(true);
  };

  const handleEdit = (facility: Facility) => {
    setEditingFacility(facility);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data fasilitas akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ba1a1a',
      cancelButtonColor: '#747775',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteFacility(id);
        if (response?.error) {
          throw new Error(response.error);
        }
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Fasilitas telah dihapus.',
          confirmButtonColor: '#1d5e3f'
        });
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Gagal menghapus fasilitas.',
          confirmButtonColor: '#ba1a1a'
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Manajemen Fasilitas</h1>
          <p className="font-body-md text-on-surface-variant">Kelola daftar fasilitas unggulan sekolah Anda.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-label-md flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <MaterialIcon name="add" className="text-sm" />
          Tambah Fasilitas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialData.length > 0 ? (
          initialData.map((facility) => (
            <div key={facility.id} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              <div className="relative h-48 w-full bg-surface-container-low">
                {facility.image_url ? (
                  <Image src={facility.image_url} alt={facility.title} fill className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MaterialIcon name="image" className="text-4xl text-on-surface-variant/50" />
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-bold line-clamp-1">{facility.title}</h3>
                <p className="font-body-sm text-on-surface-variant line-clamp-3 mb-4 flex-1">
                  {facility.description}
                </p>
                <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-outline-variant/20">
                  <button 
                    onClick={() => handleEdit(facility)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors tooltip"
                    title="Edit"
                  >
                    <MaterialIcon name="edit" className="text-sm" />
                  </button>
                  <button 
                    onClick={() => handleDelete(facility.id)}
                    className="p-2 text-error hover:bg-error/10 rounded-full transition-colors tooltip"
                    title="Hapus"
                  >
                    <MaterialIcon name="delete" className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-surface-container-lowest p-12 rounded-2xl border border-outline-variant/30 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MaterialIcon name="foundation" className="text-primary text-3xl" />
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-bold">Belum ada Fasilitas</h3>
            <p className="font-body-md text-on-surface-variant max-w-md">Mulai tambahkan fasilitas unggulan sekolah Anda agar tampil di halaman depan website.</p>
          </div>
        )}
      </div>

      {isFormOpen && (
        <FacilityForm 
          initialData={editingFacility} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
