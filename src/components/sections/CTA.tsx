import React from 'react';
import Link from 'next/link';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

export function CTA({ data }: { data?: any }) {
  const phone = data?.school_phone || "0812-3456-7890";
  return (
    <section className="py-10 md:py-12 bg-surface relative px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto bg-primary rounded-[2.5rem] py-8 px-6 md:py-10 md:px-10 text-center text-on-primary relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-tertiary-container/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h2 className="font-display-lg font-bold mb-4">
            <span className="text-4xl md:text-5xl block mb-1">Awal Terbaik untuk Masa Depan Ananda</span>
            <span className="text-2xl md:text-3xl font-medium text-primary-fixed">TK IT Bina Insan Mulia</span>
          </h2>
          <p className="text-primary-fixed mb-6 max-w-3xl mx-auto text-lg leading-relaxed">
            Berikan fondasi pendidikan Islami yang interaktif dan menyenangkan untuk putra-putri Anda. Kami mendampingi proses belajar si kecil dengan penuh kasih sayang, berlandaskan akhlak mulia.<br className="hidden md:block" />
            <strong className="mt-1 inline-block">Kuota terbatas, jangan sampai kehabisan tempat untuk si kecil!</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/pendaftaran"
              className="bg-secondary text-on-secondary px-8 py-4 rounded-full font-bold shadow-[0_4px_0_0_var(--color-on-secondary-container)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <MaterialIcon name="app_registration" />
              <span>Gabung Sekarang</span>
            </Link>
            
            <a 
              href={`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(data?.whatsapp_message || "Halo Admin TK IT Bina Insan Mulia, saya ingin bertanya tentang informasi pendaftaran.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-surface text-primary border-2 border-surface px-8 py-4 rounded-full font-bold hover:bg-surface/90 transition-all flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <MaterialIcon name="chat" />
              <span>Konsultasi Gratis</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
