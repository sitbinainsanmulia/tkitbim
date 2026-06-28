-- ===========================================================================
-- TK IT BINA INSAN MULIA — MASTER SCHEMA
-- File ini adalah satu-satunya script yang perlu dijalankan di SQL Editor
-- Supabase untuk menyiapkan seluruh database dari nol.
-- ===========================================================================


-- ===========================================================================
-- BAGIAN 1: TABEL-TABEL UTAMA
-- ===========================================================================

-- 1. Pengaturan global website (single-row)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title text,
  hero_subtitle text,
  hero_video_url text,
  hero_image_url text,
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
  map_link text,
  brochure_url text,
  fees_url text,
  whatsapp_message text,
  admin_whatsapp_message text,
  stat_experience text,
  stat_graduates text,
  stat_teachers text,
  stat_awards text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.site_settings (
  hero_title, hero_subtitle, about_text, school_address, school_phone, seo_title, seo_description,
  whatsapp_message, stat_experience, stat_graduates, stat_teachers, stat_awards
) VALUES (
  'Pondasi Kuat untuk Generasi Hebat',
  'TK IT Bina Insan Mulia mengintegrasikan pendidikan karakter Islami dengan pembelajaran modern untuk mencetak generasi yang cerdas, kreatif, dan berakhlak mulia.',
  'TK IT Bina Insan Mulia didirikan dengan visi untuk menjadi taman bermain dan belajar yang Islami, menyenangkan, dan berkualitas. Kami berkomitmen untuk memberikan pendidikan anak usia dini yang komprehensif, memadukan nilai-nilai agama Islam dengan kurikulum nasional yang adaptif.',
  'Jl. Sadang Sari, Bandung, Jawa Barat',
  '+62 8xx-xxxx-xxxx',
  'TK IT Bina Insan Mulia',
  'TK IT Bina Insan Mulia mengintegrasikan pendidikan karakter Islami dengan pembelajaran modern.',
  'Halo, saya ingin bertanya tentang pendaftaran di TK IT Bina Insan Mulia.',
  '10+', '200+', '15+', '5+'
) ON CONFLICT DO NOTHING;

-- 2. Program pendidikan
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

-- 3. Data guru
CREATE TABLE IF NOT EXISTS public.teachers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Galeri foto
CREATE TABLE IF NOT EXISTS public.galleries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  caption text,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Testimoni orang tua
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

-- 6. FAQ
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

-- 7. Jadwal harian
CREATE TABLE IF NOT EXISTS public.schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  time_range text NOT NULL,
  activity text NOT NULL,
  description text,
  icon text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.schedules (time_range, activity, description, icon, display_order) VALUES
('07:30 - 08:00', 'Penyambutan & Bermain Bebas', 'Anak-anak disambut oleh guru dan dibebaskan bermain di area sekolah sambil menunggu teman-teman.', 'front_hand', 1),
('08:00 - 08:30', 'Ikrar & Senam Pagi', 'Membaca ikrar bersama dan senam pagi untuk melatih motorik kasar dan semangat.', 'sports_gymnastics', 2),
('08:30 - 09:30', 'Kegiatan Inti', 'Belajar sambil bermain sesuai dengan tema harian (Sentra Balok, Sentra Alam, Sentra Peran, dll).', 'extension', 3),
('09:30 - 10:00', 'Istirahat & Makan Bersama', 'Membiasakan adab makan Islami dan bersosialisasi dengan teman saat istirahat.', 'restaurant', 4),
('10:00 - 10:45', 'Pembiasaan Agama', 'Hafalan surat pendek, doa harian, hadits, dan pengenalan huruf hijaiyah (Iqra).', 'menu_book', 5),
('10:45 - 11:00', 'Penutup & Persiapan Pulang', 'Evaluasi kegiatan hari ini, berdoa bersama, dan persiapan pulang.', 'home', 6)
ON CONFLICT DO NOTHING;

