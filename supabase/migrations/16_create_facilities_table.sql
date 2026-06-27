-- Create Facilities table
CREATE TABLE IF NOT EXISTS public.facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Policies for public access (Read Only)
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.facilities FOR SELECT 
USING ( true );

-- Policies for admin access (All Operations)
CREATE POLICY "Admins can do everything." 
ON public.facilities FOR ALL 
USING ( (auth.role() = 'authenticated') );

-- Seed some initial data
INSERT INTO public.facilities (title, description, image_url) VALUES 
('Ruang Kelas Nyaman', 'Ruang kelas full AC dengan warna ceria dan sirkulasi udara baik yang mendukung proses pembelajaran interaktif anak.', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'),
('Playground Outdoor', 'Area bermain luas dilengkapi standar keamanan tinggi untuk membantu anak mengeksplorasi sensorik dan motorik kasarnya.', 'https://images.unsplash.com/photo-1601391781223-b1d5bf9221da?q=80&w=2070&auto=format&fit=crop'),
('Perpustakaan Mini', 'Pojok literasi yang dirancang ramah anak dengan beragam koleksi buku bacaan Islami dan ensiklopedia edukatif.', 'https://images.unsplash.com/photo-1533038590840-1c798b3ffb9c?q=80&w=2070&auto=format&fit=crop'),
('UKS & Fasilitas Kesehatan', 'Ruang khusus kesehatan dasar dengan pemantauan tumbuh kembang dan dokter gigi rutin setiap semester.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop'),
('Keamanan & CCTV', 'Pengawasan CCTV 24 jam serta prosedur penjemputan ketat demi memastikan anak pulang dengan aman bersama orang tua.', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop')
ON CONFLICT DO NOTHING;
