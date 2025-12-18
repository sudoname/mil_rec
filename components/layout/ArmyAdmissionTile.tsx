'use client';

import Link from 'next/link';

export default function ArmyAdmissionTile() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-military-field-green/10 border border-military-field-green/30 rounded-full mb-4">
            <svg className="w-5 h-5 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-military-field-green text-sm font-semibold uppercase tracking-wide">
              Official Results
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-military-gold mb-2">
            90RRI Shortlisted Candidates - Lagos State
          </h2>
          <p className="text-military-muted">
            View official recruitment results by branch
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nigerian Army */}
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">🪖</div>
              <h3 className="text-xl font-bold text-military-smoke mb-1">Nigerian Army</h3>
              <p className="text-xs text-military-muted">90RRI Results</p>
            </div>
            <div className="space-y-2">
              <Link
                href="/army-admission/main-list"
                className="block w-full px-4 py-2 bg-military-gold/20 hover:bg-military-gold/30 border border-military-gold/50 rounded-lg text-center text-sm font-semibold text-military-gold transition-colors"
              >
                Main List (600)
              </Link>
              <Link
                href="/army-admission/supplementary-list"
                className="block w-full px-4 py-2 bg-military-field-green/20 hover:bg-military-field-green/30 border border-military-field-green/50 rounded-lg text-center text-sm font-semibold text-military-field-green transition-colors"
              >
                Supplementary (46)
              </Link>
            </div>
          </div>

          {/* Nigerian Navy */}
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">⚓</div>
              <h3 className="text-xl font-bold text-military-smoke mb-1">Nigerian Navy</h3>
              <p className="text-xs text-military-muted">Coming Soon</p>
            </div>
            <div className="space-y-2">
              <button
                disabled
                className="block w-full px-4 py-2 bg-military-muted/10 border border-military-muted/30 rounded-lg text-center text-sm font-semibold text-military-muted cursor-not-allowed"
              >
                Main List
              </button>
              <button
                disabled
                className="block w-full px-4 py-2 bg-military-muted/10 border border-military-muted/30 rounded-lg text-center text-sm font-semibold text-military-muted cursor-not-allowed"
              >
                Supplementary
              </button>
            </div>
          </div>

          {/* Nigerian Air Force */}
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="text-xl font-bold text-military-smoke mb-1">Nigerian Air Force</h3>
              <p className="text-xs text-military-muted">Coming Soon</p>
            </div>
            <div className="space-y-2">
              <button
                disabled
                className="block w-full px-4 py-2 bg-military-muted/10 border border-military-muted/30 rounded-lg text-center text-sm font-semibold text-military-muted cursor-not-allowed"
              >
                Main List
              </button>
              <button
                disabled
                className="block w-full px-4 py-2 bg-military-muted/10 border border-military-muted/30 rounded-lg text-center text-sm font-semibold text-military-muted cursor-not-allowed"
              >
                Supplementary
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-military-alert-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="font-bold text-military-smoke mb-1">Important Notice:</p>
              <p className="text-military-muted">
                Always verify your status on the official recruitment portals. This is for informational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
