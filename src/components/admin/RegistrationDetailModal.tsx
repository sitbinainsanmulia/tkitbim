"use client";

import React from 'react';

interface Registration {
  id: string;
  full_name: string;
  nickname: string;
  gender: string;
  birth_place: string;
  birth_date: string;
  nik: string;
  child_order: string;
  religion: string;
  address: string;
  father_name: string;
  father_job: string;
  mother_name: string;
  mother_job: string;
  whatsapp_number: string;
  status: string;
  created_at: string;
}

export function RegistrationDetailModal({ 
  data, 
  onClose,
  settings
}: { 
  data: Registration; 
  onClose: () => void;
  settings?: any;
}) {
  const generateWhatsAppLink = () => {
    let msg = settings?.admin_whatsapp_message || "Halo Ayah/Bunda [NAMA_ORANGTUA], pendaftaran Ananda [NAMA_ANAK] telah kami terima. Kami akan segera memproses data pendaftaran. Terima kasih!";
    msg = msg.replace(/\[NAMA_ORANGTUA\]/g, data.mother_name || data.father_name || "Bapak/Ibu");
    msg = msg.replace(/\[NAMA_ANAK\]/g, data.nickname || data.full_name || "Ananda");
    
    // Pastikan awalan 0 menjadi 62
    let waNumber = data.whatsapp_number.replace(/\D/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }
    
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const statusColor = 
    data.status === 'Diterima' ? 'bg-secondary-container text-on-secondary-container' : 
    data.status === 'Ditolak' ? 'bg-error/20 text-error' : 
    'bg-surface-container-highest text-on-surface';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-error/10 hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-primary">
            Detail Pendaftaran
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
            {data.status}
          </span>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">face</span>
              Data Calon Siswa
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Nama Lengkap</p>
                <p className="font-bold text-on-surface">{data.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Nama Panggilan</p>
                <p className="font-bold text-on-surface">{data.nickname || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">NIK / No. KIA</p>
                <p className="font-bold text-on-surface">{data.nik || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Jenis Kelamin</p>
                <p className="font-bold text-on-surface">{data.gender}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Tempat, Tanggal Lahir</p>
                <p className="font-bold text-on-surface">{data.birth_place || '-'}, {data.birth_date ? formatDate(data.birth_date) : '-'}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Anak Ke-</p>
                <p className="font-bold text-on-surface">{data.child_order || '-'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-on-surface-variant mb-1">Alamat Tinggal</p>
                <p className="font-bold text-on-surface">{data.address || '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30">
            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">family_restroom</span>
              Data Orang Tua
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Nama Ayah</p>
                <p className="font-bold text-on-surface">{data.father_name || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Pekerjaan Ayah</p>
                <p className="font-bold text-on-surface">{data.father_job || '-'}</p>
              </div>
              <div className="my-2 sm:col-span-2 border-b border-outline-variant/20"></div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Nama Ibu</p>
                <p className="font-bold text-on-surface">{data.mother_name || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-1">Pekerjaan Ibu</p>
                <p className="font-bold text-on-surface">{data.mother_job || '-'}</p>
              </div>
              <div className="sm:col-span-2 mt-2">
                <p className="text-xs text-on-surface-variant mb-1">Nomor WhatsApp Aktif</p>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-on-surface">{data.whatsapp_number}</p>
                  <a 
                    href={generateWhatsAppLink()}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-secondary/10 text-secondary hover:bg-secondary/20 px-2 py-1 rounded-full font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span> Chat WA
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-on-surface-variant">
              Mendaftar pada: {new Date(data.created_at).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
