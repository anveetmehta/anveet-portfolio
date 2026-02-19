import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { siteMeta } from '@/content/content';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
