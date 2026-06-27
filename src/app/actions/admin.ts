"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addFacility(formData: FormData) {
  const supabase = await createClient();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
  };

  const { error } = await supabase.from("facilities").insert([data]);
  if (error) return { error: error.message };
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

export async function updateFacility(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image_url: formData.get("image_url") as string,
  };

  const { error } = await supabase.from("facilities").update(data).eq("id", id);
  if (error) return { error: error.message };
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

export async function deleteFacility(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) return { error: error.message };
  
  revalidatePath("/");
  revalidatePath("/dashboard/facilities");
  return { success: true };
}

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    hero_title: formData.get("hero_title") as string,
    hero_subtitle: formData.get("hero_subtitle") as string,
    hero_video_url: formData.get("hero_video_url") as string,
    about_text: formData.get("about_text") as string,
    about_image_url: formData.get("about_image_url") as string,
    school_address: formData.get("school_address") as string,
    school_phone: formData.get("school_phone") as string,
    school_email: formData.get("school_email") as string,
    social_instagram: formData.get("social_instagram") as string,
    social_facebook: formData.get("social_facebook") as string,
    social_youtube: formData.get("social_youtube") as string,
    whatsapp_message: formData.get("whatsapp_message") as string,
    admin_whatsapp_message: formData.get("admin_whatsapp_message") as string,
    stat_experience: formData.get("stat_experience") as string,
    stat_graduates: formData.get("stat_graduates") as string,
    stat_teachers: formData.get("stat_teachers") as string,
    stat_rating: formData.get("stat_rating") as string,
    footer_text: formData.get("footer_text") as string,
    seo_title: formData.get("seo_title") as string,
    seo_description: formData.get("seo_description") as string,
    seo_keywords: formData.get("seo_keywords") as string,
    seo_og_image: formData.get("seo_og_image") as string,
    favicon_url: formData.get("favicon_url") as string,
    logo_url: formData.get("logo_url") as string,
    hero_image_url: formData.get("hero_image_url") as string,
    map_link: formData.get("map_link") as string,
    brochure_url: formData.get("brochure_url") as string,
    fees_url: formData.get("fees_url") as string,
    faq_image_url: formData.get("faq_image_url") as string,
  };

  // Cek apakah ada data di site_settings
  const { data: existing } = await supabase.from("site_settings").select("id").single();
  
  let result;
  if (existing) {
    result = await supabase.from("site_settings").update(data).eq("id", existing.id);
  } else {
    result = await supabase.from("site_settings").insert(data);
  }

  if (result.error) {
    return { error: result.error.message };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/pengaturan");
  
  return { success: true };
}

export async function updateRegistrationStatus(id: string, status: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id);
    
  if (error) {
    return { error: error.message };
  }
  
  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

// --- PROGRAMS CRUD ---

export async function createProgram(formData: FormData) {
  const supabase = await createClient();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    age_range: formData.get("age_range") as string,
    icon: formData.get("icon") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("programs").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function updateProgram(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    age_range: formData.get("age_range") as string,
    icon: formData.get("icon") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("programs").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

export async function toggleProgramStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").update({ is_active: !currentStatus }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/programs");
  revalidatePath("/");
  return { success: true };
}

// --- TEACHERS CRUD ---

export async function createTeacher(formData: FormData) {
  const supabase = await createClient();
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    image_url: formData.get("image_url") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("teachers").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function updateTeacher(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    image_url: formData.get("image_url") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("teachers").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTeacher(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

export async function toggleTeacherStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("teachers").update({ is_active: !currentStatus }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/teachers");
  revalidatePath("/");
  return { success: true };
}

// --- GALLERIES CRUD ---

export async function createGallery(formData: FormData) {
  const supabase = await createClient();
  const data = {
    image_url: formData.get("image_url") as string,
    caption: formData.get("caption") as string,
    category: formData.get("category") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
  };

  const { error } = await supabase.from("galleries").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

export async function updateGallery(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    image_url: formData.get("image_url") as string,
    caption: formData.get("caption") as string,
    category: formData.get("category") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
  };

  const { error } = await supabase.from("galleries").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGallery(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("galleries").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/galleries");
  revalidatePath("/");
  return { success: true };
}

// --- TESTIMONIALS CRUD ---

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  const data = {
    parent_name: formData.get("parent_name") as string,
    child_name: formData.get("child_name") as string,
    content: formData.get("content") as string,
    rating: parseInt((formData.get("rating") as string) || "5"),
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("testimonials").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    parent_name: formData.get("parent_name") as string,
    child_name: formData.get("child_name") as string,
    content: formData.get("content") as string,
    rating: parseInt((formData.get("rating") as string) || "5"),
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("testimonials").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function toggleTestimonialStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update({ is_active: !currentStatus }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function submitPublicTestimonial(formData: FormData) {
  const supabase = await createClient();
  const data = {
    parent_name: formData.get("parent_name") as string,
    child_name: formData.get("child_name") as string,
    content: formData.get("content") as string,
    rating: parseInt((formData.get("rating") as string) || "5"),
    display_order: 0,
    is_active: false,
  };

  const { error } = await supabase.from("testimonials").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/testimonials");
  return { success: true };
}

// --- FAQS CRUD ---

export async function createFaq(formData: FormData) {
  const supabase = await createClient();
  const data = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("faqs").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function updateFaq(id: string, formData: FormData) {
  const supabase = await createClient();
  const data = {
    question: formData.get("question") as string,
    answer: formData.get("answer") as string,
    display_order: parseInt((formData.get("display_order") as string) || "0"),
    is_active: formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("faqs").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

export async function toggleFaqStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update({ is_active: !currentStatus }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/faqs");
  revalidatePath("/");
  return { success: true };
}

// --- REGISTRATIONS ACTIONS ---

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

export async function submitRegistration(formData: FormData) {
  const rawData = {
    full_name: formData.get("full_name") as string,
    nickname: formData.get("nickname") as string,
    gender: formData.get("gender") as string,
    birth_place: formData.get("birth_place") as string,
    birth_date: formData.get("birth_date") as string,
    nik: formData.get("nik") as string,
    child_order: formData.get("child_order") as string,
    religion: formData.get("religion") as string,
    address: formData.get("address") as string,
    father_name: formData.get("father_name") as string,
    father_job: formData.get("father_job") as string,
    mother_name: formData.get("mother_name") as string,
    mother_job: formData.get("mother_job") as string,
    whatsapp_number: formData.get("whatsapp_number") as string,
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
  if (error) return { error: error.message };

  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

export async function deleteRegistration(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("registrations").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/pendaftar");
  return { success: true };
}

// ==========================================
// SCHEDULES
// ==========================================

export async function createSchedule(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    time_range: formData.get("time_range") as string,
    activity: formData.get("activity") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
    display_order: parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "true" || formData.get("is_active") === "on",
  };

  const { error } = await supabase.from("schedules").insert(data);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}

export async function updateSchedule(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  const data = {
    time_range: formData.get("time_range") as string,
    activity: formData.get("activity") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
    display_order: parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "true" || formData.get("is_active") === "on",
  };

  const { error } = await supabase.from("schedules").update(data).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSchedule(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("schedules").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/schedules");
  revalidatePath("/");
  return { success: true };
}
