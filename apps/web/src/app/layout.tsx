import '@workspace/ui/globals.css';
import type { Metadata } from 'next';

import { cn } from '@workspace/ui/lib/utils';
import { Geist } from 'next/font/google';
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
    <html className="dark" lang="en">
      <body className={cn(geist.className)}>{children}</body>
    </html>
  );
}
