import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/api/auth/signout">Sign Out</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
