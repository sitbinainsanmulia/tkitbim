"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

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
      }))
    };
  } catch (error: any) {
    console.error("Error fetching admins:", error);
    return { error: error.message };
  }
}

export async function createAdmin(formData: FormData) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    
    if (!email || !password) {
      return { error: "Email dan Password wajib diisi" };
    }
    
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: name
      }
    });
    
    if (error) throw error;
    
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return { error: error.message };
  }
}

export async function updateAdmin(formData: FormData) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const id = formData.get("id") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    
    if (!id) return { error: "ID User tidak valid" };
    
    const updateData: any = {
      user_metadata: {
        full_name: name
      }
    };
    
    if (password) {
      updateData.password = password;
    }
    
    // Check if email changed
    const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(id);
    if (user?.email !== email && email) {
      updateData.email = email;
      updateData.email_confirm = true;
    }
    
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, updateData);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating admin:", error);
    return { error: error.message };
  }
}

export async function deleteAdmin(id: string) {
  try {
    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();
    
    // Get current logged-in user
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (!currentUser) {
      return { error: "Tidak memiliki akses" };
    }
    
    // Check constraint: Admin can only delete themselves, not other admins
    if (id !== currentUser.id) {
      return { error: "Akses ditolak: Anda hanya dapat menghapus akun Anda sendiri" };
    }
    
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting admin:", error);
    return { error: error.message };
  }
}
