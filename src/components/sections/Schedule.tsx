"use client";

import React, { useRef } from 'react';

interface ScheduleItem {
  id?: string;
  time_range: string;
  activity: string;
  description?: string;
  icon?: string;
  color?: string;
}

export function Schedule({ schedules }: { schedules?: ScheduleItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const defaultSchedules = schedules && schedules.length > 0 ? schedules : [
    { time_range: "07:30", activity: "Kedatangan & Sholat Dhuha", description: "", icon: "wb_sunny", color: "primary" },
    { time_range: "08:30", activity: "Pembelajaran Kreatif", description: "", icon: "draw", color: "secondary" },
    { time_range: "10:00", activity: "Istirahat & Makan Sehat", description: "", icon: "restaurant", color: "tertiary" },
    { time_range: "11:30", activity: "Persiapan Pulang", description: "", icon: "home", color: "error" },
  ];

  const getColorClasses = (index: number) => {
    const colors = [
      { bg: "bg-primary/10", text: "text-primary" },
      { bg: "bg-secondary-container/30", text: "text-secondary" },
      { bg: "bg-tertiary-container/30", text: "text-tertiary" },
      { bg: "bg-error-container/30", text: "text-error" },
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 md:py-24 bg-surface relative overflow-hidden group">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">Kegiatan Harian</h2>
        <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-12">Jadwal Harian Siswa</h3>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 rounded-full bg-surface shadow-lg border border-outline-variant/20 text-on-surface hover:text-primary transition-colors hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
            aria-label="Geser ke kiri"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 rounded-full bg-surface shadow-lg border border-outline-variant/20 text-on-surface hover:text-primary transition-colors hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
            aria-label="Geser ke kanan"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Slider Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 -mx-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {defaultSchedules.map((sched, index) => {
              const colorCls = getColorClasses(index);
              return (
                <div 
                  key={sched.id || index} 
                  className="shrink-0 w-[280px] md:w-[300px] snap-center bg-surface-container-low p-6 rounded-3xl border border-primary/5 text-center hover-lift custom-shadow"
                >
                  <div className={`w-16 h-16 mx-auto rounded-full ${colorCls.bg} ${colorCls.text} flex items-center justify-center mb-4`}>
                    <span className="material-symbols-outlined text-3xl">{sched.icon || 'schedule'}</span>
                  </div>
                  <h4 className="font-bold text-primary mb-2 text-xl">{sched.time_range}</h4>
                  <h5 className="font-bold text-on-surface mb-2">{sched.activity}</h5>
                  {sched.description && (
                    <p className="text-sm text-on-surface-variant line-clamp-3">{sched.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
