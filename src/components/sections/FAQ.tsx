import React from 'react';
import Image from 'next/image';

const defaultFaqs = [
  {
    question: 'Berapa usia minimal pendaftaran?',
    answer: 'Usia minimal untuk pendaftaran Kelompok Bermain (KB) adalah 3 tahun, sedangkan untuk TK A adalah 4 tahun, dan TK B adalah 5 tahun pada bulan Juli tahun ajaran berjalan.'
  },
  {
    question: 'Apakah tersedia fasilitas antar-jemput?',
    answer: 'Ya, kami menyediakan layanan antar-jemput dengan armada yang aman dan didampingi oleh petugas khusus untuk wilayah tertentu.'
  },
  {
    question: 'Bagaimana jam belajar di TK IT Bina Insan Mulia?',
    answer: 'Jam belajar bervariasi sesuai tingkat. KB (Senin-Kamis 07.30-10.00), TK A & B (Senin-Jumat 07.30-11.30).'
  },
  {
    question: 'Bagaimana cara mendaftar?',
    answer: 'Pendaftaran dapat dilakukan secara online melalui website ini atau datang langsung ke kantor administrasi kami pada jam kerja.'
  }
];

export function FAQ({ data, settings }: { data?: any[], settings?: any }) {
  const faqs = data && data.length > 0 ? data : defaultFaqs;
  const imageUrl = settings?.faq_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuC--gGpcrV1m2Ko5ifxYXBqLFmZOMvouhR0l3EF66-O4bgoXhoQhUoWuIslTvwqMm4BVSmQq8aV4zY35x3vNM9xjmtbKtajDUrwjhDIzmQWe1i6fEPgkYO3GaRkTjdq33qJw92DyoYqS2lUVOg1O40oNJy0G5Gdpus7F_HOpz1T4LYyCSga0SDp2l8Is6KeVo2BbmYYLp7SS_wE2CErab8T2eKHQKX0rYT7Woi0xhD270plHKo8v2MWQ1EZY9mQAhAQVHsCSC11Vg";

  return (
    <section className="py-16 md:py-24 bg-[#fffdf5] relative overflow-hidden" id="faq">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-sm">
              <Image 
                alt="Anak bertanya" 
                className="w-full h-full object-cover rounded-[3rem] border-8 border-white shadow-[0_20px_40px_-15px_rgba(0,103,103,0.15)]" 
                src={imageUrl}
                width={500}
                height={500}
                unoptimized
              />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-secondary-container rounded-full mix-blend-multiply opacity-70 animate-bounce"></div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">FAQ</h2>
            <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-8">Pertanyaan Umum</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-surface rounded-2xl shadow-sm border border-primary/5 overflow-hidden" open={idx === 0}>
                  <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-on-surface">
                    {faq.question}
                    <span className="transition group-open:rotate-180 material-symbols-outlined text-secondary">expand_more</span>
                  </summary>
                  <div className="text-on-surface-variant text-sm mt-3 px-5 pb-5">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
