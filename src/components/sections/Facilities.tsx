"use client";

import React, { useState, useCallback } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import Image from 'next/image';

interface Facility {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function Facilities({ data = [] }: { data?: Facility[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, data.length - itemsPerView);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section id="fasilitas" className="py-24 bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header dengan tombol navigasi di pojok kanan atas */}
        <div className="flex items-end justify-between mb-12">
          <FadeIn className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-secondary-container/30 px-4 py-1.5 rounded-full text-on-secondary-container text-label-sm font-label-sm mb-6">
              <span className="material-symbols-outlined text-sm">foundation</span>
              <span>Fasilitas Kami</span>
            </div>
            <h2 className="font-display-md text-display-md text-primary font-bold mb-4">
              Lingkungan Belajar Ideal
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Kami menyediakan sarana dan prasarana terbaik demi menunjang kenyamanan, keamanan, dan perkembangan optimal buah hati Anda.
            </p>
          </FadeIn>

          {/* Tombol Navigasi — pojok kanan atas */}
          <FadeIn className="hidden md:flex items-center gap-3 shrink-0 ml-6 pb-1">
            <span className="font-label-sm text-on-surface-variant mr-1">
              {currentIndex + 1} / {maxIndex + 1}
            </span>
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-11 h-11 rounded-full border-2 border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Sebelumnya"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              aria-label="Berikutnya"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </FadeIn>
        </div>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (100% / ${Math.min(itemsPerView, data.length)} + 8px)))` }}
          >
            {data.map((facility) => (
              <div
                key={facility.id}
                className="shrink-0 w-full md:w-[calc(33.333%-16px)] bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  {facility.image_url ? (
                    <Image
                      src={facility.image_url}
                      alt={facility.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant/50">image</span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-title-lg text-title-lg text-primary font-bold mb-3">
                    {facility.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators + Mobile Nav */}
        <div className="flex items-center justify-between mt-8">
          {/* Dot Indicators */}
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 h-2.5 bg-primary'
                    : 'w-2.5 h-2.5 bg-outline-variant/50 hover:bg-primary/40'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border-2 border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Sebelumnya"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              aria-label="Berikutnya"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
