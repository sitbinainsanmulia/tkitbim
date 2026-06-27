"use client";

import React, { useState } from 'react';
import { TestimonialForm } from './TestimonialForm';
import { deleteTestimonial, toggleTestimonialStatus } from '@/app/actions/admin';
import Swal from 'sweetalert2';

interface Testimonial {
  id?: string;
  parent_name: string;
  child_name: string;
  content: string;
  rating: number;
  display_order: number;
  is_active: boolean;
}

export function TestimonialsList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<Testimonial | null>(null);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingData(testimonial);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingData(null);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus Testimoni?',
      text: "Data ulasan orang tua ini akan dihapus permanen!",
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
      const res = await deleteTestimonial(id);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Terhapus!',
          text: 'Testimoni berhasil dihapus.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const handleToggleStatus = async (testimonial: Testimonial) => {
    if (!testimonial.id) return;
    
    // Jika sedang nonaktif dan ingin diaktifkan, atau sebaliknya
    const newStatusText = testimonial.is_active ? 'Menonaktifkan' : 'Mengaktifkan';
    
    const result = await Swal.fire({
      title: `${newStatusText} Testimoni?`,
      text: testimonial.is_active 
        ? "Testimoni ini akan disembunyikan dari halaman utama." 
        : "Testimoni ini akan ditampilkan ke publik di halaman utama.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: testimonial.is_active ? '#f59e0b' : '#10b981',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: `Ya, ${testimonial.is_active ? 'Nonaktifkan' : 'Aktifkan'}!`,
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-full px-6 py-2',
        cancelButton: 'rounded-full px-6 py-2'
      }
    });

    if (result.isConfirmed) {
      const res = await toggleTestimonialStatus(testimonial.id, testimonial.is_active);
      if (res.error) {
        Swal.fire('Error!', res.error, 'error');
      } else {
        Swal.fire({
          title: 'Berhasil!',
          text: `Status testimoni telah diperbarui.`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`material-symbols-outlined text-sm ${star <= rating ? 'text-yellow-400' : 'text-outline-variant/30'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        ))}
      </div>
    );
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/beri-ulasan`;
    navigator.clipboard.writeText(url);
    Swal.fire({
      title: 'Link Tersalin!',
      text: 'Link form ulasan berhasil disalin ke clipboard.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Daftar Testimoni</h2>
          <p className="text-on-surface-variant text-sm">Kelola ulasan dari orang tua/wali murid (moderasi & tampilkan).</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleCopyLink}
            className="bg-surface hover:bg-surface-container-high text-primary border border-primary/20 px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined">share</span>
            <span className="hidden sm:inline">Share Link</span>
          </button>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined">add_comment</span>
            <span className="hidden sm:inline">Tambah Testimoni</span>
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="p-4 font-bold text-sm text-on-surface">Urutan</th>
                <th className="p-4 font-bold text-sm text-on-surface">Orang Tua / Anak</th>
                <th className="p-4 font-bold text-sm text-on-surface w-1/3">Ulasan</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Status</th>
                <th className="p-4 font-bold text-sm text-on-surface text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    Belum ada data testimoni orang tua.
                  </td>
                </tr>
              ) : (
                testimonials.map((testi) => (
                  <tr key={testi.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                        {testi.display_order}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-on-surface">{testi.parent_name}</div>
                      {testi.child_name && (
                        <div className="text-xs text-on-surface-variant mt-0.5">Ortu dari: {testi.child_name}</div>
                      )}
                      <div className="mt-1">{renderStars(testi.rating)}</div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-on-surface-variant line-clamp-2 italic">
                        "{testi.content}"
                      </p>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleStatus(testi)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          testi.is_active 
                            ? 'bg-secondary-container/50 text-on-secondary-container hover:bg-secondary-container' 
                            : 'bg-error/10 text-error hover:bg-error/20'
                        }`}
                        title="Klik untuk mengubah status"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {testi.is_active ? 'visibility' : 'visibility_off'}
                        </span>
                        {testi.is_active ? 'Ditampilkan' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(testi)}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors text-on-surface-variant"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button 
                          onClick={() => testi.id && handleDelete(testi.id)}
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
        <TestimonialForm 
          initialData={editingData} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
}
