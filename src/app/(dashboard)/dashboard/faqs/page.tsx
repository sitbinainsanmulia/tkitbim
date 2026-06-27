import { getAdminFaqs } from '@/utils/supabase/queries';
import { FAQList } from '@/components/admin/FAQList';

export const metadata = {
  title: 'Manajemen FAQ - Admin Dashboard',
  description: 'Kelola pertanyaan umum',
};

export const dynamic = "force-dynamic";

export default async function FAQsPage() {
  const faqs = await getAdminFaqs();

  return <FAQList initialFaqs={faqs} />;
}
