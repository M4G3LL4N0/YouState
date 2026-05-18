import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'YouState - Real-time human performance guidance',
  description:
    'Adaptive guidance for energy, nutrition, hydration, caffeine, focus, and recovery decisions.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
