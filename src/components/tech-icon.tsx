import {
  siHtml5, siCss, siJavascript, siTypescript, siReact, siNextdotjs, siTailwindcss,
  siPhp, siLaravel, siNodedotjs, siMysql, siPostgresql, siSupabase,
  siGit, siGithub, siFigma, siVercel, siDart, siFlutter,
  siFilament, siLivewire, siInertia, siGetx, siComposer, siVite, siFramer,
  siPython, siDocker, siGithubactions,
} from "simple-icons";
import { Braces, FlaskConical, SquareCode } from "lucide-react";

// Logo dari simple-icons (CC0). Teknologi tanpa logo resmi di sana pakai ikon lucide.
const brand: Record<string, { path: string }> = {
  HTML: siHtml5, CSS: siCss, JavaScript: siJavascript, TypeScript: siTypescript,
  React: siReact, "Next.js": siNextdotjs, Tailwind: siTailwindcss,
  PHP: siPhp, Laravel: siLaravel, "Node.js": siNodedotjs,
  MySQL: siMysql, PostgreSQL: siPostgresql, Supabase: siSupabase,
  Git: siGit, GitHub: siGithub, Figma: siFigma, Vercel: siVercel,
  Dart: siDart, Flutter: siFlutter,
  Filament: siFilament, Livewire: siLivewire, Inertia: siInertia, GetX: siGetx,
  Composer: siComposer, Vite: siVite, "Framer Motion": siFramer,
  Python: siPython, Docker: siDocker, "GitHub Actions": siGithubactions,
};

const fallback: Record<string, typeof Braces> = {
  "REST API": Braces,
  "VS Code": SquareCode,
  PHPUnit: FlaskConical,
};

export function TechIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const icon = brand[name];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
        <path d={icon.path} />
      </svg>
    );
  }
  const Fallback = fallback[name];
  return Fallback ? <Fallback className={className} aria-hidden /> : null;
}
