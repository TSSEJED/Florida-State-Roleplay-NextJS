"use client";

import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Application {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  data: Record<string, unknown>;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    // Fetch applications if user is admin
    const fetchApplications = async () => {
      try {
        if (session?.user?.role === 'admin') {
          const appsRes = await fetch('/api/applications');
          const appsData = await appsRes.json();
          setApplications(appsData);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session?.user?.role) {
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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-800/50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">FSRP Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {session.user.email}
            </span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-700"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Recent Applications</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-lg border border-gray-700 bg-gray-800/50 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
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
                    Submitted on{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-blue-400 hover:bg-blue-500/10"
                    onClick={() => {
                      // View application details
                      console.log('View application:', app.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400">
                No applications found.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
