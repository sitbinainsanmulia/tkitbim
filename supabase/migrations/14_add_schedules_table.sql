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

ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for schedules" ON public.schedules FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin to manage schedules" ON public.schedules FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
