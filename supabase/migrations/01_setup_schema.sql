-- ===========================================================================
-- SUPABASE SCHEMA SETUP SCRIPT
-- ===========================================================================

-- 1. Tabel site_settings (Menyimpan pengaturan global dalam baris tunggal)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title text,
  hero_subtitle text,
  hero_video_url text,
  about_text text,
  about_image_url text,
  school_address text,
  school_phone text,
  school_email text,
  social_instagram text,
  social_facebook text,
  social_youtube text,
  footer_text text,
  seo_title text,
  seo_description text,
  seo_keywords text,
  seo_og_image text,
  favicon_url text,
  logo_url text,
  hero_image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Masukkan data default untuk site_settings
INSERT INTO public.site_settings (
  hero_title, hero_subtitle, about_text, school_address, school_phone, seo_title, seo_description
) VALUES (
  'Pondasi Kuat untuk Generasi Hebat',
  'TK IT Bina Insan Mulia mengintegrasikan pendidikan karakter Islami dengan pembelajaran modern untuk mencetak generasi yang cerdas, kreatif, dan berakhlak mulia.',
  'TK IT Bina Insan Mulia didirikan dengan visi untuk menjadi taman bermain dan belajar yang Islami, menyenangkan, dan berkualitas. Kami berkomitmen untuk memberikan pendidikan anak usia dini yang komprehensif, memadukan nilai-nilai agama Islam dengan kurikulum nasional yang adaptif.',
  'Jl. Pendidikan No. 123, Kota Pendidikan',
  '0812-3456-7890',
  'TK IT Bina Insan Mulia',
  'TK IT Bina Insan Mulia mengintegrasikan pendidikan karakter Islami dengan pembelajaran modern.'
) ON CONFLICT DO NOTHING;

-- 2. Tabel programs
CREATE TABLE IF NOT EXISTS public.programs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  age_range text,
  icon text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.programs (title, description, age_range, icon, display_order) VALUES
('Kelompok Bermain (KB)', 'Fokus pada pengembangan motorik, sosial, dan pengenalan lingkungan melalui pendekatan bermain yang terarah.', 'Usia 3 - 4 Tahun', 'escalator_warning', 1),
('Taman Kanak-kanak A', 'Pengembangan kognitif dasar, pra-calistung, dan penanaman nilai agama serta kemandirian anak.', 'Usia 4 - 5 Tahun', 'school', 2),
('Taman Kanak-kanak B', 'Persiapan matang menuju jenjang Sekolah Dasar dengan pemantapan calistung dan hafalan surat pendek.', 'Usia 5 - 6 Tahun', 'menu_book', 3)
ON CONFLICT DO NOTHING;

-- 3. Tabel teachers
CREATE TABLE IF NOT EXISTS public.teachers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.teachers (name, role, image_url, display_order) VALUES
('Ustzh. Siti Aminah, S.Pd', 'Kepala Sekolah', 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 1),
('Ustzh. Nur Hidayah, S.Pd.I', 'Wali Kelas TK B', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 2),
('Ustzh. Rina Mulyani, S.Pd', 'Wali Kelas TK A', 'https://images.unsplash.com/photo-1580894732444-8ecded790047?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 3)
ON CONFLICT DO NOTHING;

-- 4. Tabel galleries
CREATE TABLE IF NOT EXISTS public.galleries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  caption text,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.galleries (image_url, caption, category, display_order) VALUES
('https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Kegiatan Mewarnai Bersama', 'Kegiatan', 1),
('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Bermain Sambil Belajar', 'Fasilitas', 2),
('https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Hafalan Al-Quran Pagi', 'Kegiatan', 3),
('https://images.unsplash.com/photo-1537655780520-1e392ead81f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Karya Seni Anak-anak', 'Karya', 4)
ON CONFLICT DO NOTHING;

-- 5. Tabel testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name text NOT NULL,
  child_name text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.testimonials (parent_name, child_name, content, display_order) VALUES
('Bunda Aisyah', 'Ibunda dari Aisyah (TK B)', 'Alhamdulillah sejak sekolah di TK IT BIM, hafalan surat pendek Aisyah berkembang pesat. Guru-gurunya sangat sabar dan telaten.', 1),
('Ayah Budi', 'Ayah dari Budi (TK A)', 'Fasilitas bermainnya lengkap dan aman. Anak saya selalu semangat setiap pagi mau berangkat ke sekolah.', 2),
('Bunda Cinta', 'Ibunda dari Cinta (KB)', 'Pendekatan pembelajarannya sangat menyenangkan. Cinta yang awalnya pemalu sekarang jadi lebih berani dan mandiri.', 3)
ON CONFLICT DO NOTHING;

-- 6. Tabel faqs
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.faqs (question, answer, display_order) VALUES
('Berapa usia minimal untuk mendaftar?', 'Untuk Kelompok Bermain (KB) minimal usia 3 tahun, sedangkan untuk TK minimal usia 4 tahun pada bulan Juli tahun ajaran baru.', 1),
('Apa saja syarat pendaftarannya?', 'Mengisi formulir pendaftaran, menyerahkan fotokopi Akta Kelahiran, fotokopi Kartu Keluarga, dan pas foto anak terbaru.', 2),
('Apakah ada layanan antar jemput?', 'Saat ini kami menyediakan layanan antar jemput khusus untuk radius maksimal 5 km dari lokasi sekolah dengan kuota terbatas.', 3),
('Bagaimana sistem pembelajarannya?', 'Kami menggunakan kurikulum nasional yang dipadukan dengan nilai-nilai Islami, dengan rasio guru dan murid yang ideal (1:10) agar perkembangan tiap anak lebih terpantau.', 4)
ON CONFLICT DO NOTHING;

-- Setup RLS (Row Level Security) - Memungkinkan akses BACA (SELECT) publik untuk Landing Page
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access for programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access for teachers" ON public.teachers FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access for galleries" ON public.galleries FOR SELECT USING (true);
CREATE POLICY "Allow public read access for testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access for faqs" ON public.faqs FOR SELECT USING (is_active = true);

-- Akses Admin (Bisa melakukan segalanya pada tabel-tabel tersebut)
CREATE POLICY "Allow admin to manage site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage teachers" ON public.teachers FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage galleries" ON public.galleries FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin to manage registrations" ON public.registrations FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- 7. Tabel registrations (Pendaftaran Siswa Baru)
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

INSERT INTO public.registrations (
  full_name, nickname, gender, birth_place, birth_date, nik, child_order, religion, 
  address, father_name, father_job, mother_name, mother_job, whatsapp_number, status
) VALUES (
  'Ahmad Dzakwan', 'Ahmad', 'Laki-laki', 'Jakarta', '2020-05-15', '3171234567890001', '1', 'Islam',
  'Jl. Pendidikan No. 45, Jakarta Selatan', 'Budi Santoso', 'Pegawai Swasta', 'Siti Rahma', 'Ibu Rumah Tangga', '081234567890', 'Menunggu'
) ON CONFLICT DO NOTHING;
