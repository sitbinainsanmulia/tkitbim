import { PublicRegistrationForm } from '@/components/public/PublicRegistrationForm';
import Link from 'next/link';

export const metadata = {
  title: 'Formulir Pendaftaran Siswa Baru - TK IT Bina Insan Mulia',
  description: 'Isi formulir pendaftaran putra-putri Anda',
};

export default function FormulirPendaftaranPage() {
  return (
    <div className="min-h-screen bg-[#fffdf5] pt-24 pb-16 relative">
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-secondary-container/20 rounded-l-[100px] blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-96 bg-tertiary-container/20 rounded-tr-[100px] blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        
        <div className="mb-8">
          <Link href="/pendaftaran" className="inline-flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Kembali ke Informasi Pendaftaran
          </Link>
        </div>

        <PublicRegistrationForm />

      </div>
    </div>
  );
}