-- 8. Fasilitas sekolah
CREATE TABLE IF NOT EXISTS public.facilities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.facilities (title, description, image_url) VALUES
('Ruang Kelas Nyaman', 'Ruang kelas full AC dengan warna ceria dan sirkulasi udara baik yang mendukung proses pembelajaran interaktif anak.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'),
('Playground Outdoor', 'Area bermain luas dilengkapi standar keamanan tinggi untuk membantu anak mengeksplorasi sensorik dan motorik kasarnya.', 'https://images.unsplash.com/photo-1601391781223-b1d5bf9221da?q=80&w=2070&auto=format&fit=crop'),
('Perpustakaan Mini', 'Pojok literasi yang dirancang ramah anak dengan beragam koleksi buku bacaan Islami dan ensiklopedia edukatif.', 'https://images.unsplash.com/photo-1533038590840-1c798b3ffb9c?q=80&w=2070&auto=format&fit=crop'),
('UKS & Fasilitas Kesehatan', 'Ruang khusus kesehatan dasar dengan pemantauan tumbuh kembang dan dokter gigi rutin setiap semester.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop'),
('Keamanan & CCTV', 'Pengawasan CCTV 24 jam serta prosedur penjemputan ketat demi memastikan anak pulang dengan aman bersama orang tua.', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop')
ON CONFLICT DO NOTHING;

-- 9. Pendaftaran siswa baru
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


-- ===========================================================================
-- BAGIAN 2: ROW LEVEL SECURITY (RLS)
-- ===========================================================================

-- Aktifkan RLS pada semua tabel
ALTER TABLE public.site_settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galleries        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations    ENABLE ROW LEVEL SECURITY;

-- Akses BACA publik (Landing Page)
CREATE POLICY "Public read site_settings"   ON public.site_settings  FOR SELECT USING (true);
CREATE POLICY "Public read programs"        ON public.programs        FOR SELECT USING (is_active = true);
CREATE POLICY "Public read teachers"        ON public.teachers        FOR SELECT USING (is_active = true);
CREATE POLICY "Public read galleries"       ON public.galleries       FOR SELECT USING (true);
CREATE POLICY "Public read testimonials"    ON public.testimonials    FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faqs"            ON public.faqs            FOR SELECT USING (is_active = true);
CREATE POLICY "Public read schedules"       ON public.schedules       FOR SELECT USING (is_active = true);
CREATE POLICY "Public read facilities"      ON public.facilities      FOR SELECT USING (true);

-- Akses INSERT publik untuk formulir pendaftaran (dibatasi)
CREATE POLICY "Public insert registrations" ON public.registrations
  FOR INSERT
  WITH CHECK (
    status = 'Menunggu'
    AND full_name IS NOT NULL
    AND length(trim(full_name)) >= 3
    AND whatsapp_number IS NOT NULL
    AND length(trim(whatsapp_number)) >= 10
  );

-- Akses penuh Admin (authenticated) untuk semua tabel
CREATE POLICY "Admin manage site_settings"  ON public.site_settings  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage programs"       ON public.programs        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage teachers"       ON public.teachers        FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage galleries"      ON public.galleries       FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage testimonials"   ON public.testimonials    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage faqs"           ON public.faqs            FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage schedules"      ON public.schedules       FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage facilities"     ON public.facilities      FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin manage registrations"  ON public.registrations   FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');


-- ===========================================================================
-- BAGIAN 3: STORAGE (Bucket untuk Upload Gambar)
-- ===========================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Hanya admin yang bisa list file (public bucket sudah bisa diakses via URL)
CREATE POLICY "Storage admin read"    ON storage.objects FOR SELECT  USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
-- Hanya admin yang bisa upload, update, delete
CREATE POLICY "Storage admin insert"  ON storage.objects FOR INSERT  WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Storage admin update"  ON storage.objects FOR UPDATE  USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Storage admin delete"  ON storage.objects FOR DELETE  USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
