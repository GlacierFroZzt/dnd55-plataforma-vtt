import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'D&D 5.5 (2024) - Mesa Virtual con Bot DM Multijugador',
  description: 'Juega a Dungeons & Dragons 5.5 solo o con amigos con un Bot DM impulsado por IA con memoria inmutable y compendio completo de 12 clases y 48 subclases.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'D&D 5.5 VTT',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070b14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-[#070b14] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-[100dvh] flex flex-col">
        {children}
      </body>
    </html>
  );
}
