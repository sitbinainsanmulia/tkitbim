'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { safeError } from '@/utils/validation'

// ==========================================
// SCHEMAS
// ==========================================

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
})

const signupSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  nama_anak: z.string().optional(),
  tempat_lahir: z.string().optional(),
  tanggal_lahir: z.string().optional(),
  gender: z.string().optional(),
  alamat: z.string().optional(),
  jenjang: z.string().optional(),
  nama_ortu: z.string().optional(),
  no_wa: z.string().optional(),
})

// ==========================================
// AUTH ACTIONS
// ==========================================

export async function login(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: (formData.get('email') as string) || '',
    password: (formData.get('password') as string) || '',
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    // Pesan spesifik untuk error login yang umum, tanpa mengekspos detail internal
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Email atau kata sandi salah' }
    }
    return safeError(error, 'login')
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const parsed = signupSchema.safeParse({
    email: (formData.get('email') as string) || '',
    password: (formData.get('password') as string) || '',
    nama_anak: formData.get('nama_anak') as string,
    tempat_lahir: formData.get('tempat_lahir') as string,
    tanggal_lahir: formData.get('tanggal_lahir') as string,
    gender: formData.get('gender') as string,
    alamat: formData.get('alamat') as string,
    jenjang: formData.get('jenjang') as string,
    nama_ortu: formData.get('nama_ortu') as string,
    no_wa: formData.get('no_wa') as string,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()

  const { email, password, ...metadata } = parsed.data

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Email sudah terdaftar' }
    }
    return safeError(error, 'signup')
  }

  // After signup, we can redirect or show success
  redirect('/login?message=Pendaftaran berhasil! Silakan masuk menggunakan email dan kata sandi yang baru saja Anda buat.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  redirect('/login')
}
