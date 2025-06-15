"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ApplicationCardProps = {
  title: string;
  description: string;
  href: string;
  icon: string;
  isComingSoon?: boolean;
};

const ApplicationCard = ({ title, description, href, icon, isComingSoon = false }: ApplicationCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        {isComingSoon ? (
          <span className="px-4 py-2 bg-gray-700 text-gray-400 rounded-md font-medium cursor-not-allowed">
            Coming Soon
          </span>
        ) : (
          <Link
            href={href}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
          >
            Apply Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default function ApplicationsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  if (!isMounted) {
    return null;
  }

  const applications = [
    {
      title: 'Trainer Application',
      description: 'Join our team of professional trainers and help shape the future of our community.',
      href: '/applications/trainer',
      icon: '👨🏫',
    },
    {
      title: 'Moderator Application',
      description: 'Help maintain order and ensure a positive experience for all community members.',
      href: '/applications/moderator',
      icon: '🛡️',
    },
    {
      title: 'HR+ Application',
      description: 'Join our human resources team and help us build a better community.',
      href: '#',
      icon: '💼',
      isComingSoon: true,
    },
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
              FSRP Applications
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose an application below to get started with your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <ApplicationCard key={index} {...app} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Don't see the right position? Check back later for more opportunities!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
