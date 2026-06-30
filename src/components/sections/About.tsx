import React from 'react';
import Image from 'next/image';
import { MaterialIcon } from '@/components/ui/MaterialIcon';

interface SiteSettings {
  about_text?: string;
  about_image_url?: string;
}

export function About({ data }: { data?: SiteSettings }) {
  const aboutText = data?.about_text || "TK IT Bina Insan Mulia memiliki visi membangun pondasi karakter Islami yang kuat dan kecerdasan akademik melalui pendekatan bermain yang menyenangkan. Kami membekali anak dengan nilai-nilai tauhid sejak dini.";
  const aboutImage = data?.about_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAH5SAh09dWJhvFDDoJ6hHX22X4Bzb6d2Kv0t2Vf5FmhPyvmY_kiDn7yjIcWODJXKPQyaRlOkfxaJ92wvgvfbBczlCgon3h72yJ7_1pp9D8Oa7VUufgQAPIj-C5RGk0IM52SGiN3AXENZDOfHTmrSa97Ov_bS9Q7kvbhJJC2JRwpU2JkTQ5ZSr_9LveJ157ASBxftVtfu77KUIKe8jWYXVlfMRkCn6vsfyq579zGP8rHw2t8BseSSxJURnV1yk2aqSsMzWOjHV5bw";

  return (
    <section className="py-16 md:py-24 bg-surface relative overflow-hidden pt-24" id="tentang">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center">
            {/* blob bg */}
            <div className="absolute inset-0 bg-secondary-container/40 rounded-full blur-3xl transform scale-75 animate-pulse"></div>
            <Image 
              alt="Kegiatan belajar mengajar" 
              className="relative z-10 w-full max-w-md rounded-4xl border-8 border-white shadow-xl -rotate-2" 
              src={aboutImage} 
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-secondary font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <MaterialIcon name="info" className="text-base" /> Tentang Kami
            </h2>
            <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold">
              Inspirasi Tumbuh Kembang Setiap Hari
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {aboutText}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MaterialIcon name="check" className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Lingkungan Ramah Anak</h4>
                  <p className="text-sm text-on-surface-variant">Suasana belajar yang aman, nyaman, dan mendukung eksplorasi.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <MaterialIcon name="check" className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Fokus Pendidikan Karakter</h4>
                  <p className="text-sm text-on-surface-variant">Menanamkan akhlak mulia dan adab sehari-hari.</p>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
