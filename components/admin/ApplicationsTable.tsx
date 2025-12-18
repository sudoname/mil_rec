'use client';

import { useState, useEffect } from 'react';
import ApplicationDetailModal from './ApplicationDetailModal';

interface Application {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  lga: string;
  branches: string;
  status: string;
  createdAt: string;
}

interface FullApplication extends Application {
  currentAddress: string;
  permanentAddress: string;
  highestQualification: string;
  numberOfPasses: number;
  examYear: number;
  preferredSkills: string | null;
}

export default function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [lgaFilter, setLgaFilter] = useState('ALL');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [selectedApplication, setSelectedApplication] = useState<FullApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch full application details
  const handleViewDetails = async (applicationId: string) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(`/api/applications/${applicationId}`);
      if (response.ok) {
        const fullData = await response.json();
        setSelectedApplication(fullData);
      }
    } catch (error) {
      console.error('Error fetching application details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.phone.includes(searchTerm) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.referenceId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // LGA filter
    if (lgaFilter !== 'ALL') {
      filtered = filtered.filter((app) => app.lga === lgaFilter);
    }

    // Branch filter
    if (branchFilter !== 'ALL') {
      filtered = filtered.filter((app) => app.branches.includes(branchFilter));
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, lgaFilter, branchFilter, applications]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  // Get unique LGAs and branches for filters
  const uniqueLGAs = Array.from(new Set(applications.map((app) => app.lga))).sort();
  const allBranches = Array.from(
    new Set(applications.flatMap((app) => app.branches.split(',')))
  ).sort();

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Reference ID',
      'Full Name',
      'Phone',
      'Email',
      'Date of Birth',
      'Gender',
      'LGA',
      'Branches',
      'Status',
      'Submitted On',
    ];

    const csvContent = [
      headers.join(','),
      ...filteredApplications.map((app) =>
        [
          app.referenceId,
          `"${app.fullName}"`,
          app.phone,
          app.email,
          app.dateOfBirth,
          app.gender,
          app.lga,
          `"${app.branches}"`,
          app.status,
          new Date(app.createdAt).toLocaleDateString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Status update
  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh applications
        fetchApplications();
        if (selectedApplication && selectedApplication.id === applicationId) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'REVIEWING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'SHORTLISTED':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'CONTACTED':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-military-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-military-muted">Loading applications...</p>
      </div>
    );
  }

  return (
    <>
      <div className="glass-card p-6 mb-6">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, phone, email, or ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field lg:col-span-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="CONTACTED">Contacted</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={lgaFilter}
            onChange={(e) => setLgaFilter(e.target.value)}
            className="input-field"
          >
            <option value="ALL">All LGAs</option>
            {uniqueLGAs.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="input-field"
          >
            <option value="ALL">All Branches</option>
            {allBranches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-military-muted">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredApplications.length)} of{' '}
            {filteredApplications.length} applications
          </div>
          <button onClick={handleExportCSV} className="btn-secondary text-sm">
            <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-military-navy/50 border-b border-military-gold/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Reference ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  LGA
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Branches
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-military-gold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {currentApplications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-military-muted">
                    No applications found
                  </td>
                </tr>
              ) : (
                currentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-smoke font-mono">
                      {app.referenceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-smoke">
                      {app.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-muted">
                      {app.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-muted">
                      {app.lga}
                    </td>
                    <td className="px-6 py-4 text-sm text-military-muted max-w-xs truncate">
                      {app.branches}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-military-muted">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(app.id)}
                        disabled={loadingDetails}
                        className="text-military-gold hover:text-military-gold/80 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingDetails ? 'Loading...' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="text-sm text-military-muted">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </>
  );
}
