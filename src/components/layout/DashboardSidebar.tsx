"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/dashboard/pendaftar", label: "Pendaftar", icon: "group" },
    { href: "/dashboard/pengaturan", label: "Pengaturan Web", icon: "settings" },
    { href: "/dashboard/programs", label: "Program", icon: "school" },
    { href: "/dashboard/facilities", label: "Fasilitas", icon: "foundation" },
    { href: "/dashboard/schedules", label: "Jadwal", icon: "schedule" },
    { href: "/dashboard/teachers", label: "Guru", icon: "badge" },
    { href: "/dashboard/galleries", label: "Galeri", icon: "photo_library" },
    { href: "/dashboard/testimonials", label: "Testimoni", icon: "reviews" },
    { href: "/dashboard/faqs", label: "FAQ", icon: "quiz" },
    { href: "/dashboard/admins", label: "Manajemen Admin", icon: "manage_accounts" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <>
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-outline-variant/30 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
          <span className="font-headline-md text-[18px] font-bold text-primary">Admin TK IT</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = link.href === "/dashboard" 
              ? pathname === link.href 
              : pathname.startsWith(link.href);
              
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-label-sm font-bold ${
                  isActive 
                    ? "bg-primary-container/20 text-primary-fixed-variant" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-outline-variant/30">
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error-container/50 transition-colors font-label-sm font-bold"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal (SweetAlert Style) */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-error-container/30 text-error rounded-full flex items-center justify-center mb-4 border-[3px] border-error-container">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>error</span>
            </div>
            
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">Keluar dari Akun?</h3>
            <p className="font-body-md text-on-surface-variant mb-8">
              Apakah Anda yakin ingin keluar dari halaman admin? Anda harus login kembali untuk mengakses panel ini.
            </p>
            
            <div className="w-full flex gap-3">
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="flex-1 py-3 px-4 rounded-xl border border-outline-variant text-on-surface font-label-sm font-bold hover:bg-surface-container-low transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-3 px-4 rounded-xl bg-error text-white font-label-sm font-bold hover:bg-error/90 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? 'Keluar...' : 'Ya, Keluar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
