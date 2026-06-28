import { z } from "zod";

/**
 * Tipe hasil standar untuk server actions.
 * Menggunakan optional fields agar komponen bisa cek `result.error` atau `result.success` langsung.
 */
export type ActionResult = { error?: string; success?: boolean };

/** Schema validasi UUID */
export const uuidSchema = z.string().uuid("ID tidak valid");

/**
 * Mengembalikan pesan error generik ke client,
 * sambil mencatat error asli di server log.
 */
export function safeError(error: unknown, context: string): ActionResult {
  console.error(`[${context}]`, error);
  return { error: "Terjadi kesalahan, silakan coba lagi." };
}
