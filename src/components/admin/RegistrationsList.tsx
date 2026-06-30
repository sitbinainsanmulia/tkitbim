"use client";

import React, { useState } from 'react';
import { RegistrationDetailModal } from './RegistrationDetailModal';
import { deleteRegistration, updateRegistrationStatus } from '@/app/actions/admin';
import Swal from 'sweetalert2';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface Registration {
  id: string;
  full_name: string;
  nickname: string;
  gender: string;
  birth_place: string;
  birth_date: string;
  nik: string;
  child_order: string;
  religion: string;
  address: string;
  father_name: string;
  father_job: string;
  mother_name: string;
  mother_job: string;
  whatsapp_number: string;
  status: string;
  created_at: string;
}

export function RegistrationsList({ initialRegistrations, settings }: { initialRegistrations: Registration[], settings?: any }) {
  const [registrations] = useState<Registration[]>(initialRegistrations);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  
  const handleDelete = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: 'Hapus Data?',
      text: `Data pendaftaran atas nama ${name} akan dihapus permanen!`,
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
      const res = await deleteRegistration(id);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data pendaftaran berhasil dihapus.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const result = await Swal.fire({
      title: 'Ubah Status?',
      text: `Anda akan mengubah status menjadi "${newStatus}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Ya, Ubah!',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-full px-6 py-2',
        cancelButton: 'rounded-full px-6 py-2'
      }
    });

    if (result.isConfirmed) {
      const res = await updateRegistrationStatus(id, newStatus);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Status pendaftaran telah diperbarui.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Diterima':
        return 'bg-secondary-container/50 text-on-secondary-container border-secondary-container';
      case 'Ditolak':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-surface-container-highest text-on-surface border-outline-variant/30';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Daftar Pendaftar</h2>
          <p className="text-on-surface-variant text-sm">Kelola data calon siswa baru yang mendaftar melalui website.</p>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="p-4 font-bold text-sm text-on-surface">Tanggal</th>
                <th className="p-4 font-bold text-sm text-on-surface">Nama Calon Siswa</th>
                <th className="p-4 font-bold text-sm text-on-surface">Orang Tua & Kontak</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Status</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    Belum ada data pendaftar baru.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <div className="text-sm font-bold text-on-surface">
                        {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        {new Date(reg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{reg.full_name}</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">
                        {reg.gender} | {reg.birth_place ? `${reg.birth_place}, ` : ''}{reg.birth_date ? new Date(reg.birth_date).toLocaleDateString('id-ID') : ''}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-on-surface font-bold">{reg.father_name || reg.mother_name || '-'}</div>
                      <div className="text-xs font-mono mt-1 text-secondary flex items-center gap-1">
                        <MaterialIcon name="phone_iphone" className="text-[12px]" />
                        {reg.whatsapp_number}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <select
                        value={reg.status}
                        onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                        className={`text-xs font-bold rounded-full px-3 py-1.5 border appearance-none text-center cursor-pointer focus:outline-primary transition-colors ${getStatusBadge(reg.status)}`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedReg(reg)}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors text-on-surface-variant"
                          title="Lihat Detail"
                        >
                          <MaterialIcon name="visibility" className="text-[18px]" />
                        </button>
                        <button 
                          onClick={() => handleDelete(reg.id, reg.full_name)}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-error/10 hover:text-error flex items-center justify-center transition-colors text-on-surface-variant"
                          title="Hapus"
                        >
                          <MaterialIcon name="delete" className="text-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReg && (
        <RegistrationDetailModal 
          data={selectedReg} 
          onClose={() => setSelectedReg(null)} 
          settings={settings}
        />
      )}
    </div>
  );
}
