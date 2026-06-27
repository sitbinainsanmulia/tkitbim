import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

/**
 * Mengunggah file ke Supabase Storage dan mengembalikan public URL-nya
 * File gambar akan dikonversi menjadi .webp sebelum diunggah
 * @param file Objek File yang akan diunggah
 * @param bucketName Nama bucket di Supabase (default: public-assets)
 * @param folderName Folder tujuan di dalam bucket (opsional)
 * @returns Public URL gambar atau throw error
 */
export async function uploadImageToStorage(file: File, bucketName = "public-assets", folderName = "uploads") {
  const supabase = createClient();
  
  // Opsi Kompresi dan Konversi ke WebP
  const options = {
    maxSizeMB: 1, // Maksimal 1 MB (bisa dikecilkan jika perlu)
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp" as string,
  };

  let fileToUpload = file;
  let fileExt = file.name.split('.').pop() || 'webp';

  try {
    // Kompresi jika file adalah gambar
    if (file.type.startsWith('image/')) {
      fileToUpload = await imageCompression(file, options);
      fileExt = 'webp';
    }
  } catch (error) {
    console.error("Gagal mengkompres gambar:", error);
    // Jika gagal kompres, gunakan file asli
  }

  // Buat nama unik untuk file agar tidak menimpa file lain
  const fileName = `${folderName}/${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileToUpload, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(error.message);
  }

  // Dapatkan Public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
