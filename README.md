# TK IT Bina Insan Mulia

Website resmi TK IT Bina Insan Mulia — platform informasi sekolah sekaligus sistem pendaftaran siswa baru secara online. Dibangun menggunakan Next.js dan Supabase.

## Tentang Proyek

Website ini dibuat untuk memudahkan calon wali murid mendapatkan informasi tentang sekolah, mulai dari program pendidikan, fasilitas, jadwal kegiatan, hingga proses pendaftaran siswa baru. Di sisi admin, tersedia dashboard untuk mengelola seluruh konten website dan data pendaftar.

### Fitur Utama

**Halaman Publik**
- Landing page dengan informasi lengkap tentang sekolah
- Halaman pendaftaran siswa baru secara online
- Halaman ulasan / testimoni dari wali murid
- SEO yang sudah dikonfigurasi (Open Graph, Twitter Card, Schema.org)

**Dashboard Admin**
- Manajemen data pendaftar siswa baru
- Kelola program pendidikan dan jadwal kegiatan
- Kelola data guru/pengajar
- Manajemen galeri foto dan fasilitas sekolah
- Kelola FAQ dan testimoni
- Manajemen admin dan pengaturan situs

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Lucide Icons, Material Symbols
- **Backend & Database**: Supabase (Auth, Storage, Database)
- **Validasi**: Zod
- **Lainnya**: SweetAlert2, browser-image-compression, xlsx (export data)

## Cara Menjalankan

### Prasyarat

- Node.js versi 18 atau lebih baru
- Akun Supabase (gratis bisa)
- npm, yarn, atau pnpm

### Langkah-langkah

1. Clone repository ini

```bash
git clone <url-repository>
cd tkitbim
```

2. Install dependencies

```bash
npm install
```

3. Salin file environment dan isi dengan kredensial Supabase kamu

```bash
cp .env.example .env.local
```

Buka `.env.local` lalu isi:

```
NEXT_PUBLIC_SUPABASE_URL=url_supabase_kamu
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key_kamu
SUPABASE_SERVICE_ROLE_KEY=service_role_key_kamu
```

Ketiga nilai ini bisa didapat dari halaman **Project Settings > API** di dashboard Supabase.

4. Jalankan migration database (jika ada)

```bash
npx supabase db push
```

5. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
src/
├── app/
│   ├── (auth)/          # Halaman login
│   ├── (dashboard)/     # Dashboard admin (protected)
│   │   └── dashboard/
│   │       ├── admins/        # Kelola admin
│   │       ├── facilities/    # Kelola fasilitas
│   │       ├── faqs/          # Kelola FAQ
│   │       ├── galleries/     # Kelola galeri
│   │       ├── pendaftar/     # Data pendaftar
│   │       ├── pengaturan/    # Pengaturan situs
│   │       ├── programs/      # Program pendidikan
│   │       ├── schedules/     # Jadwal kegiatan
│   │       ├── teachers/      # Data guru
│   │       └── testimonials/  # Testimoni
│   ├── (public)/        # Halaman publik (landing, pendaftaran, ulasan)
│   ├── actions/         # Server Actions
│   └── api/             # API Routes
├── components/          # Komponen UI yang bisa dipakai ulang
├── lib/                 # Konfigurasi library (Supabase client, utils)
└── utils/               # Helper functions dan query Supabase
```

## Deployment

Website ini di-deploy menggunakan Vercel. Pastikan environment variables sudah diatur di dashboard Vercel sebelum deploy.

```bash
npm run build
```

## Lisensi

Proyek ini bersifat privat dan dikembangkan oleh Kaizen Digilabs.
