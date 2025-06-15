"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function TrainersPortal() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPdf, setCurrentPdf] = useState<{url: string; title: string; isGoogleDoc: boolean} | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isMounted]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openPdf = (fileName: string, title: string, doc: any) => {
    setCurrentPdf({ 
      url: doc.filePath || fileName,
      title,
      isGoogleDoc: doc.isGoogleDoc || false
    });
  };

  const closePdf = () => {
    setCurrentPdf(null);
  };

  if (!isMounted) {
    return null;
  }

  const documents = [
    {
      id: 1,
      title: 'Trainer Guide',
      description: 'Complete guide for FSRP trainers. Last Updated: June 10, 2025',
      icon: '📘',
      fileName: 'Trainer Guide for FSRP (2).pdf',
      filePath: '/trainers/Trainer Guide for FSRP (2).pdf',
      author: 'FSRP Team',
      authorLink: 'https://discord.gg/fsrp',
      restricted: false
    },
    {
      id: 2,
      title: 'Staff Training',
      description: 'Comprehensive training materials for staff. Last Updated: June 10, 2025',
      icon: '🎓',
      fileName: 'Full staff training document.pdf',
      filePath: '/trainers/Full staff training document.pdf',
      author: 'FSRP Team',
      authorLink: 'https://discord.gg/fsrp',
      restricted: false
    },
    {
      id: 3,
      title: 'Warning Policy',
      description: 'Staff warning policy document. Last Updated: June 10, 2025',
      icon: '⚠️',
      fileName: 'STAFF WARNING POLICY DOCUMENT.pdf',
      filePath: '/trainers/STAFF WARNING POLICY DOCUMENT.pdf',
      author: 'FSRP Team',
      authorLink: 'https://discord.gg/fsrp',
      restricted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTU5IDYwSDFWMWg1OHY1OXpNMSAwaC0xdjYyaDYyVjBIMHoiIGZpbGw9IiMxMTEiLz48L3N2Zz4=')] opacity-5"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo/logo.png"
                alt="FSRP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              FSRP Trainers Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="https://policeroleplay.community/join/AebBj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors flex items-center space-x-2"
            >
              <span>Join Game</span>
              <span>🎮</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trainer Resources</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Access important documents and resources for FSRP trainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{doc.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                <p className="text-gray-300 mb-4">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => !doc.restricted && openPdf(doc.fileName, doc.title, doc)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      doc.restricted
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={doc.restricted}
                  >
                    {doc.restricted ? 'Restricted' : 'View Document'}
                  </button>
                  <a
                    href={doc.authorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-blue-400"
                  >
                    by {doc.author}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Document Viewer Modal */}
      {currentPdf && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{currentPdf.title}</h3>
              <div className="flex items-center space-x-2">
                <a
                  href={currentPdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <span>Open in New Tab</span>
                  <span>↗</span>
                </a>
                <button
                  onClick={closePdf}
                  className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              {currentPdf.isGoogleDoc ? (
                <iframe
                  src={currentPdf.url}
                  className="w-full h-full min-h-[70vh] border-0"
                  title={currentPdf.title}
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              ) : (
                <object
                  data={currentPdf.url}
                  type="application/pdf"
                  className="w-full h-full min-h-[70vh] border-0"
                  aria-label={currentPdf.title}
                >
                  <div className="p-4 text-center text-gray-300">
                    <p>Unable to display PDF. Please download it instead.</p>
                    <a 
                      href={currentPdf.url} 
                      className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                      download
                    >
                      Download Document
                    </a>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Florida State Roleplay. All rights reserved.
        </p>
      </footer>
    </div>
  );
}