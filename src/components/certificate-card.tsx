"use client";

/*
  Kartu sertifikat. Kalau ada file (gambar atau PDF), klik kartu membuka penampil di halaman ini,
  jadi pengunjung tidak perlu pindah ke situs penerbit.
*/

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, FileText, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type CertificateView = {
  title: string;
  issuer: string;
  year: string;
  id: string;
  verifyUrl: string;
  fileUrl: string | null;
};

export type CertificateLabels = { verify: string; view: string; close: string; openNew: string };

const isPdf = (url: string) => /\.pdf($|[?#])/i.test(url);

export function CertificateCard({ c, labels }: { c: CertificateView; labels: CertificateLabels }) {
  const [open, setOpen] = useState(false);
  const meta = [c.issuer, c.year].filter(Boolean).join(", ");
  const hasVerify = Boolean(c.verifyUrl && c.verifyUrl !== "#");

  const body = (
    <>
      {c.fileUrl && (
        <div className="mb-5 grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-white/5">
          {isPdf(c.fileUrl) ? (
            <span className="flex flex-col items-center gap-2 text-sm text-muted-dark">
              <FileText className="size-8" aria-hidden />
              PDF
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.fileUrl}
              alt=""
              loading="lazy"
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
      )}
      <p className="text-sm text-muted-dark">{meta}</p>
      <h3 className="mt-3 font-display text-3xl font-bold uppercase leading-[0.95]">{c.title}</h3>
      {c.id && <p className="mt-3 text-sm text-muted-dark">ID {c.id}</p>}
    </>
  );

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line-dark p-6">
      {c.fileUrl ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${labels.view}: ${c.title}`}
          className="group text-left"
        >
          {body}
        </button>
      ) : (
        body
      )}
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm font-medium">
        {c.fileUrl && (
          <button type="button" onClick={() => setOpen(true)} className="text-bone underline decoration-accent decoration-2 underline-offset-4">
            {labels.view}
          </button>
        )}
        {hasVerify && (
          <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent">
            {labels.verify} <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
      {c.fileUrl && <Viewer open={open} onClose={() => setOpen(false)} url={c.fileUrl} title={c.title} labels={labels} />}
    </div>
  );
}

function Viewer({
  open,
  onClose,
  url,
  title,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  labels: CertificateLabels;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;
  // Portal ke body: section punya transform dari animasi, yang membuat "fixed" ikut terpotong.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[150] flex flex-col bg-black/90 p-3 text-bone backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 pb-3">
            <p className="truncate font-display text-2xl uppercase">{title}</p>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border border-line-dark px-4 py-2 text-sm hover:bg-white/10 sm:inline-flex"
              >
                {labels.openNew}
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                className="grid size-10 place-items-center rounded-full bg-bone text-black"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </div>
          <motion.div
            className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center"
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            {isPdf(url) ? (
              <iframe src={url} title={title} className="size-full rounded-xl bg-white" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt={title} className="max-h-full max-w-full rounded-xl object-contain" />
            )}
          </motion.div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="mx-auto mt-3 text-sm underline sm:hidden">
            {labels.openNew}
          </a>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
