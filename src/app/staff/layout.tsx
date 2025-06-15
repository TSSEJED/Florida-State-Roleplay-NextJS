import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm">
              <p>© {new Date().getFullYear()} Florida State Roleplay. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
