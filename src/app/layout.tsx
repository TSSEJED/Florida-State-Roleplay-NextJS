'use client';

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <title>Florida State Roleplay</title>
        <meta name="description" content="The Ultimate ERLC Private Server Experience." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm">
                <p>© {new Date().getFullYear()} Florida State Roleplay. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
