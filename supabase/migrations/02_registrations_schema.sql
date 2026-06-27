-- Migration Script: Buat Tabel Registrations
-- Jalankan kode ini di SQL Editor Supabase Anda

CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  nickname text,
  gender text,
  birth_place text,
  birth_date date,
  nik text,
  child_order text,
  religion text,
  address text,
  father_name text,
  father_job text,
  mother_name text,
  mother_job text,
  whatsapp_number text NOT NULL,
  status text DEFAULT 'Menunggu',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Masukkan 1 data dummy agar tabel tidak kosong
INSERT INTO public.registrations (
  full_name, nickname, gender, birth_place, birth_date, nik, child_order, religion, 
  address, father_name, father_job, mother_name, mother_job, whatsapp_number, status
) VALUES (
  'Ahmad Dzakwan', 'Ahmad', 'Laki-laki', 'Jakarta', '2020-05-15', '3171234567890001', '1', 'Islam',
  'Jl. Pendidikan No. 45, Jakarta Selatan', 'Budi Santoso', 'Pegawai Swasta', 'Siti Rahma', 'Ibu Rumah Tangga', '081234567890', 'Menunggu'
) ON CONFLICT DO NOTHING;
