import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'EComm',
  description: 'e-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
