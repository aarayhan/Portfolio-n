import type { Metadata } from "next";
import "@fontsource/bebas-neue";
import "@fontsource-variable/inter";
import "./globals.css";
import { getSite } from "@/lib/content";
import { MotionProvider } from "@/components/motion";
import { Shell } from "@/components/shell";
import { CustomCursor } from "@/components/cursor";
import { Loader } from "@/components/loader";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite("id");
  return { title: `${site.name} | ${site.role}`, description: site.intro };
}

// Root layout: <html> di sini. Atribut lang diperbarui per bahasa oleh [lang]/layout.tsx.
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite("id");
  return (
    // suppressHydrationWarning: skrip loader menambah class di <html> sebelum React jalan.
    <html lang="id" suppressHydrationWarning>
      <body>
        <Loader name={site.name} role={site.role} city={site.city} />
        <MotionProvider>
          <Shell>{children}</Shell>
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
