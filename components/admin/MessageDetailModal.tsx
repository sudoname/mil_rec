'use client';

import { useState, useEffect } from 'react';

interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  message: string;
  isResolved: boolean;
  createdAt: string;
}

interface Props {
  message: ContactMessage;
  onClose: () => void;
  onToggleResolved: (id: string, isResolved: boolean) => void;
  onDelete: (id: string) => void;
}

export default function MessageDetailModal({ message, onClose, onToggleResolved, onDelete }: Props) {
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleToggleResolved = async () => {
    setUpdating(true);
    await onToggleResolved(message.id, !message.isResolved);
    setUpdating(false);
  };

  const handleDelete = () => {
    onDelete(message.id);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 glass-card border-b border-military-gold/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-military-gold mb-1">Contact Message</h2>
            <p className="text-sm text-military-muted">
              Received {new Date(message.createdAt).toLocaleDateString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </p>
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
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <div>
              {message.isResolved ? (
                <span className="px-3 py-1.5 text-sm font-semibold rounded-full bg-green-500/20 text-green-300 border border-green-500/50">
                  ✓ Resolved
                </span>
              ) : (
                <span className="px-3 py-1.5 text-sm font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/50">
                  ⚠ Unresolved
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleToggleResolved}
                disabled={updating}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {updating
                  ? 'Updating...'
                  : message.isResolved
                  ? 'Mark as Unresolved'
                  : 'Mark as Resolved'}
              </button>
              <button
                onClick={handleDelete}
                className="btn-secondary text-sm hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Sender Information */}
          <div className="bg-military-navy/30 rounded-lg p-6 border border-military-gold/20">
            <h3 className="text-lg font-bold text-military-gold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Sender Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-military-muted mb-1">Name</label>
                <p className="text-military-smoke font-semibold">{message.name}</p>
              </div>
              <div>
                <label className="block text-sm text-military-muted mb-1">Contact (Phone/Email)</label>
                <p className="text-military-smoke">{message.contact}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-military-muted mb-1">Received On</label>
                <p className="text-military-smoke">
                  {new Date(message.createdAt).toLocaleDateString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-sm text-military-muted mb-2">Message</label>
            <div className="bg-military-navy/30 rounded-lg p-6 border border-white/10">
              <p className="text-military-smoke leading-relaxed whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-military-gold/10 rounded-lg p-4 border border-military-gold/30">
            <h4 className="text-sm font-semibold text-military-gold mb-3">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              {message.contact.includes('@') ? (
                <a
                  href={`mailto:${message.contact}?subject=Re: Message from ${encodeURIComponent(message.name)}`}
                  className="btn-secondary text-sm"
                >
                  <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Reply via Email
                </a>
              ) : (
                <a
                  href={`tel:${message.contact}`}
                  className="btn-secondary text-sm"
                >
                  <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Call
                </a>
              )}
              <button
                onClick={() => navigator.clipboard.writeText(message.contact)}
                className="btn-secondary text-sm"
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
                Copy Contact
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-card border-t border-military-gold/20 p-6 flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
