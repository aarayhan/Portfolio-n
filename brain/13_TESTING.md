# 13 TESTING

## v1: pengecekan manual dan build
| Cek | Cara |
|---|---|
| Build | `npm run build` lolos tanpa error |
| Responsif | 360, 390, 768, 1024, 1360 px |
| Kontras | Teks terbaca di latar oranye, gelap, dan terang |
| Keyboard | Tab melewati semua tautan, fokus terlihat |
| Motion | Aktifkan reduced motion, animasi mati |
| Tautan | Semua tautan eksternal dan anchor bekerja |
| Performa | Lighthouse performance dan accessibility di atas 90 |

## Otomasi (nanti)
- Playwright: smoke test beranda, navigasi anchor, menu mobile.
- Screenshot regresi hanya setelah UI final.

## Aturan
Jangan klaim selesai sebelum build lolos dan hasil dilihat di browser.
