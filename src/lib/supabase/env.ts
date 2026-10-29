/*
  Nilai env Supabase, dibersihkan dari kesalahan salin-tempel yang umum:
  spasi atau baris baru di ujung, tanda kutip, garis miring di akhir, dan akhiran /rest/v1.
  Ditulis lengkap (process.env.NAMA) supaya Next.js bisa menyisipkannya ke kode browser.
*/
const clean = (v: string | undefined) => (v ?? "").trim().replace(/^["']|["']$/g, "").trim();

export const supabaseUrl = clean(process.env.NEXT_PUBLIC_SUPABASE_URL)
  .replace(/\/rest\/v1\/?$/, "")
  .replace(/\/+$/, "");

// Nama baru Supabase (PUBLISHABLE_KEY) atau nama lama (ANON_KEY), dua-duanya diterima.
export const supabaseKey = clean(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const supabaseReady = Boolean(supabaseUrl && supabaseKey);
