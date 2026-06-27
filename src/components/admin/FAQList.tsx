"use client";

import React, { useState } from 'react';
import { FAQForm } from './FAQForm';
import { deleteFaq, toggleFaqStatus } from '@/app/actions/admin';
import Swal from 'sweetalert2';

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export function FAQList({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const [faqs] = useState<FAQ[]>(initialFaqs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<FAQ | null>(null);

  const handleEdit = (faq: FAQ) => {
    setEditingData(faq);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingData(null);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus FAQ?',
      text: "Pertanyaan umum ini akan dihapus permanen!",
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
      const res = await deleteFaq(id);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Terhapus!',
          text: 'FAQ berhasil dihapus.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const handleToggleStatus = async (faq: FAQ) => {
    if (!faq.id) return;
    
    const newStatusText = faq.is_active ? 'Menonaktifkan' : 'Mengaktifkan';
    
    const result = await Swal.fire({
      title: `${newStatusText} FAQ?`,
      text: faq.is_active 
        ? "FAQ ini tidak akan tampil lagi di halaman utama." 
        : "FAQ ini akan ditampilkan ke publik.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: faq.is_active ? '#f59e0b' : '#10b981',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: `Ya, ${faq.is_active ? 'Nonaktifkan' : 'Aktifkan'}!`,
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-full px-6 py-2',
        cancelButton: 'rounded-full px-6 py-2'
      }
    });

    if (result.isConfirmed) {
      const res = await toggleFaqStatus(faq.id, faq.is_active);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Berhasil!',
          text: `Status FAQ telah diperbarui.`,
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
          <h2 className="text-2xl font-bold text-primary mb-1">Daftar FAQ</h2>
          <p className="text-on-surface-variant text-sm">Kelola daftar Pertanyaan Umum yang tampil di Landing Page.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span className="hidden sm:inline">Tambah FAQ</span>
        </button>
      </div>

      <div className="bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="p-4 font-bold text-sm text-on-surface w-16 text-center">Urutan</th>
                <th className="p-4 font-bold text-sm text-on-surface w-1/3">Pertanyaan</th>
                <th className="p-4 font-bold text-sm text-on-surface w-1/3">Jawaban</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Status</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    Belum ada data FAQ.
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm mx-auto">
                        {faq.display_order}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-on-surface line-clamp-2">{faq.question}</div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-on-surface-variant line-clamp-3">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleStatus(faq)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          faq.is_active 
                            ? 'bg-secondary-container/50 text-on-secondary-container hover:bg-secondary-container' 
                            : 'bg-error/10 text-error hover:bg-error/20'
                        }`}
                        title="Klik untuk mengubah status"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {faq.is_active ? 'visibility' : 'visibility_off'}
                        </span>
                        {faq.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(faq)}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors text-on-surface-variant"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => faq.id && handleDelete(faq.id)}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-error/10 hover:text-error flex items-center justify-center transition-colors text-on-surface-variant"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
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

      {isFormOpen && (
        <FAQForm 
          initialData={editingData} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
}
