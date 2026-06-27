"use client";

import React, { useState } from 'react';
import { submitRegistration } from '@/app/actions/admin';
import Swal from 'sweetalert2';

export function PublicRegistrationForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    try {
      const result = await submitRegistration(formData);

      if (result.error) {
        Swal.fire({
          title: 'Gagal!',
          text: result.error,
          icon: 'error',
          customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-full px-8 py-3'
          }
        });
      } else {
        Swal.fire({
          title: 'Berhasil Terkirim!',
          html: 'Data pendaftaran Anda telah kami terima.<br/>Tim administrasi kami akan segera menghubungi Anda.',
          icon: 'success',
          confirmButtonColor: '#10b981',
          customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-full px-8 py-3 font-bold'
          }
        }).then(() => {
          formElement.reset();
        });
      }
    } catch (err: any) {
      Swal.fire('Terjadi Kesalahan', 'Gagal mengirim data pendaftaran. Silakan coba lagi nanti.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface rounded-[2rem] shadow-xl border border-primary/5 p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display-lg font-bold text-primary mb-3">
          Formulir Pendaftaran
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Silakan lengkapi data di bawah ini dengan benar sesuai dokumen resmi (Kartu Keluarga / Akta Kelahiran).
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        
        {/* DATA ANAK */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-2">
            <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
            <h2 className="text-xl font-bold text-primary">Data Calon Anak Didik</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Nama Lengkap *</label>
              <input required type="text" name="full_name" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Sesuai Akta Kelahiran" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Nama Panggilan</label>
              <input type="text" name="nickname" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Nama Panggilan" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Nomor NIK / KIA</label>
              <input type="text" name="nik" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="16 Digit NIK" maxLength={16} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Jenis Kelamin *</label>
              <select required name="gender" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest appearance-none cursor-pointer">
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Tempat Lahir *</label>
              <input required type="text" name="birth_place" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Tempat Lahir" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Tanggal Lahir *</label>
              <input required type="date" name="birth_date" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Anak Ke-</label>
              <input type="text" name="child_order" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Contoh: 1 dari 3 bersaudara" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Agama</label>
              <select name="religion" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest appearance-none cursor-pointer" defaultValue="Islam">
                <option value="Islam">Islam</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-bold text-on-surface">Alamat Lengkap Tinggal *</label>
              <textarea required name="address" rows={3} className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest resize-none" placeholder="Alamat domisili saat ini lengkap dengan RT/RW dan Kode Pos" />
            </div>
          </div>
        </div>

        {/* DATA ORANG TUA */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center gap-3 border-b-2 border-secondary/10 pb-2">
            <span className="material-symbols-outlined text-secondary text-2xl">family_restroom</span>
            <h2 className="text-xl font-bold text-secondary">Data Orang Tua / Wali</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Nama Ayah</label>
              <input type="text" name="father_name" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Nama Lengkap Ayah" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Pekerjaan Ayah</label>
              <input type="text" name="father_job" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Pekerjaan Ayah" />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Nama Ibu</label>
              <input type="text" name="mother_name" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Nama Lengkap Ibu" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-on-surface">Pekerjaan Ibu</label>
              <input type="text" name="mother_job" className="w-full p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest" placeholder="Pekerjaan Ibu" />
            </div>
            
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-bold text-on-surface">Nomor WhatsApp Aktif *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">+62</span>
                <input required type="tel" name="whatsapp_number" className="w-full pl-12 p-4 rounded-xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-container-lowest font-mono" placeholder="81234567890" />
              </div>
              <p className="text-xs text-on-surface-variant">Pastikan nomor aktif dan terdaftar di WhatsApp untuk memudahkan komunikasi.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full md:w-auto px-12 py-5 rounded-full font-bold text-lg text-on-primary bg-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-3 mx-auto"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-2xl">send</span>
            )}
            {loading ? 'Mengirim Data...' : 'Daftar Sekarang'}
          </button>
        </div>

      </form>
    </div>
  );
}
