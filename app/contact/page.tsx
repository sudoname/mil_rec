'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', contact: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-military-gold mb-4">
              Contact the Coordinating Office
            </h1>
            <p className="text-lg text-military-muted">
              For enquiries and candidate guidance, reach OSSG – Cabinet Office
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Office Address */}
              <div className="glass-card p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-military-gold/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-2">Office Address</h3>
                    <p className="text-military-muted text-sm">
                      Cabinet Office Block 1<br />
                      The Secretariat, Alausa<br />
                      Ikeja, Lagos State<br />
                      Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Persons */}
              <div className="glass-card p-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-military-field-green/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-field-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-3">Contact Persons</h3>
                    <div className="space-y-3 text-sm">
                      <div className="pb-3 border-b border-white/10">
                        <p className="font-semibold text-military-smoke">Director, Cabinet Office</p>
                        <p className="text-military-muted">Phone: +234 XXX XXX XXXX</p>
                      </div>
                      <div>
                        <p className="font-semibold text-military-smoke">Coordination Unit</p>
                        <p className="text-military-muted">Phone: +234 XXX XXX XXXX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="glass-card p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-military-muted/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-military-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-military-smoke mb-2">Office Hours</h3>
                    <div className="text-military-muted text-sm space-y-1">
                      <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                      <p>Saturday - Sunday: Closed</p>
                      <p className="text-xs mt-2 text-military-gold">Public holidays excluded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-military-smoke mb-6">Send a Message</h2>

                {success && (
                  <div className="mb-6 p-4 bg-military-field-green/10 border border-military-field-green/30 rounded-lg">
                    <p className="text-military-field-green text-sm">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
                    <p className="text-military-alert-red text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-military-smoke mb-2">
                      Your Name <span className="text-military-alert-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-military-smoke mb-2">
                      Contact (Phone/Email) <span className="text-military-alert-red">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="input-field w-full"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Phone number or email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-military-smoke mb-2">
                      Message <span className="text-military-alert-red">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="input-field w-full resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message or enquiry here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>

                <p className="mt-6 text-xs text-military-muted text-center">
                  We typically respond within 48 hours during business days
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-12 glass-card p-6 border-2 border-military-alert-red/30">
            <h3 className="font-bold text-military-smoke mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-military-alert-red" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Beware of Scammers
            </h3>
            <p className="text-sm text-military-muted">
              No payment is required at any stage. Official communication only comes from
              verified Lagos State Government channels. Do not share sensitive information
              with unverified sources.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-military-gold/20 py-10 mt-12">
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
              <Link href="/about" className="hover:text-military-gold transition-colors">
                About
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
