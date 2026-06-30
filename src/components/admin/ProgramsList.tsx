"use client";

import React, { useState } from 'react';
import { ProgramForm } from './ProgramForm';
import { deleteProgram, toggleProgramStatus } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Program {
  id?: string;
  title: string;
  description: string;
  age_range: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export function ProgramsList({ initialPrograms }: { initialPrograms: Program[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const handleAdd = () => {
    setEditingProgram(null);
    setIsFormOpen(true);
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Program?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006767',
      cancelButtonColor: '#ba1a1a',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const res = await deleteProgram(id);
      if (res.error) {
        Swal.fire('Gagal!', res.error, 'error');
      } else {
        Swal.fire('Terhapus!', 'Program telah dihapus.', 'success');
      }
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    const res = await toggleProgramStatus(id, currentStatus);
    if (res.error) {
      Swal.fire('Gagal!', res.error, 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Kelola Program</h1>
          <p className="text-on-surface-variant text-sm mt-1">Atur program pembelajaran dan kelompok usia yang ditawarkan.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
        >
          <MaterialIcon name="add" className="text-sm" />
          Tambah Program
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/30">
                <th className="p-4 text-sm font-bold text-primary">Ikon</th>
                <th className="p-4 text-sm font-bold text-primary">Nama Program</th>
                <th className="p-4 text-sm font-bold text-primary">Rentang Usia</th>
                <th className="p-4 text-sm font-bold text-primary">Urutan</th>
                <th className="p-4 text-sm font-bold text-primary text-center">Status</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialPrograms.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    Belum ada data program. Silakan tambah baru.
                  </td>
                </tr>
              ) : (
                initialPrograms.map((prog) => (
                  <tr key={prog.id} className="border-b border-outline-variant/20 hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                        <MaterialIcon name={prog.icon} />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-on-surface">{prog.title}</td>
                    <td className="p-4 text-on-surface-variant text-sm">{prog.age_range}</td>
                    <td className="p-4 text-on-surface-variant">{prog.display_order}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggle(prog.id!, prog.is_active)}
                        className={`px-3 py-1 text-xs font-bold rounded-full ${prog.is_active ? 'bg-green-100 text-green-700' : 'bg-surface-container text-on-surface-variant'}`}
                        title="Klik untuk mengubah status"
                      >
                        {prog.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(prog)}
                        className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-colors inline-flex items-center justify-center"
                        title="Edit"
                      >
                        <MaterialIcon name="edit" className="text-sm" />
                      </button>
                      <button 
                        onClick={() => handleDelete(prog.id!)}
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
        <ProgramForm 
          initialData={editingProgram} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
