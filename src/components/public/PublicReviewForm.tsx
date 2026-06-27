"use client";

import React, { useState } from 'react';
import { submitPublicTestimonial } from '@/app/actions/admin';
import Swal from 'sweetalert2';

export function PublicReviewForm() {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("rating", rating.toString());

    try {
      const result = await submitPublicTestimonial(formData);

      if (result.error) {
        Swal.fire('Mohon Maaf', result.error, 'error');
      } else {
        Swal.fire({
          title: 'Terima Kasih!',
          text: 'Ulasan Anda telah kami terima dan sangat berarti bagi kami.',
          icon: 'success',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-full px-8 py-3 font-bold'
          }
        }).then(() => {
          // Reset form or redirect
          window.location.href = '/';
        });
      }
    } catch (err: any) {
      Swal.fire('Terjadi Kesalahan', err.message || "Gagal mengirimkan ulasan", 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-outline-variant/30 max-w-2xl mx-auto mt-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-tr-full -z-10"></div>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">rate_review</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Beri Kami Ulasan</h2>
        <p className="text-on-surface-variant text-sm sm:text-base">
          Ceritakan pengalaman putra-putri Anda belajar di TK IT Bina Insan Mulia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-1">
          <label className="text-sm font-bold text-on-surface">Nama Anda (Orang Tua / Wali) *</label>
          <input 
            required 
            type="text" 
            name="parent_name" 
            className="w-full p-4 rounded-2xl border border-outline-variant/50 focus:outline-primary bg-surface-container-lowest" 
            placeholder="Contoh: Bpk. Budi Santoso" 
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-on-surface">Nama Anak (Opsional)</label>
          <input 
            type="text" 
            name="child_name" 
            className="w-full p-4 rounded-2xl border border-outline-variant/50 focus:outline-primary bg-surface-container-lowest" 
            placeholder="Contoh: Ahmad (Kelas TK B)" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-on-surface block text-center">Berapa bintang untuk kami?</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="group relative transition-transform hover:scale-110 p-2"
              >
                <span className={`material-symbols-outlined text-5xl md:text-6xl transition-colors duration-300 ${star <= rating ? 'text-yellow-400 drop-shadow-md' : 'text-outline-variant/30'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </button>
            ))}
          </div>
          <div className="text-center text-sm font-bold text-yellow-500 mt-2">
            {rating === 5 ? 'Sangat Puas! 🌟' : rating === 4 ? 'Puas! 😊' : rating === 3 ? 'Cukup Baik 😐' : rating === 2 ? 'Kurang Puas 😔' : 'Sangat Kurang 😢'}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-on-surface">Ulasan & Kesan *</label>
          <textarea 
            required 
            name="content" 
            rows={5} 
            className="w-full p-4 rounded-2xl border border-outline-variant/50 focus:outline-primary bg-surface-container-lowest resize-none" 
            placeholder="Ceritakan bagaimana perkembangan anak Anda, fasilitas, atau pengajaran dari ustadz/ustadzah kami..." 
          />
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 rounded-full font-label-lg font-bold text-on-primary bg-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined">send</span>
            )}
            {loading ? 'Mengirim...' : 'Kirim Ulasan'}
          </button>
          <p className="text-center text-xs text-on-surface-variant mt-4">
            Ulasan Anda akan dimoderasi terlebih dahulu sebelum ditampilkan di website.
          </p>
        </div>
      </form>
    </div>
  );
}
