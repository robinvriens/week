import '@workspace/ui/globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn } from '@workspace/ui/lib/utils';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Week',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(geist.className)}>{children}</body>
    </html>
  );
}
