"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/* Client Supabase untuk dashboard. Sesi login disimpan di cookie supaya /api/revalidate bisa memeriksanya. */
import { supabaseKey, supabaseReady, supabaseUrl } from "@/lib/supabase/env";

export { supabaseReady };

let client: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (!supabaseReady) throw new Error("Supabase belum disambungkan (env kosong).");
  client ??= createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
