"use client";

import { useRef, useState } from "react";
import { ImagePlus, Plus, Trash2, Upload, X } from "lucide-react";
import type { Lang } from "@/i18n";
import { parseMarkdown } from "@/lib/markdown";
import { SectionsView } from "@/components/blocks";
import { getBrowserClient } from "@/lib/supabase/browser";
import type { Field, Row } from "./schema";

/* ---------- Baca dan tulis nilai lewat path "a.b.$lang.c" ---------- */

const resolve = (path: string, lang: Lang) => path.replace("$lang", lang).split(".");
export const isI18n = (f: Field) => f.path.includes("$lang");

export function getAt(obj: unknown, path: string, lang: Lang): unknown {
  return resolve(path, lang).reduce<unknown>(
    (o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined),
    obj,
  );
}

export function setAt<T>(obj: T, path: string, lang: Lang, value: unknown): T {
  const keys = resolve(path, lang);
  const walk = (o: unknown, i: number): unknown => {
    const base = o && typeof o === "object" ? (o as Record<string, unknown>) : {};
    if (i === keys.length - 1) return { ...base, [keys[i]]: value };
    return { ...base, [keys[i]]: walk(base[keys[i]], i + 1) };
  };
  return walk(obj, 0) as T;
}

/* ---------- Gaya dasar ---------- */

export const inputCls =
  "w-full rounded-lg border border-line-light bg-white px-3 py-2 text-[15px] outline-none transition-colors focus:border-black";
const labelCls = "text-sm font-medium";
const hintCls = "mt-1 text-xs text-muted-light";

/* ---------- Unggah ke Supabase Storage (bucket media) ---------- */

const MAX_MB = 8;

async function upload(file: File, folder: string): Promise<string> {
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`File maksimal ${MAX_MB} MB.`);
  const supabase = getBrowserClient();
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

/* ---------- Satu field ---------- */

