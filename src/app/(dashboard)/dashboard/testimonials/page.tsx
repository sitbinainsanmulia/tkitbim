import { getAdminTestimonials } from '@/utils/supabase/queries';
import { TestimonialsList } from '@/components/admin/TestimonialsList';

export const metadata = {
  title: 'Manajemen Testimoni - Admin Dashboard',
  description: 'Kelola ulasan orang tua wali murid',
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getAdminTestimonials();

  return <TestimonialsList initialTestimonials={testimonials} />;
}
