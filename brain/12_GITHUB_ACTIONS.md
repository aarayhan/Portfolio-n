# 12 GITHUB ACTIONS

Status: belum dibuat.

## Rencana CI minimal
Pemicu: pull request dan push ke `main`.

Langkah:
1. `npm ci`
2. `npm run build` (sekaligus type check)
3. (opsional) `npx next lint`

Deploy: otomatis lewat integrasi Vercel, bukan lewat Actions.

## Aturan
- Jangan simpan secret di workflow. Pakai GitHub Secrets.
- Build harus lolos sebelum merge.
