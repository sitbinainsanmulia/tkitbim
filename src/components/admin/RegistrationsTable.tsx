"use client";

import { useState } from "react";
import { updateRegistrationStatus } from "@/app/actions/admin";

export interface Registration {
  id: string;
  full_name: string;
  nickname?: string;
  gender: string;
  birth_place?: string;
  birth_date?: string;
  nik?: string;
  child_order?: string;
  religion?: string;
  address?: string;
  father_name?: string;
  father_job?: string;
  mother_name?: string;
  mother_job?: string;
  whatsapp_number: string;
  status: string;
  created_at: string;
}

export function RegistrationsTable({ initialData, settings }: { initialData: Registration[], settings?: any }) {
  const [data, setData] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    const result = await updateRegistrationStatus(id, newStatus);
    
    if (result.success) {
      setData(data.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } else {
      alert("Gagal mengubah status pendaftar: " + result.error);
    }
    setIsUpdating(null);
  };

  const generateWhatsAppLink = (item: Registration) => {
    let msg = settings?.admin_whatsapp_message || "Halo Ayah/Bunda [NAMA_ORANGTUA], pendaftaran Ananda [NAMA_ANAK] telah kami terima. Kami akan segera memproses data pendaftaran. Terima kasih!";
    msg = msg.replace(/\[NAMA_ORANGTUA\]/g, item.mother_name || item.father_name || "Bapak/Ibu");
    msg = msg.replace(/\[NAMA_ANAK\]/g, item.nickname || item.full_name || "Ananda");
    
    // Pastikan awalan 0 menjadi 62
    let waNumber = item.whatsapp_number.replace(/\D/g, '');
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }
    
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleExportExcel = () => {
    import('xlsx').then(XLSX => {
      const dataToExport = data.map(row => ({
        "Tanggal Daftar": new Date(row.created_at).toLocaleDateString('id-ID'),
        "Nama Anak": row.full_name,
        "Nama Panggilan": row.nickname,
        "Jenis Kelamin": row.gender,
        "Tempat Lahir": row.birth_place,
        "Tanggal Lahir": row.birth_date,
        "NIK": row.nik ? `'${row.nik}` : '', // Add quote to prevent Excel scientific notation
        "Anak Ke": row.child_order,
        "Agama": row.religion,
        "Alamat": row.address,
        "Nama Ayah": row.father_name,
        "Pekerjaan Ayah": row.father_job,
        "Nama Ibu": row.mother_name,
        "Pekerjaan Ibu": row.mother_job,
        "No. WhatsApp": row.whatsapp_number,
        "Status": row.status
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      
      // Auto-size columns
      const colWidths = [
        { wch: 15 }, // Tanggal Daftar
        { wch: 25 }, // Nama Anak
        { wch: 15 }, // Nama Panggilan
        { wch: 15 }, // Jenis Kelamin
        { wch: 15 }, // Tempat Lahir
        { wch: 15 }, // Tanggal Lahir
        { wch: 20 }, // NIK
        { wch: 10 }, // Anak Ke
        { wch: 15 }, // Agama
        { wch: 40 }, // Alamat
        { wch: 20 }, // Nama Ayah
        { wch: 20 }, // Pekerjaan Ayah
        { wch: 20 }, // Nama Ibu
        { wch: 20 }, // Pekerjaan Ibu
        { wch: 15 }, // No. WhatsApp
        { wch: 15 }, // Status
      ];
      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");
      
      XLSX.writeFile(workbook, `Data_Pendaftar_TK_IT_${new Date().toISOString().split('T')[0]}.xlsx`);
    }).catch(err => {
      console.error("Failed to load xlsx module", err);
      alert("Gagal mengunduh file Excel.");
    });
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'diterima': return 'bg-primary/20 text-primary-fixed-variant';
      case 'ditolak': return 'bg-error-container text-error';
      default: return 'bg-secondary-container/50 text-on-secondary-container';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input type="text" placeholder="Cari nama atau NIK..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant/50 focus:outline-primary bg-surface" />
        </div>
        <button onClick={handleExportExcel} className="bg-secondary text-on-secondary px-6 py-2 rounded-xl font-bold hover:bg-secondary/90 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Export Excel (.xlsx)
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-sm text-on-surface-variant uppercase tracking-wider">
                <th className="p-4 font-bold">Tanggal</th>
                <th className="p-4 font-bold">Nama Anak</th>
                <th className="p-4 font-bold">Orang Tua & Kontak</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    Belum ada data pendaftar.
                  </td>
                </tr>
              ) : data.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 whitespace-nowrap text-sm">
                    {new Date(item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-primary">{item.full_name}</p>
                    <p className="text-xs text-on-surface-variant">NIK: {item.nik}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{item.father_name} / {item.mother_name}</p>
                    <a 
                      href={generateWhatsAppLink(item)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md hover:bg-secondary/20 transition mt-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      {item.whatsapp_number}
                    </a>
                  </td>
                  <td className="p-4">
                    <select 
                      value={item.status || "Menunggu"} 
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      disabled={isUpdating === item.id}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border-none cursor-pointer outline-none ${getStatusColor(item.status || "Menunggu")} ${isUpdating === item.id ? 'opacity-50' : ''}`}
                    >
                      <option value="Menunggu">Menunggu</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto hover:bg-primary/20 transition-colors" title="Lihat Detail">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
