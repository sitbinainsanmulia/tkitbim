'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Registration specific fields
  const rawData = {
    nama_anak: formData.get('nama_anak'),
    tempat_lahir: formData.get('tempat_lahir'),
    tanggal_lahir: formData.get('tanggal_lahir'),
    gender: formData.get('gender'),
    alamat: formData.get('alamat'),
    jenjang: formData.get('jenjang'),
    nama_ortu: formData.get('nama_ortu'),
    no_wa: formData.get('no_wa'),
  }

  if (!email || !password) {
    return { error: 'Email dan kata sandi wajib diisi' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: rawData
    }
  })

  if (error) {
    return { error: error.message }
  }

  // After signup, we can redirect or show success
  redirect('/login?message=Pendaftaran berhasil! Silakan masuk menggunakan email dan kata sandi yang baru saja Anda buat.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  redirect('/login')
}
