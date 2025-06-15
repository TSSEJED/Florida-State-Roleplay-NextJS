'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Application {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  data: Record<string, unknown>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      const fetchApplications = async () => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          // For now, use mock data
          setApplications([
            {
              id: '1',
              type: 'Moderator',
              status: 'pending',
              createdAt: new Date().toISOString(),
              data: {}
            }
          ]);
        } catch (error) {
          console.error('Error fetching applications:', error);
          setError('Failed to load applications');
        } finally {
          setLoading(false);
        }
      };

      fetchApplications();
    }
  }, [status, router]);

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

  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Access Denied</h2>
          <p className="text-gray-400">
            You need to be signed in to view this page.
          </p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => router.push('/api/auth/signout')}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        
        {error && (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-900/30 p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          <div className="rounded-lg bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Welcome, {session.user.name}!
            </h2>
            <p className="text-gray-400">
              You have {applications.length} application(s).
            </p>
          </div>

          {applications.length > 0 && (
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Recent Applications</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-lg border border-gray-700 bg-gray-700/30 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">
                        {app.type} Application
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          app.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Submitted on{' '}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => {
                        // View application details
                        console.log('View application:', app.id);
                      }}
                      className="mt-3 text-sm text-blue-400 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
