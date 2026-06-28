"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { uuidSchema, safeError } from "@/utils/validation";

// ==========================================
// HELPER — Ekstraksi FormData
// ==========================================

function getString(fd: FormData, key: string): string {
  return (fd.get(key) as string) || "";
}

function getInt(fd: FormData, key: string, fallback = 0): number {
  return parseInt((fd.get(key) as string) || String(fallback));
}

function getBool(fd: FormData, key: string): boolean {
  const val = fd.get(key) as string;
  return val === "true" || val === "on";
}

// ==========================================
// SCHEMAS
// ==========================================

const facilitySchema = z.object({
  title: z.string().min(1, "Judul fasilitas wajib diisi"),
  description: z.string(),
  image_url: z.string(),
});

const programSchema = z.object({
  title: z.string().min(1, "Judul program wajib diisi"),
  description: z.string(),
  age_range: z.string(),
  icon: z.string(),
  display_order: z.number().int(),
  is_active: z.boolean(),
});

const teacherSchema = z.object({
  name: z.string().min(1, "Nama guru wajib diisi"),
  role: z.string(),
  image_url: z.string(),
  display_order: z.number().int(),
  is_active: z.boolean(),
});

const gallerySchema = z.object({
  image_url: z.string().min(1, "URL gambar wajib diisi"),
  caption: z.string(),
  category: z.string(),
  display_order: z.number().int(),
});

const testimonialSchema = z.object({
  parent_name: z.string().min(1, "Nama orang tua wajib diisi"),
  child_name: z.string(),
  content: z.string().min(1, "Isi testimoni wajib diisi"),
  rating: z.number().int().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
  display_order: z.number().int(),
  is_active: z.boolean(),
});

const publicTestimonialSchema = z.object({
  parent_name: z.string().min(2, "Nama orang tua minimal 2 karakter"),
  child_name: z.string(),
  content: z.string().min(10, "Isi testimoni minimal 10 karakter"),
  rating: z.number().int().min(1, "Rating minimal 1").max(5, "Rating maksimal 5"),
});

const faqSchema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
  display_order: z.number().int(),
  is_active: z.boolean(),
});

const scheduleSchema = z.object({
  time_range: z.string().min(1, "Rentang waktu wajib diisi"),
  activity: z.string().min(1, "Nama aktivitas wajib diisi"),
  description: z.string(),
  icon: z.string(),
  display_order: z.number().int(),
  is_active: z.boolean(),
});

const registrationSchema = z.object({
  full_name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  nickname: z.string().optional(),
  gender: z.string().min(1, "Pilih jenis kelamin"),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit").optional().or(z.literal('')),
  child_order: z.string().optional(),
  religion: z.string().optional(),
  address: z.string().optional(),
  father_name: z.string().optional(),
  father_job: z.string().optional(),
  mother_name: z.string().optional(),
  mother_job: z.string().optional(),
  whatsapp_number: z.string().min(10, "Nomor WhatsApp minimal 10 digit"),
});

// ==========================================
// FACILITIES
// ==========================================

