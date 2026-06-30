import type { Metadata } from "next";
import { Quicksand, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { getSiteSettings } from "@/utils/supabase/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  
  return {
    title: {
      default: settings?.seo_title || "TK IT Bina Insan Mulia",
      template: `%s | ${settings?.seo_title || "TK IT Bina Insan Mulia"}`
    },
    description: settings?.seo_description || "Membentuk Generasi Islami yang Cerdas & Berkarakter",
    keywords: settings?.seo_keywords ? settings.seo_keywords.split(',') : ["TK Islam", "TK IT", "Bina Insan Mulia", "Pendidikan Anak"],
    openGraph: {
      title: settings?.seo_title || "TK IT Bina Insan Mulia",
      description: settings?.seo_description || "Membentuk Generasi Islami yang Cerdas & Berkarakter",
      url: "https://tkitbina.com", // Ganti dengan domain asli nanti
      siteName: settings?.seo_title || "TK IT Bina Insan Mulia",
      images: [
        {
          url: settings?.seo_og_image || "https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
        }
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.seo_title || "TK IT Bina Insan Mulia",
      description: settings?.seo_description || "Membentuk Generasi Islami yang Cerdas & Berkarakter",
      images: [settings?.seo_og_image || "https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
    },
    icons: settings?.favicon_url ? {
      icon: settings.favicon_url,
      shortcut: settings.favicon_url,
      apple: settings.favicon_url,
    } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={cn("h-full", "scroll-smooth", quicksand.variable, plusJakartaSans.variable, "font-sans", geist.variable)}
    >
      <head>
        <link rel="preconnect" href="https://kayfmfpxzosqigpqfwqy.supabase.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "TK IT Bina Insan Mulia",
              "description": "Membentuk Generasi Islami yang Cerdas & Berkarakter",
              "url": "https://tkitbina.com",
              "telephone": "0812-3456-7890",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Pendidikan No. 123",
                "addressLocality": "Kota Pendidikan",
                "addressCountry": "ID"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full font-body-md text-on-surface antialiased bg-background flex flex-col relative">
        {children}
      </body>
    </html>
  );
}
