# 09 ERROR HANDLING

## Halaman
- `not-found.tsx` dengan tautan kembali ke beranda (belum dibuat)
- `error.tsx` untuk error runtime (belum dibuat)

## Konten
- Gambar gagal dimuat: tampilkan blok warna netral dengan `alt` yang jelas.
- Tautan live demo mati: periksa sebelum rilis (lihat `14_PRODUCTION_CHECKLIST.md`).
- Section kosong: jangan tampil di produksi. Sembunyikan atau isi.

## Form (kalau ada di v2)
- Pesan error menyebut masalah dan cara memperbaikinya.
- Tidak meminta maaf berlebihan. Contoh: "Email belum valid. Cek tanda @."
- Status sukses menyebut apa yang terjadi: "Pesan terkirim."

## Logging
Tidak ada log server di v1. Gunakan Vercel Analytics kalau butuh.