export async function addFacility(formData: FormData) {
  const parsed = facilitySchema.safeParse({
    title: getString(formData, "title"),
    description: getString(formData, "description"),
    image_url: getString(formData, "image_url"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("facilities").insert([parsed.data]);
  if (error) return safeError(error, "addFacility");
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

export async function updateFacility(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = facilitySchema.safeParse({
    title: getString(formData, "title"),
    description: getString(formData, "description"),
    image_url: getString(formData, "image_url"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("facilities").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateFacility");
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

export async function deleteFacility(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("facilities").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteFacility");
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

// ==========================================
// SITE SETTINGS
// ==========================================

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    hero_title: getString(formData, "hero_title"),
    hero_subtitle: getString(formData, "hero_subtitle"),
    hero_video_url: getString(formData, "hero_video_url"),
    about_text: getString(formData, "about_text"),
    about_image_url: getString(formData, "about_image_url"),
    school_address: getString(formData, "school_address"),
    school_phone: getString(formData, "school_phone"),
    school_email: getString(formData, "school_email"),
    social_instagram: getString(formData, "social_instagram"),
    social_facebook: getString(formData, "social_facebook"),
    social_youtube: getString(formData, "social_youtube"),
    whatsapp_message: getString(formData, "whatsapp_message"),
    admin_whatsapp_message: getString(formData, "admin_whatsapp_message"),
    stat_experience: getString(formData, "stat_experience"),
    stat_graduates: getString(formData, "stat_graduates"),
    stat_teachers: getString(formData, "stat_teachers"),
    stat_rating: getString(formData, "stat_rating"),
    footer_text: getString(formData, "footer_text"),
    seo_title: getString(formData, "seo_title"),
    seo_description: getString(formData, "seo_description"),
    seo_keywords: getString(formData, "seo_keywords"),
    seo_og_image: getString(formData, "seo_og_image"),
    favicon_url: getString(formData, "favicon_url"),
    logo_url: getString(formData, "logo_url"),
    hero_image_url: getString(formData, "hero_image_url"),
    map_link: getString(formData, "map_link"),
    brochure_url: getString(formData, "brochure_url"),
    fees_url: getString(formData, "fees_url"),
    faq_image_url: getString(formData, "faq_image_url"),
  };

  // Cek apakah ada data di site_settings
  const { data: existing } = await supabase.from("site_settings").select("id").single();
  
  let result;
  if (existing) {
    result = await supabase.from("site_settings").update(data).eq("id", existing.id);
  } else {
    result = await supabase.from("site_settings").insert(data);
  }

  if (result.error) return safeError(result.error, "updateSiteSettings");

  revalidatePath("/");
  revalidatePath("/dashboard/pengaturan");
  
  return { success: true };
}

// ==========================================
// REGISTRATION STATUS
// ==========================================

export async function updateRegistrationStatus(id: string, status: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const statusTrimmed = (status || "").trim();
  if (!statusTrimmed) return { error: "Status wajib diisi" };

  const supabase = await createClient();
  
  const { error } = await supabase
    .from("registrations")
    .update({ status: statusTrimmed })
    .eq("id", idResult.data);
    
  if (error) return safeError(error, "updateRegistrationStatus");
  
  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

// ==========================================
// PROGRAMS
// ==========================================

export async function createProgram(formData: FormData) {
  const parsed = programSchema.safeParse({
    title: getString(formData, "title"),
    description: getString(formData, "description"),
    age_range: getString(formData, "age_range"),
    icon: getString(formData, "icon"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("programs").insert(parsed.data);
  if (error) return safeError(error, "createProgram");

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function updateProgram(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = programSchema.safeParse({
    title: getString(formData, "title"),
    description: getString(formData, "description"),
    age_range: getString(formData, "age_range"),
    icon: getString(formData, "icon"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("programs").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateProgram");

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProgram(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteProgram");

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function toggleProgramStatus(id: string, currentStatus: boolean) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("programs").update({ is_active: !currentStatus }).eq("id", idResult.data);
  if (error) return safeError(error, "toggleProgramStatus");

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// TEACHERS
// ==========================================

export async function createTeacher(formData: FormData) {
  const parsed = teacherSchema.safeParse({
    name: getString(formData, "name"),
    role: getString(formData, "role"),
    image_url: getString(formData, "image_url"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").insert(parsed.data);
  if (error) return safeError(error, "createTeacher");

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function updateTeacher(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = teacherSchema.safeParse({
    name: getString(formData, "name"),
    role: getString(formData, "role"),
    image_url: getString(formData, "image_url"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateTeacher");

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTeacher(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteTeacher");

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function toggleTeacherStatus(id: string, currentStatus: boolean) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").update({ is_active: !currentStatus }).eq("id", idResult.data);
  if (error) return safeError(error, "toggleTeacherStatus");

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// GALLERIES
// ==========================================

export async function createGallery(formData: FormData) {
  const parsed = gallerySchema.safeParse({
    image_url: getString(formData, "image_url"),
    caption: getString(formData, "caption"),
    category: getString(formData, "category"),
    display_order: getInt(formData, "display_order"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("galleries").insert(parsed.data);
  if (error) return safeError(error, "createGallery");

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

export async function updateGallery(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = gallerySchema.safeParse({
    image_url: getString(formData, "image_url"),
    caption: getString(formData, "caption"),
    category: getString(formData, "category"),
    display_order: getInt(formData, "display_order"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("galleries").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateGallery");

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGallery(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("galleries").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteGallery");

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function createTestimonial(formData: FormData) {
  const parsed = testimonialSchema.safeParse({
    parent_name: getString(formData, "parent_name"),
    child_name: getString(formData, "child_name"),
    content: getString(formData, "content"),
    rating: getInt(formData, "rating", 5),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(parsed.data);
  if (error) return safeError(error, "createTestimonial");

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = testimonialSchema.safeParse({
    parent_name: getString(formData, "parent_name"),
    child_name: getString(formData, "child_name"),
    content: getString(formData, "content"),
    rating: getInt(formData, "rating", 5),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateTestimonial");

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteTestimonial");

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function toggleTestimonialStatus(id: string, currentStatus: boolean) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update({ is_active: !currentStatus }).eq("id", idResult.data);
  if (error) return safeError(error, "toggleTestimonialStatus");

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function submitPublicTestimonial(formData: FormData) {
  const parsed = publicTestimonialSchema.safeParse({
    parent_name: getString(formData, "parent_name"),
    child_name: getString(formData, "child_name"),
    content: getString(formData, "content"),
    rating: getInt(formData, "rating", 5),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    ...parsed.data,
    display_order: 0,
    is_active: false,
  });
  if (error) return safeError(error, "submitPublicTestimonial");

  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

// ==========================================
// FAQS
// ==========================================

export async function createFaq(formData: FormData) {
  const parsed = faqSchema.safeParse({
    question: getString(formData, "question"),
    answer: getString(formData, "answer"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(parsed.data);
  if (error) return safeError(error, "createFaq");

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function updateFaq(id: string, formData: FormData) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = faqSchema.safeParse({
    question: getString(formData, "question"),
    answer: getString(formData, "answer"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateFaq");

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFaq(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteFaq");

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function toggleFaqStatus(id: string, currentStatus: boolean) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update({ is_active: !currentStatus }).eq("id", idResult.data);
  if (error) return safeError(error, "toggleFaqStatus");

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

// ==========================================
// REGISTRATIONS
// ==========================================

export async function submitRegistration(formData: FormData) {
  const rawData = {
    full_name: getString(formData, "full_name"),
    nickname: getString(formData, "nickname"),
    gender: getString(formData, "gender"),
    birth_place: getString(formData, "birth_place"),
    birth_date: getString(formData, "birth_date"),
    nik: getString(formData, "nik"),
    child_order: getString(formData, "child_order"),
    religion: getString(formData, "religion"),
    address: getString(formData, "address"),
    father_name: getString(formData, "father_name"),
    father_job: getString(formData, "father_job"),
    mother_name: getString(formData, "mother_name"),
    mother_job: getString(formData, "mother_job"),
    whatsapp_number: getString(formData, "whatsapp_number"),
  };

  const validatedFields = registrationSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const supabase = await createClient();
  
  const data = {
    ...validatedFields.data,
    status: 'Menunggu',
  };

  const { error } = await supabase.from("registrations").insert(data);
  if (error) return safeError(error, "submitRegistration");

  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

export async function deleteRegistration(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("registrations").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteRegistration");

  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

// ==========================================
// SCHEDULES
// ==========================================

export async function createSchedule(formData: FormData) {
  const parsed = scheduleSchema.safeParse({
    time_range: getString(formData, "time_range"),
    activity: getString(formData, "activity"),
    description: getString(formData, "description"),
    icon: getString(formData, "icon"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("schedules").insert(parsed.data);
  if (error) return safeError(error, "createSchedule");

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}

export async function updateSchedule(formData: FormData) {
  const id = getString(formData, "id");
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const parsed = scheduleSchema.safeParse({
    time_range: getString(formData, "time_range"),
    activity: getString(formData, "activity"),
    description: getString(formData, "description"),
    icon: getString(formData, "icon"),
    display_order: getInt(formData, "display_order"),
    is_active: getBool(formData, "is_active"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.from("schedules").update(parsed.data).eq("id", idResult.data);
  if (error) return safeError(error, "updateSchedule");

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSchedule(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("schedules").delete().eq("id", idResult.data);
  if (error) return safeError(error, "deleteSchedule");

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}
