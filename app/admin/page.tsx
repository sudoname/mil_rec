import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch dashboard stats
  const [
    totalApplications,
    todayApplications,
    statusBreakdown,
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.application.groupBy({
      by: ['status'],
      _count: true,
    }),
  ]);

  const stats = [
    {
      label: 'Total Applications',
      value: totalApplications,
      icon: '📋',
      color: 'text-military-gold',
    },
    {
      label: "Today's Registrations",
      value: todayApplications,
      icon: '📅',
      color: 'text-military-field-green',
    },
    {
      label: 'New Applications',
      value: statusBreakdown.find((s) => s.status === 'NEW')?._count || 0,
      icon: '🆕',
      color: 'text-blue-400',
    },
    {
      label: 'Under Review',
      value: statusBreakdown.find((s) => s.status === 'REVIEWING')?._count || 0,
      icon: '👀',
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight">
      {/* Header */}
      <header className="glass-card border-b border-military-gold/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-military-gold rounded-lg flex items-center justify-center">
                  <span className="text-military-navy font-black text-lg">MR</span>
                </div>
                <div>
                  <div className="text-military-smoke font-bold">Admin Dashboard</div>
                  <div className="text-military-muted text-xs">Military Recruitment Portal</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-military-muted">
                {session.user?.email}
              </span>
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="btn-secondary text-sm py-2 px-4">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-military-smoke mb-2">
            Welcome, {session.user?.name || 'Admin'}
          </h1>
          <p className="text-military-muted">
            Manage applications and coordinate recruitment support
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-military-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/applications"
            className="glass-card-hover p-6 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-military-field-green/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-military-smoke mb-1">View Applications</h3>
                <p className="text-xs text-military-muted">Manage all EOI submissions</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/messages"
            className="glass-card-hover p-6 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-military-gold/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-military-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-military-smoke mb-1">Contact Messages</h3>
                <p className="text-xs text-military-muted">View enquiries</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="glass-card-hover p-6 block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-military-muted/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-military-muted" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-military-smoke mb-1">Settings</h3>
                <p className="text-xs text-military-muted">Configure portal</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Status Breakdown */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-military-smoke mb-4">Application Status</h2>
          <div className="space-y-3">
            {statusBreakdown.map((stat) => (
              <div key={stat.status} className="flex items-center justify-between">
                <span className="text-military-muted capitalize">
                  {stat.status.toLowerCase().replace('_', ' ')}
                </span>
                <span className="font-bold text-military-smoke">{stat._count}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
