import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Magaji Law Client Room',
  description: 'Premium lawyer-controlled intake and existing-client access system for Magaji Law.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
