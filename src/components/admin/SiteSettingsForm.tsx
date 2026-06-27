"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/app/actions/admin";
import { uploadImageToStorage } from "@/utils/supabase/storage";
import Image from "next/image";

export function SiteSettingsForm({ initialData }: { initialData: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Helper function untuk memproses file upload
      const processImage = async (fieldName: string, existingUrl: string) => {
        const file = formData.get(fieldName) as File;
        if (file && file.size > 0) {
          const url = await uploadImageToStorage(file, "public-assets", "settings");
          formData.set(fieldName, url); // Timpa objek file dengan URL string
        } else {
          formData.set(fieldName, existingUrl || ""); // Pertahankan URL lama
        }
      };

      // Proses semua field gambar
      await processImage("logo_url", initialData?.logo_url);
      await processImage("favicon_url", initialData?.favicon_url);
      await processImage("about_image_url", initialData?.about_image_url);
      await processImage("seo_og_image", initialData?.seo_og_image);
      await processImage("hero_image_url", initialData?.hero_image_url);
      await processImage("faq_image_url", initialData?.faq_image_url);
      
      // Khusus untuk dokumen PDF/Brosur & Biaya
      const brochureFile = formData.get("brochure_url") as File;
      if (brochureFile && brochureFile.size > 0) {
        const url = await uploadImageToStorage(brochureFile, "public-assets", "documents");
        formData.set("brochure_url", url);
      } else {
        formData.set("brochure_url", initialData?.brochure_url || "");
      }

      const feesFile = formData.get("fees_url") as File;
      if (feesFile && feesFile.size > 0) {
        const url = await uploadImageToStorage(feesFile, "public-assets", "documents");
        formData.set("fees_url", url);
      } else {
        formData.set("fees_url", initialData?.fees_url || "");
      }

      const result = await updateSiteSettings(formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: "Pengaturan berhasil disimpan!" });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || "Gagal mengunggah gambar" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant/30 max-w-4xl">
      {message && (
        <div className={`p-4 rounded-xl font-medium ${message.type === 'success' ? 'bg-primary-container text-primary-fixed-variant' : 'bg-error-container text-error'}`}>
          {message.text}
        </div>
      )}
      
      {/* 1. Header & Logo Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">Identitas Utama & Hero</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2 flex items-center gap-6 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            {initialData?.logo_url ? (
              <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-white border border-outline-variant/50 flex-shrink-0">
                <Image src={initialData.logo_url} alt="Logo" fill className="object-contain p-2" unoptimized />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant">image</span>
              </div>
            )}
            <div className="flex-1 space-y-1">
              <label className="text-sm font-bold text-on-surface">Logo Website (Untuk Navbar & Footer)</label>
              <input type="file" name="logo_url" accept="image/*" className="w-full p-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
              <p className="text-xs text-on-surface-variant">Biarkan kosong jika tidak ingin mengubah logo saat ini.</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Hero Title</label>
            <input type="text" name="hero_title" defaultValue={initialData?.hero_title} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Hero Subtitle</label>
            <input type="text" name="hero_subtitle" defaultValue={initialData?.hero_subtitle} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">About Text</label>
            <textarea name="about_text" defaultValue={initialData?.about_text} rows={4} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Hero Video URL</label>
            <input type="text" name="hero_video_url" defaultValue={initialData?.hero_video_url} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Opsional (Link YouTube/Video)" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Gambar Hero/Banner (Opsional)</label>
            <div className="flex items-center gap-4">
              {initialData?.hero_image_url && (
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/30">
                  <Image src={initialData.hero_image_url} alt="Current hero" fill className="object-cover" unoptimized />
                </div>
              )}
              <input type="file" name="hero_image_url" accept="image/*" className="w-full p-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Gambar Bagian FAQ (Opsional)</label>
            <div className="flex items-center gap-4">
              {initialData?.faq_image_url && (
                <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/30">
                  <Image src={initialData.faq_image_url} alt="Current faq image" fill className="object-cover" unoptimized />
                </div>
              )}
              <input type="file" name="faq_image_url" accept="image/*" className="w-full p-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
            </div>
          </div>
          
          <div className="space-y-2 md:col-span-2 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <label className="text-sm font-bold text-on-surface">Gambar Tentang Kami (About Image)</label>
            {initialData?.about_image_url && (
              <div className="w-full h-32 relative rounded-lg overflow-hidden mb-2 bg-surface-container">
                <Image src={initialData.about_image_url} alt="About Image" fill className="object-cover" unoptimized />
              </div>
            )}
            <input type="file" name="about_image_url" accept="image/*" className="w-full p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Statistik Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">Angka Statistik (Bagian Beranda)</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Tahun Pengalaman</label>
            <input type="text" name="stat_experience" defaultValue={initialData?.stat_experience || "10+"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Lulusan</label>
            <input type="text" name="stat_graduates" defaultValue={initialData?.stat_graduates || "100+"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Guru Berkompeten</label>
            <input type="text" name="stat_teachers" defaultValue={initialData?.stat_teachers || "15+"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Rating Orang Tua</label>
            <input type="text" name="stat_rating" defaultValue={initialData?.stat_rating || "4.9"} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
        </div>
      </div>

      {/* 2. Contact Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">Kontak & Sosial Media</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">No. WhatsApp</label>
            <input type="text" name="school_phone" defaultValue={initialData?.school_phone} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">Pesan Default WhatsApp (Halaman Publik)</label>
            <textarea name="whatsapp_message" defaultValue={initialData?.whatsapp_message || "Halo Admin TK IT Bina Insan Mulia, saya ingin bertanya tentang informasi pendaftaran."} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Pesan otomatis ketika seseorang mengklik tombol WhatsApp" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">Template Pesan WhatsApp Admin ke Orang Tua</label>
            <p className="text-xs text-on-surface-variant mb-2">Gunakan <code className="bg-surface-container px-1 py-0.5 rounded text-primary">[NAMA_ORANGTUA]</code> dan <code className="bg-surface-container px-1 py-0.5 rounded text-primary">[NAMA_ANAK]</code> agar otomatis diisi dengan nama yang sesuai.</p>
            <textarea name="admin_whatsapp_message" defaultValue={initialData?.admin_whatsapp_message || "Halo Ayah/Bunda [NAMA_ORANGTUA], pendaftaran Ananda [NAMA_ANAK] telah kami terima. Kami akan segera memproses data pendaftaran. Terima kasih!"} rows={3} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Template pesan ketika menghubungi orang tua" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Email</label>
            <input type="text" name="school_email" defaultValue={initialData?.school_email} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">Alamat Lengkap</label>
            <textarea name="school_address" defaultValue={initialData?.school_address} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">Google Maps URL (Buka Peta)</label>
            <input type="url" name="map_link" defaultValue={initialData?.map_link} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" placeholder="Contoh: https://maps.google.com/..." />
          </div>
          <div className="space-y-2 md:col-span-1 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <label className="text-sm font-bold text-on-surface">File Brosur (PDF/Gambar)</label>
            {initialData?.brochure_url && (
              <div className="mb-2 text-sm text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Brosur saat ini terunggah
              </div>
            )}
            <input type="file" name="brochure_url" accept=".pdf,image/*" className="w-full p-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>
          <div className="space-y-2 md:col-span-1 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <label className="text-sm font-bold text-on-surface">File Rincian Biaya (PDF/Gambar)</label>
            {initialData?.fees_url && (
              <div className="mb-2 text-sm text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">check_circle</span>
                Biaya saat ini terunggah
              </div>
            )}
            <input type="file" name="fees_url" accept=".pdf,image/*" className="w-full p-2 text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Instagram URL</label>
            <input type="text" name="social_instagram" defaultValue={initialData?.social_instagram} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-on-surface">Facebook URL</label>
            <input type="text" name="social_facebook" defaultValue={initialData?.social_facebook} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">YouTube URL</label>
            <input type="text" name="social_youtube" defaultValue={initialData?.social_youtube} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
        </div>
      </div>

      {/* 3. Footer Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">Footer</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">Footer Text (Deskripsi Singkat)</label>
            <textarea name="footer_text" defaultValue={initialData?.footer_text} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
        </div>
      </div>

      {/* 4. SEO Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary border-b border-outline-variant/30 pb-2">SEO & Metadata</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">SEO Title</label>
            <input type="text" name="seo_title" defaultValue={initialData?.seo_title} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          
          <div className="space-y-2 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <label className="text-sm font-bold text-on-surface">Favicon (Ikon Tab Browser)</label>
            {initialData?.favicon_url && (
              <div className="w-12 h-12 relative rounded mb-2 bg-white">
                <Image src={initialData.favicon_url} alt="Favicon" fill className="object-contain" unoptimized />
              </div>
            )}
            <input type="file" name="favicon_url" accept="image/*,.ico" className="w-full text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary cursor-pointer" />
          </div>

          <div className="space-y-2 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <label className="text-sm font-bold text-on-surface">SEO OG Image (Thumbnail Sosmed)</label>
            {initialData?.seo_og_image && (
              <div className="w-full h-16 relative rounded mb-2 bg-surface-container">
                <Image src={initialData.seo_og_image} alt="OG Image" fill className="object-cover" unoptimized />
              </div>
            )}
            <input type="file" name="seo_og_image" accept="image/*" className="w-full text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary cursor-pointer" />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">SEO Description</label>
            <textarea name="seo_description" defaultValue={initialData?.seo_description} rows={2} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-bold text-on-surface">SEO Keywords (Pisahkan dengan koma)</label>
            <input type="text" name="seo_keywords" defaultValue={initialData?.seo_keywords} className="w-full p-3 rounded-xl border border-outline-variant/50 focus:outline-primary" />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? (
            <span className="material-symbols-outlined animate-spin">refresh</span>
          ) : (
            <span className="material-symbols-outlined">save</span>
          )}
          {isLoading ? "Menyimpan & Mengunggah..." : "Simpan Pengaturan"}
        </button>
      </div>
    </form>
  );
}
