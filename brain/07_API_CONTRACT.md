# 07 API CONTRACT

**Tidak ada API di v1.**

## Kandidat v2: form kontak
```
POST /api/contact
body:  { name: string, email: string, message: string }
200:   { ok: true }
400:   { ok: false, error: "VALIDATION", fields: string[] }
429:   { ok: false, error: "RATE_LIMITED" }
```
Syarat: validasi di server, honeypot atau rate limit, tanpa menyimpan data sensitif.

Alternatif tanpa API: tombol `mailto:` dan tautan WhatsApp. Ini cukup untuk v1.
