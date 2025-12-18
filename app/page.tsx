import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import PosterCarousel from '@/components/layout/PosterCarousel';
import ArmyAdmissionTile from '@/components/layout/ArmyAdmissionTile';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight">
        {/* Hero Banner */}
        <section className="relative py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-military-gold/10 border border-military-gold/30 rounded-full mb-6">
              <p className="text-military-gold text-sm font-semibold uppercase tracking-wide">Official EOI Portal</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-military-smoke mb-6 animate-fade-in-up">
              Lagos State Candidate Information<br className="hidden md:block" /> & Interest Registry
            </h1>
            <p className="mt-4 text-lg md:text-xl text-military-muted max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Submit your details once. Get contacted with next steps and official screening updates for Nigerian Military recruitment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Link
                href="/show-interest"
                className="btn-primary"
              >
                Register Interest
              </Link>
              <Link
                href="/contact"
                className="btn-secondary"
              >
                Contact OSSG
              </Link>
            </div>
            <p className="mt-6 text-sm text-military-muted italic">
              Coordinated through OSSG – Cabinet Office, Lagos State Government
            </p>
          </div>
        </section>

        {/* Poster Carousel */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-military-gold mb-2">
                Official Recruitment Updates
              </h2>
              <p className="text-military-muted">
                View official posters and announcements
              </p>
            </div>
            <PosterCarousel />
          </div>
        </section>

        {/* Army Admission List */}
        <ArmyAdmissionTile />

        {/* Official Notice */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card glow-border p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-military-gold/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-military-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-military-gold mb-2">Official Notice</h2>
                  <p className="text-military-smoke/80 text-sm">Lagos State Government — OSSG Cabinet Office</p>
                </div>
              </div>

              <div className="space-y-4 text-military-smoke leading-relaxed">
                <p>
                  This portal supports Lagos State indigenes who wish to join the Nigerian military by collecting Expressions of Interest and providing guidance and screening updates.
                </p>
                <p>
                  Coordinated through <span className="font-semibold text-military-gold">OSSG – Cabinet Office, Lagos State Government.</span>
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-military-muted">
                    <span className="font-semibold">Office:</span> Cabinet Office Block 1, The Secretariat, Alausa, Ikeja
                  </p>
                </div>
              </div>

              {/* Anti-scam disclaimer */}
              <div className="mt-8 p-5 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-military-alert-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm space-y-2">
                    <p className="font-bold text-military-smoke">Important:</p>
                    <ul className="space-y-1 text-military-muted">
                      <li>• <strong>No payment is required</strong> to register interest on this portal</li>
                      <li>• Final recruitment is handled only through official military recruitment channels</li>
                      <li>• Do not share OTPs or passwords with anyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branches Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-military-gold mb-4">Military Branches</h2>
              <p className="text-military-muted max-w-2xl mx-auto">
                Expression of Interest covers all branches of the Nigerian Armed Forces
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Nigerian Army', icon: '🪖', url: 'https://recruitment.army.mil.ng' },
                { name: 'Nigerian Navy', icon: '⚓', url: 'https://joinnigeriannavy.navy.mil.ng' },
                { name: 'Nigerian Air Force', icon: '✈️', url: 'https://nafrecruitment.airforce.mil.ng' },
                { name: 'Defence Intelligence', icon: '🛡️', url: null },
                { name: 'Cyber Defence', icon: '💻', url: null },
                { name: 'Support Roles', icon: '⚙️', url: null },
              ].map((branch) => (
                <div key={branch.name} className="glass-card-hover p-6 text-center group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{branch.icon}</div>
                  <h3 className="text-xl font-bold text-military-smoke mb-2">{branch.name}</h3>
                  {branch.url && (
                    <a
                      href={branch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-military-gold hover:text-military-gold/80 transition-colors"
                    >
                      Official Site
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-military-muted">
                Click on branch links to visit official recruitment portals
              </p>
            </div>
          </div>
        </section>

        {/* Eligibility Summary */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-military-gold text-center mb-10">Basic Eligibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-military-field-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Lagos State Indigene</h3>
                    <p className="text-sm text-military-muted">Required for this EOI portal</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-military-field-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Age: 18–26</h3>
                    <p className="text-sm text-military-muted">As applicable to military branches</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-military-field-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Minimum Qualifications</h3>
                    <p className="text-sm text-military-muted">4 passes (WAEC/NECO/Trade Certificate)</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-military-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-1">Official Channels Only</h3>
                    <p className="text-sm text-military-muted">Registration through military recruitment channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-military-smoke mb-4">
              Ready to Register Your Interest?
            </h2>
            <p className="text-lg text-military-muted mb-8">
              Submit your information and receive official updates on screening and recruitment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/show-interest" className="btn-primary text-lg px-10 py-4">
                Register Interest
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-10 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-military-gold/20 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3">
            <p className="text-military-smoke font-semibold">&copy; 2025 Lagos State Government - OSSG Cabinet Office</p>
            <p className="text-sm text-military-muted">
              This is an Expression of Interest portal only. <span className="font-semibold text-military-smoke">No fees are charged.</span>
            </p>
            <div className="pt-4 flex justify-center gap-6 text-sm text-military-muted">
              <Link href="/about" className="hover:text-military-gold transition-colors">About</Link>
              <Link href="/contact" className="hover:text-military-gold transition-colors">Contact</Link>
              <Link href="/admin" className="hover:text-military-gold transition-colors">Admin</Link>
            </div>
            <div className="pt-6 border-t border-white/10 mt-6">
              <p className="text-xs text-military-muted">
                Built with purpose by <a href="https://techsphere.ng" target="_blank" rel="noopener noreferrer" className="text-military-gold hover:text-military-gold/80">techsphere.ng</a> for Lagos State OSSG
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
