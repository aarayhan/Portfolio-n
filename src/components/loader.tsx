/*
  Layar pembuka saat web pertama kali dibuka.
  Lingkaran kecil memisah dari lingkaran utama, berganti warna saat terpisah,
  lalu menyatu lagi dan lingkaran utama ikut berganti warna. Urutan: oranye, hitam, krem.

  Ditulis sebagai HTML + CSS biasa (bukan komponen client), supaya sudah tampil
  sebelum JavaScript selesai dimuat. Skrip kecil di bawah hanya mengatur kapan loader hilang:
  - kunjungan berikutnya di sesi yang sama: langsung dilewati
  - halaman /admin: dilewati
  - selain itu: tunggu halaman selesai dimuat, minimal 1,2 detik, maksimal 3,5 detik
  Kalau JavaScript gagal, CSS menyembunyikan loader setelah 6 detik.
*/

const script = `(function(){
  var d=document.documentElement, k="loader-seen", t0=Date.now(), done=false;
  function seen(){try{return sessionStorage.getItem(k)==="1"}catch(e){return false}}
  function finish(){
    if(done)return; done=true;
    d.classList.add("loader-done");
    try{sessionStorage.setItem(k,"1")}catch(e){}
    window.dispatchEvent(new Event("loader:done"));
  }
  if(seen()||location.pathname.indexOf("/admin")===0){d.classList.add("loader-skip","loader-done");return}
  function onLoad(){setTimeout(finish,Math.max(0,1200-(Date.now()-t0)))}
  if(document.readyState==="complete")onLoad();else window.addEventListener("load",onLoad);
  setTimeout(finish,3500);
})();`;

export function Loader({ name, role, city }: { name: string; role: string; city: string }) {
  return (
    <>
      <div id="loader" aria-hidden>
        <svg width="0" height="0" className="absolute">
          <filter id="loader-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </svg>
        <svg viewBox="0 0 200 120" className="loader-mark">
          <g filter="url(#loader-goo)">
            <circle className="loader-main" cx="100" cy="60" r="28" />
            <g className="loader-orbit">
              <circle className="loader-small" cx="100" cy="60" r="15" />
            </g>
          </g>
        </svg>
        <div className="loader-id">
          <p className="loader-name">{name}</p>
          <p className="loader-meta">
            {role}. {city}
          </p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
