-- 1. Tambahkan kolom logo_url ke site_settings
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS logo_url text;

-- 2. Buat Bucket Storage bernama 'public-assets' jika belum ada
INSERT INTO storage.buckets (id, name, public) 
VALUES ('public-assets', 'public-assets', true) 
ON CONFLICT (id) DO NOTHING;

-- 3. Atur Keamanan (RLS) untuk Bucket tersebut
-- Publik bisa melihat gambar apa saja
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'public-assets');

-- Hanya pengguna yang login (Admin) yang bisa mengunggah (INSERT)
CREATE POLICY "Auth Insert" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

-- Hanya pengguna yang login (Admin) yang bisa memperbarui (UPDATE)
CREATE POLICY "Auth Update" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

-- Hanya pengguna yang login (Admin) yang bisa menghapus (DELETE)
CREATE POLICY "Auth Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
