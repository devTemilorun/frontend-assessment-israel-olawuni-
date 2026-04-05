import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import OfflineDetector from '@/components/OfflineDetector';

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
        {children}
        <OfflineDetector />
      </body>
    </html>
  );
}