-- Migration Script: RLS untuk Admin (Beri akses penuh kepada admin)
-- Jalankan kode ini di SQL Editor Supabase Anda

-- 1. Akses Admin untuk site_settings
CREATE POLICY "Allow admin to manage site_settings" 
ON public.site_settings FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 2. Akses Admin untuk programs
CREATE POLICY "Allow admin to manage programs" 
ON public.programs FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 3. Akses Admin untuk teachers
CREATE POLICY "Allow admin to manage teachers" 
ON public.teachers FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 4. Akses Admin untuk galleries
CREATE POLICY "Allow admin to manage galleries" 
ON public.galleries FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 5. Akses Admin untuk testimonials
CREATE POLICY "Allow admin to manage testimonials" 
ON public.testimonials FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 6. Akses Admin untuk faqs
CREATE POLICY "Allow admin to manage faqs" 
ON public.faqs FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 7. Akses Admin untuk registrations
CREATE POLICY "Allow admin to manage registrations" 
ON public.registrations FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');
