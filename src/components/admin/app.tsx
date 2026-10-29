"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, ExternalLink, LogOut, Plus } from "lucide-react";
import type { Lang } from "@/i18n";
import { cn } from "@/lib/utils";
import { slugify } from "@/components/blocks";
import { getBrowserClient, supabaseReady } from "@/lib/supabase/browser";
import { refreshSiteAction } from "@/app/admin/actions";
import { collections, type Collection, type Row } from "./schema";
import { FieldRow, getAt, inputCls, isI18n, setAt } from "./editor";

/*
  Dashboard isi web.
  Alur: login (email + password Supabase) -> cek tabel admins -> pilih bagian -> daftar -> form.
  Setelah simpan atau hapus, /api/revalidate dipanggil supaya web publik langsung berubah.
*/

type Status = { kind: "ok" | "error"; text: string } | null;

export function AdminApp() {
  if (!supabaseReady) return <NotConnected />;
  return <AuthGate />;
}

/* ---------- Belum ada env ---------- */

function NotConnected() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="font-display text-5xl font-black uppercase">Dashboard</h1>
      <p className="mt-4 text-lg">Supabase belum disambungkan, jadi web masih memakai isi bawaan.</p>
      <ol className="mt-6 list-decimal space-y-2 pl-6">
        <li>Buat project di supabase.com.</li>
        <li>Jalankan isi <code>supabase/schema.sql</code> lalu <code>supabase/seed.sql</code> di SQL Editor.</li>
        <li>
          Salin <code>.env.example</code> jadi <code>.env.local</code>, isi Project URL dan publishable key dari Project Settings, API Keys.
        </li>
        <li>Matikan dan jalankan ulang <code>npm run dev</code>.</li>
      </ol>
      <p className="mt-6 text-sm text-muted-light">Panduan lengkap ada di SETUP_SUPABASE.md.</p>
    </main>
  );
}

/* ---------- Login dan cek admin ---------- */

function AuthGate() {
  const supabase = getBrowserClient();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!session) {
      setAdmin(null);
      return;
    }
    supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setAdmin(Boolean(data)));
  }, [session, supabase]);

  if (session === undefined) return <Centered>Memuat...</Centered>;
  if (!session) return <Login />;
  if (admin === null) return <Centered>Memeriksa akses...</Centered>;
  if (!admin)
    return (
      <Centered>
        <div className="max-w-lg">
          <p className="text-lg font-semibold">Akun ini belum terdaftar sebagai admin.</p>
          <p className="mt-2 text-muted-light">Jalankan perintah ini di Supabase, SQL Editor:</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-black p-4 text-left text-sm text-bone">
            {`insert into public.admins (user_id)\nvalues ('${session.user.id}');`}
          </pre>
          <button type="button" onClick={() => location.reload()} className="mt-4 rounded-full bg-black px-5 py-2.5 text-bone">
            Sudah, muat ulang
          </button>
          <button type="button" onClick={() => supabase.auth.signOut()} className="ml-3 text-sm underline">
            Keluar
          </button>
        </div>
      </Centered>
    );
  return <Dashboard email={session.user.email ?? ""} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return <main className="grid min-h-[100svh] place-items-center px-4 text-center">{children}</main>;
}

function Login() {
  const supabase = getBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <Centered>
      <form
        className="grid w-full max-w-sm gap-4 text-left"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setErr("");
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) setErr(error.message === "Invalid login credentials" ? "Email atau password salah." : error.message);
          setBusy(false);
        }}
      >
        <h1 className="font-display text-5xl font-black uppercase">Dashboard</h1>
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input type="email" required autoComplete="username" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            className={inputCls}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {err && <p className="text-sm text-red-700">{err}</p>}
        <button disabled={busy} className="rounded-full bg-black px-5 py-3 font-medium text-bone disabled:opacity-50">
          {busy ? "Masuk..." : "Masuk"}
        </button>
        <a href="/id" className="text-center text-sm text-muted-light underline">
          Kembali ke web
        </a>
      </form>
    </Centered>
  );
}

/* ---------- Dashboard ---------- */

async function refreshSite(): Promise<string | null> {
  // getSession memperbarui token kalau sudah kedaluwarsa, supaya cookie yang dibaca server masih berlaku.
  await getBrowserClient().auth.getSession();
  const res = await refreshSiteAction().catch(() => ({ ok: false as const, error: "web gagal diperbarui." }));
  return res.ok ? null : res.error;
}

