"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TeacherForm } from './TeacherForm';
import { deleteTeacher, toggleTeacherStatus } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Teacher {
  id?: string;
  name: string;
  role: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

export function TeachersList({ initialTeachers }: { initialTeachers: Teacher[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const handleAdd = () => {
    setEditingTeacher(null);
    setIsFormOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Guru?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006767',
      cancelButtonColor: '#ba1a1a',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const res = await deleteTeacher(id);
      if (res.error) {
        Swal.fire('Gagal!', res.error, 'error');
      } else {
        Swal.fire('Terhapus!', 'Data guru telah dihapus.', 'success');
      }
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const res = await toggleTeacherStatus(id, currentStatus);
    if (res.error) {
      Swal.fire('Gagal!', res.error, 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Kelola Guru</h1>
          <p className="text-on-surface-variant text-sm mt-1">Atur profil dan jabatan guru/tenaga pendidik yang ditampilkan di website.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
        >
          <MaterialIcon name="add" className="text-sm" />
          Tambah Guru
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30">
                <th className="p-4 text-sm font-bold text-primary w-20">Foto</th>
                <th className="p-4 text-sm font-bold text-primary">Nama & Gelar</th>
                <th className="p-4 text-sm font-bold text-primary">Jabatan</th>
                <th className="p-4 text-sm font-bold text-primary">Urutan</th>
                <th className="p-4 text-sm font-bold text-primary text-center">Status</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    Belum ada data guru. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                initialTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container relative">
                        {teacher.image_url ? (
                          <Image src={teacher.image_url} alt={teacher.name} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                            <MaterialIcon name="person" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-on-surface">{teacher.name}</td>
                    <td className="p-4 text-on-surface-variant text-sm">{teacher.role}</td>
                    <td className="p-4 text-on-surface-variant">{teacher.display_order}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggle(teacher.id!, teacher.is_active)}
                        className={`px-3 py-1 text-xs font-bold rounded-full ${teacher.is_active ? 'bg-green-100 text-green-700' : 'bg-surface-container text-on-surface-variant'}`}
                        title="Klik untuk mengubah status"
                      >
                        {teacher.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(teacher)}
                        className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors inline-flex items-center justify-center"
                        title="Edit"
                      >
                        <MaterialIcon name="edit" className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDelete(teacher.id!)}
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
        <TeacherForm 
          initialData={editingTeacher} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
