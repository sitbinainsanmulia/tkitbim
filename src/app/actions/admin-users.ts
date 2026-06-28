"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { uuidSchema, safeError } from "@/utils/validation";

// ==========================================
// SCHEMAS
// ==========================================

const createAdminSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  name: z.string().optional().default(""),
});

const updateAdminSchema = z.object({
  id: z.string().uuid("ID tidak valid"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter").optional().or(z.literal("")),
  name: z.string().optional().default(""),
});

// ==========================================
// ADMIN USERS
// ==========================================

export async function getAdmins() {
  try {
    const supabaseAdmin = createAdminClient();
    
    // Fetch users using the Supabase Admin API
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) throw error;
    
    // Map users to a safer format
    return { 
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || "-",
        last_sign_in_at: user.last_sign_in_at,
        created_at: user.created_at
      })),
      error: null as string | null,
    };
  } catch (error) {
    console.error("[getAdmins]", error);
    return { users: [] as never[], error: "Gagal memuat data admin" };
  }
}

export async function createAdmin(formData: FormData) {
  const parsed = createAdminSchema.safeParse({
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
    name: (formData.get("name") as string) || "",
  });

  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const supabaseAdmin = createAdminClient();
    
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: {
        full_name: parsed.data.name
      }
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return safeError(error, "createAdmin");
  }
}

export async function updateAdmin(formData: FormData) {
  const parsed = updateAdminSchema.safeParse({
    id: (formData.get("id") as string) || "",
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
    name: (formData.get("name") as string) || "",
  });

  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const supabaseAdmin = createAdminClient();
    
    const updateData: Record<string, unknown> = {
      user_metadata: {
        full_name: parsed.data.name
      }
    };
    
    if (parsed.data.password) {
      updateData.password = parsed.data.password;
    }
    
    // Check if email changed
    const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(parsed.data.id);
    if (user?.email !== parsed.data.email && parsed.data.email) {
      updateData.email = parsed.data.email;
      updateData.email_confirm = true;
    }
    
    const { error } = await supabaseAdmin.auth.admin.updateUserById(parsed.data.id, updateData);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return safeError(error, "updateAdmin");
  }
}

export async function deleteAdmin(id: string) {
  const idResult = uuidSchema.safeParse(id);
  if (!idResult.success) return { error: "ID tidak valid" };

  try {
    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();
    
    // Get current logged-in user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (!currentUser) {
      return { error: "Tidak memiliki akses" };
    }
    
    // Check constraint: Admin can only delete themselves, not other admins
    if (idResult.data !== currentUser.id) {
      return { error: "Akses ditolak: Anda hanya dapat menghapus akun Anda sendiri" };
    }
    
    const { error } = await supabaseAdmin.auth.admin.deleteUser(idResult.data);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return safeError(error, "deleteAdmin");
  }
}
