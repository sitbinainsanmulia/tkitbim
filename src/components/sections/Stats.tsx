import React from 'react';

export function Stats({ data }: { data?: any }) {
  return (
    <section className="py-16 bg-surface relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-lg">{data?.stat_experience || "10+"}</div>
            <p className="font-bold text-primary">Tahun Pengalaman</p>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-24 mx-auto rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-lg">{data?.stat_graduates || "100+"}</div>
            <p className="font-bold text-primary">Lulusan</p>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-24 mx-auto rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-lg">{data?.stat_teachers || "15+"}</div>
            <p className="font-bold text-primary">Guru Berkompeten</p>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-24 mx-auto rounded-full bg-error-container text-on-error-container flex items-center justify-center text-3xl font-bold border-4 border-surface shadow-lg">{data?.stat_rating || "4.9"}</div>
            <p className="font-bold text-primary">Rating Orang Tua</p>
          </div>
        </div>
      </div>
    </section>
  );
}
