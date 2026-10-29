import type { Block, Section } from "@/content/types";

/*
  Markdown sederhana untuk isi proyek dan artikel. Yang didukung:

  ## Judul bagian            -> bagian baru (masuk daftar isi)
  Paragraf biasa             -> paragraf (baris berurutan digabung)
  - poin / * poin            -> daftar
  1. langkah                 -> daftar bernomor
  ```php Keterangan opsional -> blok kode
  | A | B |                  -> tabel (baris kedua |---|---| sebagai pemisah)
  ![alt](url "keterangan")   -> gambar
  > catatan                  -> kotak catatan

  Di dalam teks: **tebal**, `kode`, [teks](https://link).
*/

export function parseMarkdown(md: string): Section[] {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;

  const push = (b: Block) => {
    if (!current) {
      current = { title: "", blocks: [] };
      sections.push(current);
    }
    current.blocks.push(b);
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    const h = /^#{1,3}\s+(.*)$/.exec(trimmed);
    if (h) {
      current = { title: h[1].trim(), blocks: [] };
      sections.push(current);
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const info = trimmed.slice(3).trim();
      const [lang = "", ...cap] = info.split(/\s+/);
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        body.push(lines[i]);
        i++;
      }
      i++; // lewati ``` penutup
      push({ type: "code", lang: lang || "text", code: body.join("\n"), caption: cap.join(" ") || undefined });
      continue;
    }

    const img = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/.exec(trimmed);
    if (img) {
      push({ type: "image", alt: img[1], src: img[2], caption: img[3] || undefined });
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head = [], ...rest] = rows;
      push({ type: "table", head, rows: rest });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
      const ordered = /^\d+[.)]\s+/.test(trimmed);
      const re = ordered ? /^\d+[.)]\s+/ : /^[-*]\s+/;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(re, ""));
        i++;
      }
      push({ type: "list", items, ordered: ordered || undefined });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const text: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        text.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      push({ type: "note", text: text.join(" ") });
      continue;
    }

    const para: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t || /^(#{1,3}\s|```|\||>|[-*]\s|\d+[.)]\s|!\[)/.test(t)) break;
      para.push(t);
      i++;
    }
    push({ type: "p", text: para.join(" ") });
  }

  return sections;
}

/* Kebalikan parseMarkdown. Dipakai untuk mengubah isi lama (blok) jadi Markdown. */
export function toMarkdown(sections: Section[]): string {
  const out: string[] = [];
  for (const s of sections) {
    if (s.title) out.push(`## ${s.title}`);
    for (const b of s.blocks) {
      switch (b.type) {
        case "p":
          out.push(b.text);
          break;
        case "list":
          out.push(b.items.map((it, n) => (b.ordered ? `${n + 1}. ${it}` : `- ${it}`)).join("\n"));
          break;
        case "code":
          out.push("```" + b.lang + (b.caption ? " " + b.caption : "") + "\n" + b.code + "\n```");
          break;
        case "table":
          out.push(
            [b.head, b.head.map(() => "---"), ...b.rows].map((r) => `| ${r.join(" | ")} |`).join("\n"),
          );
          break;
        case "image":
          out.push(`![${b.alt}](${b.src}${b.caption ? ` "${b.caption}"` : ""})`);
          break;
        case "note":
          out.push(`> ${b.text}`);
          break;
      }
    }
  }
  return out.join("\n\n");
}

/* Perkiraan waktu baca: 200 kata per menit, minimal 1 menit. */
export function readMinutes(md: string): number {
  const words = md.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
