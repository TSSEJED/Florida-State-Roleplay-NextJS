'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DiscordLogoIcon } from '@radix-ui/react-icons';

export default function SignIn() {
  const handleSignIn = () => {
    signIn('discord', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Sign in to Dashboard</h2>
          <p className="mt-2 text-sm text-gray-400">
            Please sign in with your Discord account to continue
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleSignIn}
            className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white py-6 text-lg"
          >
            <DiscordLogoIcon className="mr-2 h-6 w-6" />
            Sign in with Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
