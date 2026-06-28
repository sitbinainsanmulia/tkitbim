-- ===========================================================================
-- MIGRATION: Security Fixes
-- Fixes for Supabase Linter warnings:
--   1. rls_policy_always_true  — registrations INSERT policy too permissive
--   2. public_bucket_allows_listing — storage SELECT allows file listing
-- ===========================================================================


-- =========================================================================
-- FIX 1: Restrict public INSERT on registrations
-- =========================================================================
-- Sebelumnya: WITH CHECK (true) — siapa saja bisa INSERT apapun.
-- Sesudahnya: Hanya izinkan INSERT jika field wajib terisi dan status = 'Menunggu'.
-- Ini mencegah penyerang memanipulasi status pendaftaran langsung via API.

-- Drop policy lama (handle kedua kemungkinan nama policy)
DROP POLICY IF EXISTS "Public insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow public insert to registrations" ON public.registrations;

-- Buat policy baru yang lebih ketat
CREATE POLICY "Public insert registrations" ON public.registrations
  FOR INSERT
  WITH CHECK (
    -- Hanya boleh membuat pendaftaran dengan status 'Menunggu'
    status = 'Menunggu'
    -- Field wajib harus terisi
    AND full_name IS NOT NULL
    AND length(trim(full_name)) >= 3
    AND whatsapp_number IS NOT NULL
    AND length(trim(whatsapp_number)) >= 10
  );


-- =========================================================================
-- FIX 2: Remove broad public SELECT on storage.objects
-- =========================================================================
-- Bucket 'public-assets' sudah bersifat public, artinya file bisa diakses
-- langsung via URL tanpa perlu SELECT policy. Policy SELECT yang lama
-- memungkinkan siapa saja me-list SEMUA file di bucket via API.
--
-- Fix: Hapus policy public SELECT, tambahkan SELECT khusus admin saja.

-- Drop policy lama (handle kedua kemungkinan nama policy)
DROP POLICY IF EXISTS "Storage public read" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Hanya admin (authenticated) yang bisa list file via API
CREATE POLICY "Storage admin read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
