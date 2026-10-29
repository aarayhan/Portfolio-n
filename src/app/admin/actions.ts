"use server";

import { revalidatePath, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { CONTENT_TAG } from "@/lib/content";

/*
  Dipanggil dashboard setelah menyimpan atau menghapus.
  updateTag membuang cache isi web saat itu juga, jadi pengunjung berikutnya langsung melihat perubahan.
  Hanya admin yang login yang boleh menjalankannya.
*/
export async function refreshSiteAction(): Promise<{ ok: true } | { ok: false; error: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, error: "Supabase belum disambungkan." };

  const store = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });

  // getUser memeriksa token ke server Supabase, tidak hanya membaca cookie.
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { ok: false, error: "sesi login habis, silakan masuk lagi." };
  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || !isAdmin) return { ok: false, error: "akun ini bukan admin." };

  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
  return { ok: true };
}
