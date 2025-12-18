'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

interface Admission {
  id: string;
  applicationNo: string;
  surname: string;
  firstName: string;
  otherName: string | null;
}

export default function SupplementaryListPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmissions, setFilteredAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = admissions.filter(
        (admission) =>
          admission.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admission.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          admission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (admission.otherName && admission.otherName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredAdmissions(filtered);
    } else {
      setFilteredAdmissions(admissions);
    }
  }, [searchTerm, admissions]);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/army-admissions?listType=SUPPLEMENTARY&limit=1000');
      if (response.ok) {
        const data = await response.json();
        setAdmissions(data.admissions);
        setFilteredAdmissions(data.admissions);
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-military-gold hover:text-military-gold/80 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-military-field-green mb-2">90RRI Supplementary List</h1>
            <p className="text-military-muted">
              Official supplementary list of shortlisted candidates for 90th Regular Recruit Intake - Lagos State
            </p>
          </div>

          {/* Search and Stats */}
          <div className="glass-card p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <input
                type="text"
                placeholder="Search by Application No., Surname, or First Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
              <div className="text-right">
                <p className="text-military-muted text-sm">
                  Showing{' '}
                  <span className="text-military-field-green font-bold">{filteredAdmissions.length}</span> of{' '}
                  <span className="text-military-smoke font-bold">{admissions.length}</span> candidates
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-military-field-green border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-military-muted">Loading candidates...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-military-navy/50 border-b border-military-field-green/20">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-military-field-green uppercase">#</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-military-field-green uppercase">
                        Application Number
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-military-field-green uppercase">
                        Surname
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-military-field-green uppercase">
                        First Name
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-military-field-green uppercase">
                        Other Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredAdmissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-military-muted">
                          {searchTerm ? 'No candidates found matching your search' : 'No candidates available'}
                        </td>
                      </tr>
                    ) : (
                      filteredAdmissions.map((admission, index) => (
                        <tr key={admission.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 text-sm text-military-muted">{index + 1}</td>
                          <td className="px-4 py-3 text-sm text-military-field-green font-mono">
                            {admission.applicationNo}
                          </td>
                          <td className="px-4 py-3 text-sm text-military-smoke font-semibold">
                            {admission.surname}
                          </td>
                          <td className="px-4 py-3 text-sm text-military-smoke">{admission.firstName}</td>
                          <td className="px-4 py-3 text-sm text-military-muted">
                            {admission.otherName || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-6 p-4 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-military-alert-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm">
                <p className="font-bold text-military-smoke mb-1">Important Notice:</p>
                <p className="text-military-muted">
                  Always verify your status on the official Nigerian Army recruitment portal at{' '}
                  <a href="https://recruitment.army.mil.ng/drm?list_type=supplementary" target="_blank" rel="noopener noreferrer" className="text-military-gold hover:underline">
                    recruitment.army.mil.ng
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
