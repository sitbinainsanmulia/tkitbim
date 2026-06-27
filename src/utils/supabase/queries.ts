import { createClient } from "./server";

export async function getFacilities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .order("created_at", { ascending: true });
    
  if (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
  return data;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .single();
    
  if (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
  return data;
}

export async function getSchedules() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching schedules:", error);
    return [];
  }
  return data || [];
}

export async function getAllSchedules() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching all schedules:", error);
    return [];
  }
  return data || [];
}

export async function getPrograms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
  return data || [];
}

export async function getTeachers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
  return data || [];
}

export async function getGalleries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("galleries")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
  return data || [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return data || [];
}

export async function getFaqs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
  return data || [];
}

export async function getRegistrations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
  return data || [];
}

export async function getAdminPrograms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching admin programs:", error);
    return [];
  }
  return data || [];
}

export async function getAdminTeachers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching admin teachers:", error);
    return [];
  }
  return data || [];
}

export async function getAdminGalleries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("galleries")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching admin galleries:", error);
    return [];
  }
  return data || [];
}

export async function getAdminTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching admin testimonials:", error);
    return [];
  }
  return data || [];
}

export async function getAdminFaqs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });
    
  if (error) {
    console.error("Error fetching admin faqs:", error);
    return [];
  }
  return data || [];
}
