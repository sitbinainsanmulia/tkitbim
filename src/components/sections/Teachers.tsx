import React from 'react';
import Image from 'next/image';

const defaultTeachers = [
  {
    name: 'Ustadzah Aisyah',
    role: 'Kepala Sekolah',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8HmyWqonmtXdYfEA5wd_pIdZHnv4X1kXZgo89waStTwT9MQ81MEokR-N-BXlSlc3gVI5zno0uXcd2TQgyLShQn_XlxfmchM3ayEft3NnaiEvra4dY1RCc9YRWzzOnP_iU4ihDHY8l7u2NqtFMhEJemwZE9t1S8JRaakZZuScjQtbhuMKDmt8ELKTUsGL8DnG3t1DUZfSMGIpEgqRFqhJ9jPiuek74Cp-1GJozSqwz5juEuT9UvNrPirngCXf7IAnh6U1Jnduw6g'
  },
  {
    name: 'Ustadzah Fatimah',
    role: 'Wali Kelas TK B',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2B9ha7h9enwyMYJ1-uojEWpA2GU5aIqP7z0s8mfGuzZKrUXgQXg2YIqsY3NnJkSZ61V7ZFF25dowf4GzWEkORunKNb_HL-pe38nkZXtsIudGdt2u-pxcF6vsEeU7UFdwgeUHkPsPiH-2H8Txqc5jwMpIjzlEdWojWBzsgPsTHTfSe9RSwy7W3J9JD_grXAgJ-v0T-n5_dEzvWBMVH5c_S8_pyPHLdXhGZIDevPga4wGJIYILfnb22SSelMe3wo85oZxja3LGWQQ'
  },
  {
    name: 'Ustadzah Khadijah',
    role: 'Wali Kelas TK A',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvMqDo78BjTmDya-6SSZ5Hvc4ea5cBoL1yD2kzLOT_Ns9b0srlJGT5PhME3QLUDfXq9mVf6RhZ2dpzZKtzqYL7Dl17pLshq8FXBntMish6qOGulbCRCmIfW4xVtnYybEDGfnQf-kUPdPef0xFg4xdyCaO1MM1Lf63Cx7uLz7XaTR-dw2mFIkHpnZaousaqX8PIaXfNTX4WaKgs6LrRUYThYP9uJb2bcmZPZxGHpxJPLjkQ_ShCIzEhD-8gKGWHjpBxFxreZnisXg'
  },
  {
    name: 'Ustadzah Maryam',
    role: 'Wali Kelas KB',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlY4hu9vaF9KXuCNyXWylbLdJVwcrwOqYCubF4jkrQtVQN0YCmfP8grHm8vmY0cENHAs7LTQThebMg2gVf27Isag34JMcuQvB05XQ7omEq-eHN1ZKcGjfgNltTOa6HYMWlmSSsd3K5LmnMieHk7LXD4cOezm4jjdhlvsiswEEQr6JTq30TTaEfXr-rduB9npl7Wupfa0sOjPNCUPz06LVcjJeQLU4Uwgv4W3s-p6YgefzO9hKoZ4nOzggW6mU805FLpQIJpb38Iw'
  }
];

export function Teachers({ data }: { data?: any[] }) {
  const teachers = data && data.length > 0 ? data.map(t => ({
    name: t.name,
    role: t.role,
    image: t.image_url || null
  })) : [];

  // Jika tidak ada data sama sekali
  if (teachers.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface-container-low relative" id="guru">
      <div className="mx-auto px-margin-mobile md:px-margin-desktop text-center max-w-4xl">
        <h2 className="text-secondary font-bold text-sm tracking-wider uppercase mb-2">Tim Pengajar</h2>
        <h3 className="font-display-lg text-display-lg text-primary md:text-[40px] md:leading-[48px] font-bold mb-12">Guru Kami</h3>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {teachers.map((teacher, idx) => (
            <div key={idx} className="text-center group w-32 md:w-48">
              <div className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full bg-surface-container-high overflow-hidden border-4 border-white shadow-lg mb-4 group-hover:-translate-y-2 transition-transform duration-300 relative flex items-center justify-center text-on-surface-variant">
                {teacher.image ? (
                  <Image 
                    alt={`Foto ${teacher.name}`} 
                    className="w-full h-full object-cover absolute inset-0" 
                    src={teacher.image} 
                    width={200}
                    height={200}
                  />
                ) : (
                  <span className="material-symbols-outlined text-[64px] md:text-[96px] opacity-30">person</span>
                )}
              </div>
              <h4 className="font-headline-md text-lg text-primary font-bold">{teacher.name}</h4>
              <p className="text-sm text-on-surface-variant">{teacher.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
