import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { FadeIn } from "@/components/ui/FadeIn";
import { 
  getSiteSettings, 
  getPrograms, 
  getTeachers, 
  getGalleries, 
  getTestimonials, 
  getFaqs,
  getSchedules,
  getFacilities
} from "@/utils/supabase/queries";

// Dynamic imports for below-the-fold components to improve initial load time
const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About));
const Facilities = dynamic(() => import("@/components/sections/Facilities").then((mod) => mod.Facilities));
const Programs = dynamic(() => import("@/components/sections/Programs").then((mod) => mod.Programs));
const Schedule = dynamic(() => import("@/components/sections/Schedule").then((mod) => mod.Schedule));
const Teachers = dynamic(() => import("@/components/sections/Teachers").then((mod) => mod.Teachers));
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((mod) => mod.Gallery));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((mod) => mod.Testimonials));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const CTA = dynamic(() => import("@/components/sections/CTA").then((mod) => mod.CTA));

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function Home() {
  // Fetch data in parallel
  const [
    siteSettings,
    programs,
    teachers,
    galleries,
    testimonials,
    faqs,
    schedules,
    facilities
  ] = await Promise.all([
    getSiteSettings(),
    getPrograms(),
    getTeachers(),
    getGalleries(),
    getTestimonials(),
    getFaqs(),
    getSchedules(),
    getFacilities()
  ]);

  return (
    <main className="flex-1 flex flex-col">
      <Hero data={siteSettings} />
      <FadeIn delay={200}>
        <Stats data={siteSettings} />
      </FadeIn>
      <FadeIn>
        <About data={siteSettings} />
      </FadeIn>
      <FadeIn>
        <Facilities data={facilities} />
      </FadeIn>
      <FadeIn>
        <Programs data={programs} />
      </FadeIn>
      <FadeIn>
        <Schedule schedules={schedules} />
      </FadeIn>
      <FadeIn>
        <Teachers data={teachers} />
      </FadeIn>
      <FadeIn>
        <Gallery data={galleries} />
      </FadeIn>
      <FadeIn>
        <Testimonials data={testimonials} />
      </FadeIn>
      <FadeIn>
        <FAQ data={faqs} settings={siteSettings} />
      </FadeIn>
      <FadeIn>
        <CTA data={siteSettings} />
      </FadeIn>
      
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": siteSettings?.seo_title || "TK IT Bina Insan Mulia",
            "description": siteSettings?.seo_description || "Membentuk Generasi Islami yang Cerdas & Berkarakter",
            "url": "https://tkitbina.com",
            "logo": siteSettings?.hero_image_url || "",
            "telephone": siteSettings?.school_phone || "",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteSettings?.school_address || "",
              "addressCountry": "ID"
            }
          })
        }}
      />
    </main>
  );
}
