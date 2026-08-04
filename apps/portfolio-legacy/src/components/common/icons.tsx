import { normalizeTechName, TECH_METADATA } from '@/constants/tech-metadata';
import {
  Atom,
  Blocks,
  Box,
  Brain,
  Code2,
  Cpu,
  Database,
  FileJson,
  Globe,
  LayoutTemplate,
  MapPin,
  MessageSquare,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube,
  TrendingUp,
  Wind,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

// Map string names to Lucide components
const LUCIDE_ICONS: Record<string, any> = {
  Atom,
  Blocks,
  Box,
  Brain,
  Code2,
  Cpu,
  Database,
  FileJson,
  Globe,
  LayoutTemplate,
  MapPin,
  MessageSquare,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube,
  TrendingUp,
  Wind,
  Zap,
};

export const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const getTechIcon = (techName: string, showName = false) => {
  const normalized = normalizeTechName(techName);
  const meta = TECH_METADATA[normalized] || {
    name: techName,
    hex: '#9CA3AF', // Gray fallback
    icon: 'Code2',
  };

  const IconComponent =
    meta.icon && LUCIDE_ICONS[meta.icon] ? LUCIDE_ICONS[meta.icon] : Code2;

  // Render SimpleIcon (SVG) if slug exists
  if (meta.slug) {
    const color = meta.hex ? meta.hex.replace('#', '') : '9CA3AF';
    return (
      <div className="flex items-center gap-1.5">
        <Image
          src={`https://cdn.simpleicons.org/${meta.slug}/${color}`}
          alt={meta.name}
          width={14}
          height={14}
          className="w-3.5 h-3.5 object-contain"
          unoptimized // SimpleIcons CDN
        />
        {showName && <span style={{ color: meta.hex }}>{meta.name}</span>}
      </div>
    );
  }

  // Render Lucide Icon
  return (
    <div className="flex items-center gap-1.5">
      <IconComponent className="w-3.5 h-3.5" style={{ color: meta.hex }} />
      {showName && <span style={{ color: meta.hex }}>{meta.name}</span>}
    </div>
  );
};

export const getTechColor = (techName: string) => {
  const normalized = normalizeTechName(techName);
  return TECH_METADATA[normalized]?.hex || '#9CA3AF';
};
