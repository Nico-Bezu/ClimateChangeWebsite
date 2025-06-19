import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Climate Change Dashboard',
  description: 'Interactive climate change data visualization with AI insights',
  keywords: ['climate change', 'global warming', 'AI', 'data visualization'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
          {children}
        </div>
      </body>
    </html>
  );
} 