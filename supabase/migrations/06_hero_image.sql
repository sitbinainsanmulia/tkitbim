-- Migration Script: Tambah Hero Image
-- Jalankan kode ini di SQL Editor Supabase Anda

-- 1. Tambahkan kolom hero_image_url ke site_settings
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS hero_image_url text;