export function FieldInput({
  field,
  value,
  onChange,
  lang,
  folder,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
  lang: Lang;
  folder: string;
}) {
  const str = typeof value === "string" ? value : value == null ? "" : String(value);

  switch (field.type) {
    case "textarea":
      return <textarea className={`${inputCls} min-h-24`} value={str} onChange={(e) => onChange(e.target.value)} />;
    case "markdown":
      return <MarkdownInput value={str} onChange={onChange} lang={lang} />;
    case "number":
      return (
        <input
          type="number"
          className={inputCls}
          value={str}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
    case "date":
      return <input type="date" className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} />;
    case "bool":
      return (
        <label className="inline-flex cursor-pointer items-center gap-3">
          <input type="checkbox" className="peer sr-only" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
          <span className="relative h-6 w-11 rounded-full bg-black/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-accent peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2" />
          <span className="text-sm">{value === true ? "Ya" : "Tidak"}</span>
        </label>
      );
    case "select":
      return (
        <select className={inputCls} value={str} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "tags":
      return <TagsInput value={Array.isArray(value) ? (value as string[]) : []} onChange={onChange} />;
    case "image":
    case "file":
      return <UploadInput kind={field.type} value={str} onChange={(v) => onChange(v || null)} folder={folder} />;
    case "list":
      return (
        <ListInput
          field={field}
          value={Array.isArray(value) ? (value as Row[]) : []}
          onChange={onChange}
          lang={lang}
          folder={folder}
        />
      );
    case "url":
      return (
        // type="text", bukan "url": browser menolak isian seperti "#" atau "/cv.pdf" yang sah untuk web ini.
        <input
          type="text"
          inputMode="url"
          placeholder="https://"
          className={inputCls}
          value={str}
          onChange={(e) => onChange(e.target.value || null)}
        />
      );
    case "slug":
      return (
        <input
          className={`${inputCls} font-mono text-sm`}
          value={str}
          onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
        />
      );
    default:
      return <input className={inputCls} value={str} onChange={(e) => onChange(e.target.value)} />;
  }
}

export function FieldRow({
  field,
  row,
  setRow,
  lang,
  folder,
}: {
  field: Field;
  row: Row;
  setRow: (r: Row) => void;
  lang: Lang;
  folder: string;
}) {
  const id = `f-${field.path.replace(/[^a-z0-9]/gi, "-")}`;
  return (
    <div
      role="group"
      aria-labelledby={id}
      className={field.wide || field.type === "markdown" ? "lg:col-span-2" : undefined}
    >
      <div className="mb-1.5 flex items-baseline gap-2">
        <span id={id} className={labelCls}>
          {field.label}
        </span>
        {isI18n(field) && <span className="rounded bg-black/[0.06] px-1.5 text-[11px] font-semibold uppercase">{lang}</span>}
      </div>
      <div>
        <FieldInput
          field={field}
          value={getAt(row, field.path, lang)}
          onChange={(v) => setRow(setAt(row, field.path, lang, v))}
          lang={lang}
          folder={folder}
        />
      </div>
      {field.hint && <p className={hintCls}>{field.hint}</p>}
    </div>
  );
}

/* ---------- Input khusus ---------- */

function TagsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const parts = draft.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...value, ...parts.filter((p) => !value.includes(p))]);
    setDraft("");
  };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 py-1.5`}>
      {value.map((t, i) => (
        <span key={t + i} className="inline-flex items-center gap-1 rounded-full bg-black/[0.06] py-0.5 pl-2.5 pr-1 text-sm">
          {t}
          <button
            type="button"
            aria-label={`Hapus ${t}`}
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="rounded-full p-0.5 hover:bg-black/10"
          >
            <X className="size-3.5" />
          </button>
        </span>
      ))}
      <input
        className="min-w-[8rem] flex-1 bg-transparent py-0.5 outline-none"
        value={draft}
        placeholder={value.length ? "" : "Ketik lalu Enter"}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={add}
      />
    </div>
  );
}

function UploadInput({
  kind,
  value,
  onChange,
  folder,
}: {
  kind: "image" | "file";
  value: string;
  onChange: (v: string) => void;
  folder: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        {kind === "image" && (
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-light bg-white">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="size-full object-cover" />
            ) : (
              <ImagePlus className="size-5 text-muted-light" aria-hidden />
            )}
          </div>
        )}
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-black px-3 py-2 text-sm font-medium disabled:opacity-50"
        >
          <Upload className="size-4" aria-hidden />
          {busy ? "Mengunggah..." : value ? "Ganti" : "Unggah"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-muted-light underline">
            Lepas
          </button>
        )}
        <input
          ref={ref}
          type="file"
          hidden
          accept={kind === "image" ? "image/*" : "application/pdf,image/*"}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setBusy(true);
            setErr("");
            try {
              onChange(await upload(file, folder));
            } catch (x) {
              setErr(x instanceof Error ? x.message : "Gagal mengunggah.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
      <input
        className={`${inputCls} text-sm`}
        placeholder="atau tempel link"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {err && <p className="text-sm text-red-700">{err}</p>}
    </div>
  );
}

function ListInput({
  field,
  value,
  onChange,
  lang,
  folder,
}: {
  field: Field;
  value: Row[];
  onChange: (v: Row[]) => void;
  lang: Lang;
  folder: string;
}) {
  const sub = field.fields ?? [];
  const blank = sub.reduce<Row>((r, f) => setAt(r, f.path, lang, f.type === "number" ? 0 : ""), {});
  return (
    <div className="grid gap-2">
      {value.map((item, i) => (
        <div key={i} className="grid items-end gap-2 rounded-lg border border-line-light bg-white/60 p-3 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))_auto]">
          {sub.map((f) => (
            <div key={f.path}>
              <p className="mb-1 text-xs text-muted-light">
                {f.label}
                {isI18n(f) && ` (${lang.toUpperCase()})`}
              </p>
              <FieldInput
                field={f}
                value={getAt(item, f.path, lang)}
                onChange={(v) => onChange(value.map((it, j) => (j === i ? setAt(it, f.path, lang, v) : it)))}
                lang={lang}
                folder={folder}
              />
            </div>
          ))}
          <button
            type="button"
            aria-label="Hapus baris"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="grid size-10 place-items-center rounded-lg text-muted-light hover:bg-black/5 hover:text-black"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, blank])}
        className="inline-flex items-center gap-1.5 justify-self-start rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-black/5"
      >
        <Plus className="size-4" /> Tambah
      </button>
    </div>
  );
}

const mdHelp = `## Judul bagian
Paragraf. **tebal**, \`kode\`, [link](https://...)
- poin
1. langkah
\`\`\`php Keterangan
kode
\`\`\`
| Kolom | Kolom |
|---|---|
| isi | isi |
![alt](link-gambar "keterangan")
> catatan`;

function MarkdownInput({ value, onChange, lang }: { value: string; onChange: (v: string) => void; lang: Lang }) {
  const [mode, setMode] = useState<"tulis" | "pratinjau">("tulis");
  return (
    <div className="overflow-hidden rounded-lg border border-line-light bg-white">
      <div className="flex items-center gap-1 border-b border-line-light px-2 py-1.5">
        {(["tulis", "pratinjau"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1 text-sm capitalize ${mode === m ? "bg-black text-bone" : "hover:bg-black/5"}`}
          >
            {m}
          </button>
        ))}
        <details className="relative ml-auto text-sm">
          <summary className="cursor-pointer select-none rounded-md px-2 py-1 text-muted-light hover:bg-black/5">
            Cara menulis
          </summary>
          <pre className="absolute right-0 z-10 mt-1 w-72 whitespace-pre-wrap rounded-lg bg-black p-3 text-xs text-bone">
            {mdHelp}
          </pre>
        </details>
      </div>
      {mode === "tulis" ? (
        <textarea
          className="block min-h-[28rem] w-full resize-y p-4 font-mono text-sm leading-relaxed outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      ) : (
        <div className="max-h-[36rem] overflow-y-auto p-6">
          {value.trim() ? (
            <SectionsView sections={parseMarkdown(value)} lang={lang} animate={false} />
          ) : (
            <p className="text-muted-light">Belum ada isi.</p>
          )}
        </div>
      )}
    </div>
  );
}
