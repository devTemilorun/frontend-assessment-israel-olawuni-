import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import OfflineDetector from '@/features/pokemon/components/OfflineDetector';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Pokédex 3000',
    template: '%s | Pokédex 3000',
  },
  description: 'Explore detailed Pokémon stats, types, and abilities. Your complete Pokédex encyclopedia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-black focus:rounded-lg"
        >
          Skip to main content
        </a>
        {children}
        <OfflineDetector />
      </body>
    </html>
  );
}