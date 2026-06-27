-- Migration Script: Phase 1 Admin Dashboard
-- Jalankan kode ini di SQL Editor Supabase Anda

-- 1. Tambahkan kolom favicon_url di site_settings
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS favicon_url text;

-- Selesai
