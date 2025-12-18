'use client';

import { useState, useEffect } from 'react';

interface Application {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  lga: string;
  currentAddress: string;
  permanentAddress: string;
  highestQualification: string;
  numberOfPasses: number;
  examYear: number;
  branches: string;
  preferredSkills: string | null;
  status: string;
  createdAt: string;
}

interface Props {
  application: Application;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
}

export default function ApplicationDetailModal({ application, onClose, onStatusUpdate }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(application.status);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleStatusChange = async () => {
    if (selectedStatus === application.status) return;

    setUpdating(true);
    await onStatusUpdate(application.id, selectedStatus);
    setUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'text-blue-400';
      case 'REVIEWING':
        return 'text-yellow-400';
      case 'SHORTLISTED':
        return 'text-green-400';
      case 'CONTACTED':
        return 'text-purple-400';
      case 'REJECTED':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 glass-card border-b border-military-gold/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-military-gold mb-1">Application Details</h2>
            <p className="text-sm text-military-muted font-mono">{application.referenceId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-military-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Status Update Section */}
          <div className="bg-military-navy/30 rounded-lg p-6 border border-military-gold/20">
            <h3 className="text-lg font-bold text-military-smoke mb-4">Update Status</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm text-military-muted mb-2">Current Status</label>
                <div className={`text-xl font-bold ${getStatusColor(application.status)}`}>
                  {application.status}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-military-muted mb-2">Change To</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="NEW">New</option>
                  <option value="REVIEWING">Reviewing</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
              <div className="pt-6">
                <button
                  onClick={handleStatusChange}
                  disabled={selectedStatus === application.status || updating}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-military-muted mb-1">Full Name</label>
                <p className="text-military-smoke font-semibold">{application.fullName}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Gender</label>
                <p className="text-military-smoke">{application.gender}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Date of Birth</label>
                <p className="text-military-smoke">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Age</label>
                <p className="text-military-smoke">
                  {Math.floor(
                    (new Date().getTime() - new Date(application.dateOfBirth).getTime()) /
                      (365.25 * 24 * 60 * 60 * 1000)
                  )}{' '}
                  years
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-military-muted mb-1">Phone Number</label>
                <p className="text-military-smoke font-mono">{application.phone}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Email Address</label>
                <p className="text-military-smoke">{application.email}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Location Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-military-muted mb-1">Local Government Area</label>
                <p className="text-military-smoke font-semibold">{application.lga}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Current Address</label>
                <p className="text-military-smoke">{application.currentAddress}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Permanent Address</label>
                <p className="text-military-smoke">{application.permanentAddress}</p>
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div>
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Education Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-military-muted mb-1">Highest Qualification</label>
                <p className="text-military-smoke">{application.highestQualification}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Number of Passes</label>
                <p className="text-military-smoke">{application.numberOfPasses}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Exam Year</label>
                <p className="text-military-smoke">{application.examYear}</p>
              </div>
            </div>
          </div>

          {/* Branch Preferences */}
          <div>
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
              Branch Preferences
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-military-muted mb-2">Selected Branches</label>
                <div className="flex flex-wrap gap-2">
                  {application.branches.split(',').map((branch) => (
                    <span
                      key={branch}
                      className="px-3 py-1 bg-military-field-green/20 text-military-field-green border border-military-field-green/50 rounded-full text-sm font-semibold"
                    >
                      {branch.trim()}
                    </span>
                  ))}
                </div>
              </div>
              {application.preferredSkills && (
                <div>
                  <label className="block text-sm text-military-muted mb-1">Preferred Skills/Roles</label>
                  <p className="text-military-smoke">{application.preferredSkills}</p>
                </div>
              )}
            </div>
          </div>

          {/* Submission Information */}
          <div className="bg-military-navy/30 rounded-lg p-4 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-military-muted mb-1">Submitted On</label>
                <p className="text-military-smoke">
                  {new Date(application.createdAt).toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <div>
                <label className="block text-military-muted mb-1">Reference ID</label>
                <p className="text-military-smoke font-mono">{application.referenceId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-card border-t border-military-gold/20 p-6 flex justify-end">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
