-- Mengaktifkan RLS pada tabel registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 1. Mengizinkan siapa saja (publik) untuk mengirim formulir pendaftaran
CREATE POLICY "Allow public insert to registrations" 
ON public.registrations 
FOR INSERT 
WITH CHECK (true);

-- 2. Mengizinkan admin (authenticated) untuk melihat semua data pendaftar
CREATE POLICY "Allow admin read access to registrations" 
ON public.registrations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- 3. Mengizinkan admin (authenticated) untuk mengubah data pendaftar
CREATE POLICY "Allow admin update access to registrations" 
ON public.registrations 
FOR UPDATE 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 4. Mengizinkan admin (authenticated) untuk menghapus data pendaftar
CREATE POLICY "Allow admin delete access to registrations" 
ON public.registrations 
FOR DELETE 
USING (auth.role() = 'authenticated');