function Dashboard({ email }: { email: string }) {
  const supabase = getBrowserClient();
  const [active, setActive] = useState<Collection>(collections[0]);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [status, setStatus] = useState<Status>(null);

  const load = useCallback(
    async (c: Collection) => {
      setRows(null);
      const { data, error } = await supabase
        .from(c.table)
        .select("*")
        .order(c.orderBy.column, { ascending: c.orderBy.ascending });
      if (error) {
        setStatus({ kind: "error", text: error.message });
        setRows([]);
        return;
      }
      setRows(data as Row[]);
      if (c.single) setEditing((data?.[0] as Row) ?? c.blank());
    },
    [supabase],
  );

  useEffect(() => {
    setEditing(null);
    load(active);
  }, [active, load]);

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(t);
  }, [status]);

  const save = async (row: Row) => {
    let r = row;
    // Slug kosong: dibuat dari judul bahasa Indonesia.
    if ("slug" in r && !r.slug) r = { ...r, slug: slugify(String(getAt(r, "i18n.$lang.title", "id") ?? "")) };
    const { data, error } = await supabase.from(active.table).upsert(r).select().single();
    if (error) {
      setStatus({ kind: "error", text: friendly(error.message) });
      return false;
    }
    const msg = await refreshSite();
    setStatus(msg ? { kind: "error", text: `Tersimpan, tapi ${msg}` } : { kind: "ok", text: "Tersimpan. Web sudah diperbarui." });
    setEditing(active.single ? (data as Row) : null);
    if (!active.single) load(active);
    return true;
  };

  const remove = async (row: Row) => {
    if (!confirm(`Hapus "${active.title(row)}"? Tidak bisa dibatalkan.`)) return;
    const { error } = await supabase.from(active.table).delete().eq("id", row.id as string);
    if (error) return setStatus({ kind: "error", text: error.message });
    const msg = await refreshSite();
    setStatus(msg ? { kind: "error", text: `Terhapus, tapi ${msg}` } : { kind: "ok", text: "Terhapus." });
    setEditing(null);
    load(active);
  };

  return (
    <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-line-light bg-black text-bone lg:sticky lg:top-0 lg:h-[100svh] lg:border-b-0">
        <div className="flex items-center justify-between gap-3 px-4 py-4 lg:block lg:px-5 lg:py-6">
          <p className="font-display text-2xl font-black uppercase">Dashboard</p>
          <p className="truncate text-xs text-muted-dark lg:mt-1">{email}</p>
        </div>
        <nav aria-label="Bagian isi" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:grid lg:px-3">
          {collections.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c)}
              aria-current={active.key === c.key ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2 text-left text-sm font-medium",
                active.key === c.key ? "bg-accent text-black" : "text-bone/80 hover:bg-white/10",
              )}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <div className="hidden gap-1 px-3 lg:absolute lg:inset-x-0 lg:bottom-4 lg:grid">
          <a href="/id" target="_blank" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-bone/80 hover:bg-white/10">
            <ExternalLink className="size-4" aria-hidden /> Lihat web
          </a>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-bone/80 hover:bg-white/10"
          >
            <LogOut className="size-4" aria-hidden /> Keluar
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-8 sm:px-8 lg:py-10">
        {editing ? (
          <RecordForm
            key={String(editing.id ?? "baru")}
            collection={active}
            initial={editing}
            onCancel={active.single ? undefined : () => setEditing(null)}
            onSave={save}
            onDelete={active.single || editing.id === undefined ? undefined : () => remove(editing)}
          />
        ) : (
          <RecordList collection={active} rows={rows} onEdit={setEditing} onNew={() => setEditing(active.blank())} />
        )}
        <div className="mt-10 flex gap-4 text-sm lg:hidden">
          <a href="/id" target="_blank" className="underline">
            Lihat web
          </a>
          <button type="button" onClick={() => supabase.auth.signOut()} className="underline">
            Keluar
          </button>
        </div>
      </main>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        {status && (
          <p
            className={cn(
              "pointer-events-auto rounded-full px-5 py-2.5 text-sm font-medium shadow-lg",
              status.kind === "ok" ? "bg-black text-bone" : "bg-red-700 text-white",
            )}
          >
            {status.text}
          </p>
        )}
      </div>
    </div>
  );
}

function friendly(msg: string) {
  if (msg.includes("duplicate key") && msg.includes("slug")) return "Slug sudah dipakai. Ganti dengan yang lain.";
  if (msg.includes("slug_check")) return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  if (msg.includes("row-level security")) return "Ditolak: akun ini tidak punya akses tulis.";
  return msg;
}

