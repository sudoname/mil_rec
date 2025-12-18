import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import ApplicationsTable from '@/components/admin/ApplicationsTable';

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight">
      <header className="glass-card border-b border-military-gold/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-military-gold hover:text-military-gold/80">
              ← Back to Dashboard
            </Link>
            <span className="text-sm text-military-muted">{session.user?.email}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-military-smoke mb-2">Applications Management</h1>
          <p className="text-military-muted">
            View, search, filter, and manage all EOI applications
          </p>
        </div>

        <ApplicationsTable />
      </main>
    </div>
  );
}
