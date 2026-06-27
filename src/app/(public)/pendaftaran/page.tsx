import Link from 'next/link';
import { getSiteSettings } from '@/utils/supabase/queries';

export const metadata = {
  title: 'Informasi Pendaftaran - TK IT Bina Insan Mandiri',
  description: 'Informasi alur pendaftaran dan kontak TK IT Bina Insan Mandiri',
};

export const revalidate = 60; // Cache selama 60 detik

export default async function InformasiPendaftaranPage() {
  const settings = await getSiteSettings();
  const phone = settings?.school_phone || "0812-3456-7890";
  const address = settings?.school_address || "Jl. Pendidikan No. 1, Kota Mandiri";

  const steps = [
    {
      icon: "assignment",
      title: "1. Mengisi Formulir Online",
      desc: "Orang tua mengisi data lengkap calon siswa melalui form pendaftaran di website ini."
    },
    {
      icon: "perm_phone_msg",
      title: "2. Menunggu Konfirmasi",
      desc: "Tim administrasi kami akan meninjau data Anda dan menghubungi via WhatsApp dalam 1-2 hari kerja."
    },
    {
      icon: "payments",
      title: "3. Pembayaran Administrasi",
      desc: "Lakukan pembayaran biaya pendaftaran awal sesuai instruksi yang diberikan oleh pihak sekolah."
    },
    {
      icon: "folder_shared",
      title: "4. Pengumpulan Berkas Fisik",
      desc: "Membawa fotokopi KK, Akta Kelahiran, dan pas foto saat datang ke sekolah untuk verifikasi."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffdf5] pt-24 pb-16 relative">
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-secondary-container/20 rounded-l-[100px] blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display-lg font-bold text-primary mb-4">
            Informasi Pendaftaran
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Mari melangkah bersama menuju masa depan yang gemilang! Simak panduan mudah berikut ini untuk mendaftarkan buah hati tercinta di TK IT Bina Insan Mulia.
          </p>
        </div>

        {/* Alur Pendaftaran */}
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-xl border border-primary/5 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b-2 border-primary/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">route</span>
              <h2 className="text-2xl font-bold text-primary">Alur Pendaftaran</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {settings?.brochure_url && (
                <a 
                  href={settings.brochure_url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary-container/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Brosur
                </a>
              )}
              {settings?.fees_url && (
                <a 
                  href={settings.fees_url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 bg-tertiary-container text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-tertiary-container/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">request_quote</span>
                  Rincian Biaya
                </a>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 relative hover:-translate-y-1 transition-transform custom-shadow group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/pendaftaran/formulir"
              className="inline-flex items-center justify-center gap-3 bg-secondary text-on-secondary px-10 py-5 rounded-full font-bold text-lg shadow-[0_4px_0_0_var(--color-on-secondary-container)] hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-2xl">edit_document</span>
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Kontak Kami */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-xl text-on-primary text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl"></div>
          
          <h2 className="text-2xl font-bold mb-8 relative z-10">Pusat Bantuan & Kontak</h2>
          
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <div className="bg-surface/10 p-6 rounded-2xl backdrop-blur-sm border border-surface/20 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl mb-3 text-secondary">support_agent</span>
              <h3 className="font-bold text-lg mb-1">Hubungi Admin</h3>
              <p className="text-primary-fixed mb-4 text-sm max-w-[200px]">Punya pertanyaan seputar pendaftaran? Kami siap membantu.</p>
              <a 
                href={`https://wa.me/${phone.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto bg-surface text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-surface/90 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                WhatsApp
              </a>
            </div>

            <div className="bg-surface/10 p-6 rounded-2xl backdrop-blur-sm border border-surface/20 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl mb-3 text-tertiary">location_on</span>
              <h3 className="font-bold text-lg mb-1">Kunjungi Kami</h3>
              <p className="text-primary-fixed mb-4 text-sm max-w-[200px]">{address}</p>
              <a 
                href={settings?.map_link || `https://maps.google.com/?q=${encodeURIComponent(address)}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-auto bg-surface text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-surface/90 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">map</span>
                Buka Peta
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
