import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-military-gold mb-4">
              About This Initiative
            </h1>
            <p className="text-lg text-military-muted">
              Supporting Lagos State indigenes in their military career aspirations
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Overview Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-military-smoke mb-4">Overview</h2>
              <div className="space-y-4 text-military-muted leading-relaxed">
                <p>
                  The Lagos State Candidate Information & Interest Registry is an initiative
                  coordinated by the Office of the Secretary to the State Government (OSSG)
                  – Cabinet Office to support Lagos State indigenes who aspire to join the
                  Nigerian Armed Forces.
                </p>
                <p>
                  This portal serves as an Expression of Interest (EOI) platform where
                  qualified candidates can register their details and receive verified
                  information, guidance, and official updates regarding Nigerian Military
                  recruitment opportunities.
                </p>
              </div>
            </div>

            {/* Purpose Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-military-smoke mb-4">Our Purpose</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-military-field-green/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Centralized Coordination</h3>
                    <p className="text-military-muted text-sm">
                      Maintain a database of interested Lagos indigenes for streamlined
                      communication when official recruitment begins
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-military-field-green/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Information Support</h3>
                    <p className="text-military-muted text-sm">
                      Provide verified updates and guidance on official recruitment processes,
                      requirements, and timelines
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-military-field-green/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Candidate Preparation</h3>
                    <p className="text-military-muted text-sm">
                      Help candidates prepare adequately by providing clear information
                      on eligibility requirements and screening procedures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="glass-card p-8 border-2 border-military-gold/30">
              <h2 className="text-2xl font-bold text-military-gold mb-4">Important Notice</h2>
              <div className="space-y-3 text-military-muted">
                <p className="flex items-start gap-2">
                  <span className="text-military-gold">•</span>
                  <span>
                    This portal collects <strong className="text-military-smoke">Expression of Interest</strong> only
                    and does NOT guarantee enlistment or final selection
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-military-gold">•</span>
                  <span>
                    Final recruitment, screening, and selection are conducted exclusively by
                    the Nigerian Armed Forces through their official channels
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-military-gold">•</span>
                  <span>
                    <strong className="text-military-smoke">No payment</strong> is required at any stage
                    of registration or communication through this portal
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-military-gold">•</span>
                  <span>
                    Beware of scammers. Official communication will only come from verified
                    Lagos State Government channels
                  </span>
                </p>
              </div>
            </div>

            {/* Coordinating Office */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-military-smoke mb-4">Coordinating Office</h2>
              <div className="space-y-3 text-military-muted">
                <p>
                  <span className="font-semibold text-military-smoke">Department:</span>{' '}
                  Office of the Secretary to the State Government (OSSG) – Cabinet Office
                </p>
                <p>
                  <span className="font-semibold text-military-smoke">Address:</span>{' '}
                  Cabinet Office Block 1, The Secretariat, Alausa, Ikeja, Lagos State
                </p>
                <p>
                  <span className="font-semibold text-military-smoke">State:</span>{' '}
                  Lagos State, Nigeria
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-card p-8 text-center">
              <h2 className="text-2xl font-bold text-military-smoke mb-4">
                Ready to Register Your Interest?
              </h2>
              <p className="text-military-muted mb-6">
                Complete the Expression of Interest form to receive official updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/show-interest" className="btn-primary">
                  Register Interest
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-military-gold/20 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3">
            <p className="text-military-smoke font-semibold">
              &copy; 2025 Lagos State Government - OSSG Cabinet Office
            </p>
            <p className="text-sm text-military-muted">
              This is an Expression of Interest portal only.{' '}
              <span className="font-semibold text-military-smoke">No fees are charged.</span>
            </p>
            <div className="pt-4 flex justify-center gap-6 text-sm text-military-muted">
              <Link href="/" className="hover:text-military-gold transition-colors">
                Home
              </Link>
              <Link href="/contact" className="hover:text-military-gold transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="hover:text-military-gold transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
