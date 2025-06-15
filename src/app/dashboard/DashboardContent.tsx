'use client';

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Application {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  data: Record<string, unknown>;
}

export default function DashboardContent() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchApplications = async () => {
      try {
        if (session?.user?.roles?.includes('Dashboard')) {
          const appsRes = await fetch('/api/applications');
          const appsData = await appsRes.json();
          setApplications(appsData);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  if (!session?.user?.roles?.includes('Dashboard')) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-400">
            You don't have permission to access this page.
          </p>
          <Button
            onClick={handleSignOut}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Sign Out
          </Button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {/* Add your dashboard content here */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Welcome, {session.user.name}!</h2>
            <p className="text-gray-400">You have {applications.length} application(s).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
