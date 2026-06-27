ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_experience text DEFAULT '10+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_graduates text DEFAULT '100+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_teachers text DEFAULT '15+';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS stat_rating text DEFAULT '4.9';
