"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { login } from '@/app/actions/auth';

function LoginForm() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('message');
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMsg(null);
    const result = await login(formData);
    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768 && cardRef.current) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm font-bold bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-outline-variant/30 shadow-sm hover:-translate-x-1"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-12 pb-16 px-margin-mobile min-h-screen">
        {/* Organic Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-fixed opacity-20 organic-blob -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-secondary-fixed opacity-30 organic-blob -z-10"></div>
        <div className="absolute top-[20%] right-[10%] w-16 h-16 bg-tertiary-fixed opacity-40 rounded-full -z-10 animate-bounce" style={{ animationDuration: '4s' }}></div>

        {/* Login Card */}
        <div 
          ref={cardRef} 
          className="w-full max-w-md bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,103,103,0.1)] border border-primary-fixed/30 relative z-10 transition-transform duration-200 ease-out perspective-1000"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* School Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20 overflow-hidden">
              <Image 
                width={80}
                height={80}
                className="w-full h-full object-cover" 
                alt="Logo Sekolah" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK1NPq-Y56ZUGEnXHAtr5wsNqkaqh8muGbZccoOej0dj5ADO3Xn2MR2naG_hoCGLbU4lA2zg6G2_xQBrn49KsEJ_bBNyqCccgUDC7EdGjz8oZYLnif6kAYnO89DC4HjeibJph665HZCTF4xg5Iph-OPe8xZgb8cqWuiP8nlD4pxeHgs8gJSo4mJDqqBPIeSwFtD79BQ6zQB4BPZJ-7QV7WOGjpa6c-D-8FLsGKBxPjqQY_sO-AL0-rUQ4kQAhoVw7ON8uGPVDI_g"
              />
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Selamat Datang Kembali</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Silakan masuk untuk mengakses akun Anda</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-primary-container text-on-primary-container rounded-xl text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              {successMessage}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" action={handleSubmit}>
            {/* Email/Username Input */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface ml-1">Email atau Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">person</span>
                <input 
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-2 border-transparent focus:border-secondary-container focus:ring-0 rounded-2xl transition-all font-body-md text-body-md outline-none" 
                  placeholder="Masukkan email" 
                  type="email" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface ml-1">Kata Sandi</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">lock</span>
                <input 
                  name="password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-surface-container-low border-2 border-transparent focus:border-secondary-container focus:ring-0 rounded-2xl transition-all font-body-md text-body-md outline-none" 
                  placeholder="Masukkan kata sandi" 
                  type={showPassword ? "text" : "password"} 
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary" 
                  onClick={() => setShowPassword(!showPassword)} 
                  type="button"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="w-5 h-5 rounded-md border-2 border-outline text-primary focus:ring-primary/20" type="checkbox" />
                <span className="text-on-surface-variant group-hover:text-primary transition-colors">Ingat Saya</span>
              </label>
              <a className="text-primary hover:text-secondary-container font-bold transition-colors" href="#">Lupa Kata Sandi?</a>
            </div>

            {/* Primary Button */}
            <button 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-2xl transition-all button-3d-shadow active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
            >
              <span>{isLoading ? 'Memproses...' : 'Masuk ke Akun'}</span>
              {!isLoading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
            </button>
          </form>
        </div>

        {/* Decorative Elements for Desktop */}
        <div className="hidden lg:block absolute left-gutter top-1/2 -translate-y-1/2 opacity-20">
          <span className="material-symbols-outlined text-[120px] text-primary rotate-12">school</span>
        </div>
        <div className="hidden lg:block absolute right-gutter bottom-gutter opacity-20">
          <span className="material-symbols-outlined text-[100px] text-secondary -rotate-12">auto_stories</span>
        </div>
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat...</div>}>
      <LoginForm />
    </Suspense>
  );
}
