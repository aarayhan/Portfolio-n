import { PageFade } from "@/components/motion";

// template.tsx dipasang ulang setiap pindah halaman, jadi transisi jalan di tiap navigasi.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageFade>{children}</PageFade>;
}
