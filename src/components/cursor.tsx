"use client";

/*
  Kursor custom: titik kecil yang mengikuti mouse dan membesar di atas link dan tombol.
  Warnanya berbalik mengikuti latar (mix-blend-difference).
  Hanya aktif di perangkat dengan mouse (pointer: fine) dan tidak saat reduced motion.
*/

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [onLink, setOnLink] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const pathname = usePathname();

  // Pindah halaman: elemen di bawah kursor sudah berganti.
  useEffect(() => setOnLink(false), [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    // Di dashboard (/admin) pakai kursor biasa, lebih nyaman untuk mengisi form.
    const update = () => setEnabled(mq.matches && !reduce && !pathname.startsWith("/admin"));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce, pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setOnLink(!!(e.target as Element | null)?.closest("a, button, [role='button'], [role='option']"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = onLink ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      // mix-blend-difference harus di elemen terluar. Kalau di elemen dalam, transform di luar
      // membuat grup sendiri dan titiknya tidak berbaur dengan halaman (jadi putih polos).
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