/* ---------- Daftar ---------- */

function RecordList({
  collection: c,
  rows,
  onEdit,
  onNew,
}: {
  collection: Collection;
  rows: Row[] | null;
  onEdit: (r: Row) => void;
  onNew: () => void;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-display text-5xl font-black uppercase leading-none">{c.label}</h1>
        <button type="button" onClick={onNew} className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-bone">
          <Plus className="size-4" aria-hidden /> Tambah
        </button>
      </div>
      {rows === null ? (
        <p className="mt-8 text-muted-light">Memuat...</p>
      ) : rows.length === 0 ? (
        <p className="mt-8 text-muted-light">Belum ada isi. Klik Tambah.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line-light border-y border-line-light">
          {rows.map((r) => (
            <li key={String(r.id)}>
              <button type="button" onClick={() => onEdit(r)} className="flex w-full items-center gap-4 py-4 text-left hover:bg-black/[0.03]">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-lg font-semibold">{c.title(r)}</span>
                  {c.subtitle && <span className="block truncate text-sm text-muted-light">{c.subtitle(r)}</span>}
                </span>
                {"published" in r && (
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      r.published ? "bg-accent/15 text-black" : "bg-black/[0.06] text-muted-light",
                    )}
                  >
                    {r.published ? "Tayang" : "Draft"}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------- Form ---------- */

function RecordForm({
  collection: c,
  initial,
  onCancel,
  onSave,
  onDelete,
}: {
  collection: Collection;
  initial: Row;
  onCancel?: () => void;
  onSave: (r: Row) => Promise<boolean>;
  onDelete?: () => void;
}) {
  const [row, setRow] = useState<Row>(initial);
  const [lang, setLang] = useState<Lang>("id");
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(row) !== JSON.stringify(initial);
  const hasI18n = c.fields.some((f) => isI18n(f) || f.fields?.some(isI18n));

  // Jumlah isian bahasa Inggris yang masih kosong padahal versi Indonesianya terisi.
  const missingEn = useMemo(
    () =>
      c.fields.filter((f) => {
        if (!isI18n(f)) return false;
        const id = getAt(row, f.path, "id");
        const en = getAt(row, f.path, "en");
        return typeof id === "string" && id.trim() !== "" && (typeof en !== "string" || en.trim() === "");
      }),
    [c.fields, row],
  );

  const copyIdToEn = () => {
    let r = row;
    for (const f of missingEn) r = setAt(r, f.path, "en", getAt(row, f.path, "id"));
    setRow(r);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await onSave(row);
        setBusy(false);
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="inline-flex items-center gap-1.5 text-sm text-muted-light hover:text-black">
            <ArrowLeft className="size-4" aria-hidden /> {c.label}
          </button>
        )}
      </div>
      <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
        {initial.id !== undefined && !c.single ? c.title(row) : c.single ? c.label : `${c.label} baru`}
      </h1>

      {hasI18n && (
        <div className="sticky top-0 z-10 -mx-4 mt-6 flex flex-wrap items-center gap-3 border-b border-line-light bg-bone/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
          <div role="tablist" aria-label="Bahasa isian" className="inline-flex rounded-full border border-black p-0.5">
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", lang === l ? "bg-black text-bone" : "")}
              >
                {l === "id" ? "Indonesia" : "English"}
              </button>
            ))}
          </div>
          {missingEn.length > 0 && (
            <p className="text-sm text-muted-light">
              {missingEn.length} isian English masih kosong.{" "}
              <button type="button" onClick={copyIdToEn} className="font-medium text-black underline">
                Salin dari Indonesia
              </button>
            </p>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {c.fields.map((f) => (
          <FieldRow key={f.path} field={f} row={row} setRow={setRow} lang={lang} folder={c.key} />
        ))}
      </div>

      <div className="sticky bottom-0 -mx-4 mt-10 flex flex-wrap items-center gap-3 border-t border-line-light bg-bone/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <button disabled={busy || !dirty} className="rounded-full bg-black px-6 py-3 font-medium text-bone disabled:opacity-40">
          {busy ? "Menyimpan..." : "Simpan"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-full px-4 py-3 text-sm">
            Batal
          </button>
        )}
        {dirty && <span className="text-sm text-muted-light">Ada perubahan yang belum disimpan.</span>}
        {onDelete && (
          <button type="button" onClick={onDelete} className="ml-auto rounded-full px-4 py-3 text-sm text-red-700 hover:bg-red-700/10">
            Hapus
          </button>
        )}
      </div>
    </form>
  );
}
