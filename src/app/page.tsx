"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Banner Section */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.png"
            alt="Florida State Roleplay"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
              <Image
                src="/logo/logo.png"
                alt="Florida State Roleplay"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Florida State Roleplay
            </h1>
            <p className="text-xl text-gray-300">
              The Ultimate ERLC Experience
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 md:p-12 text-center">
          <div className="inline-block px-6 py-2 bg-blue-900/30 text-blue-300 rounded-full text-lg font-medium mb-6 border border-blue-700/30">
            Coming Soon
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            We're Building Something Amazing
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Our team is working hard to bring you an unforgettable roleplay experience. 
            Stay tuned for updates and get ready to join our community!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Join Our Discord
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Florida State Roleplay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}