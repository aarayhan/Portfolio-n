"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/* Client Supabase untuk dashboard. Sesi login disimpan di cookie supaya /api/revalidate bisa memeriksanya. */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
// Nama baru Supabase (PUBLISHABLE_KEY) atau nama lama (ANON_KEY), dua-duanya diterima.
// Ditulis lengkap (bukan process.env[nama]) supaya Next.js bisa menyisipkannya ke kode browser.
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabaseReady = Boolean(supabaseUrl && supabaseKey);

let client: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (!supabaseReady) throw new Error("Supabase belum disambungkan (env kosong).");
  client ??= createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
