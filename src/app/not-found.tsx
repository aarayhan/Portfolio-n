// 404 dua bahasa, karena halaman ini bisa muncul sebelum bahasa diketahui.
export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-accent px-4 text-black">
      <div className="text-center">
        <p className="font-display text-[clamp(8rem,30vw,20rem)] font-black leading-none">404</p>
        <p className="mt-2 text-lg">Halaman ini tidak ada. Mungkin link-nya salah atau sudah dipindah.</p>
        <p lang="en" className="mt-1 text-black/70">This page does not exist. The link may be wrong or the page has moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/id" className="rounded-full bg-black px-6 py-3 font-medium text-bone">
            Kembali ke beranda
          </a>
          <a href="/en" lang="en" className="rounded-full border border-black px-6 py-3 font-medium">
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
