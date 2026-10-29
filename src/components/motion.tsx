"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* reducedMotion="user": gerakan dimatikan kalau pengguna minta reduced motion di sistemnya. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const ease = [0.2, 0.8, 0.2, 1] as const;

/* Animasi pembuka hero baru jalan setelah loader hilang (lihat loader.tsx). */
export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains("loader-done")) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("loader:done", on);
    return () => window.removeEventListener("loader:done", on);
  }, []);
  return ready;
}

/* Teks naik dari balik garis. Dipakai untuk nama di hero (saat load).
   release: setelah selesai naik, potongan overflow dilepas supaya isi magnetik tidak terpotong.
   interactive: baris berisi link, jadi tidak boleh aria-hidden (link di dalam aria-hidden tetap bisa difokus). */
export function RiseLine({
  children,
  delay = 0,
  className,
  release = false,
  interactive = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  release?: boolean;
  interactive?: boolean;
}) {
  const [done, setDone] = useState(false);
  const ready = useIntroReady();
  return (
    <span
      aria-hidden={interactive ? undefined : true}
      className={`block pb-[0.03em] ${release && done ? "overflow-visible" : "overflow-hidden"}`}
    >
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "105%" }}
        animate={ready ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 0.9, delay, ease }}
        onAnimationComplete={() => ready && setDone(true)}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Judul section: naik sekali saat terlihat di layar.
   Yang diamati pembungkusnya, karena teks yang masih tersembunyi di balik overflow tidak pernah "terlihat". */
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="block overflow-hidden pb-[0.04em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
        transition={{ duration: 0.8, ease }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* Isi bergeser pelan berlawanan arah scroll. Isi diperbesar sedikit supaya tepinya tidak kelihatan. */
export function Parallax({
  children,
  className,
  morphTarget = false,
}: {
  children: React.ReactNode;
  className?: string;
  morphTarget?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  // MotionConfig tidak mematikan efek yang terikat scroll, jadi dicek manual.
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`} data-morph-target={morphTarget ? "" : undefined}>
      <motion.div style={reduce ? { y: 0, scale: 1 } : { y, scale: 1.14 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* Transisi halaman: opacity saja. Transform di sini akan merusak navigasi fixed dan hero sticky. */
export function PageFade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

/* ---------- Animasi isi section ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* Satu blok muncul dari bawah saat terlihat. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* Daftar yang anaknya muncul bergantian. Anak wajib StaggerItem. */
export function Stagger({
  as = "ul",
  children,
  className,
  gap = 0.08,
}: {
  as?: "ul" | "ol" | "div" | "dl";
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const Tag = as === "ol" ? motion.ol : as === "div" ? motion.div : as === "dl" ? motion.dl : motion.ul;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  as = "li",
  children,
  className,
  lift = false,
}: {
  as?: "li" | "div";
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const Tag = as === "div" ? motion.div : motion.li;
  return (
    <Tag
      className={className}
      variants={fadeUp}
      whileHover={lift ? { y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
    >
      {children}
    </Tag>
  );
}

/* Chip kecil yang muncul dengan sedikit membesar. */
export function PopItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.li
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.85 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
      }}
      whileHover={{ y: -3 }}
    >
      {children}
    </motion.li>
  );
}

/* Kalimat besar: kata demi kata muncul saat terlihat. */
export function WordsReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.05em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "100%" }, show: { y: "0%", transition: { duration: 0.7, ease } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}

/* Elemen hero yang masuk saat halaman dibuka (tanpa menunggu scroll). */
export function EnterOnLoad({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "right";
}) {
  const initial = from === "right" ? { opacity: 0, x: 60 } : { opacity: 0, y: 24 };
  const ready = useIntroReady();
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={ready ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence, motion } from "framer-motion";
