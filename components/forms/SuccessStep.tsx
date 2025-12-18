import Link from 'next/link';

type Props = {
  referenceId: string;
};

export default function SuccessStep({ referenceId }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="glass-card p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-military-field-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-military-field-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-military-gold mb-4">
          Registration Successful!
        </h1>
        <p className="text-lg text-military-smoke mb-8">
          Your Expression of Interest has been submitted successfully
        </p>

        {/* Reference ID */}
        <div className="bg-military-navy/50 border-2 border-military-gold/30 rounded-lg p-6 mb-8">
          <p className="text-sm text-military-muted mb-2">Your Reference ID</p>
          <p className="text-2xl md:text-3xl font-mono font-bold text-military-gold tracking-wider">
            {referenceId}
          </p>
          <p className="text-xs text-military-muted mt-3">
            Keep this reference ID safe for future correspondence
          </p>
        </div>

        {/* Next Steps */}
        <div className="text-left space-y-4 mb-8">
          <h2 className="text-xl font-bold text-military-smoke mb-4">What Happens Next?</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-military-field-green/20 rounded-full flex items-center justify-center text-military-field-green font-bold text-sm">
                1
              </div>
              <p className="text-military-muted">
                Your application will be reviewed by the coordinating office
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-military-field-green/20 rounded-full flex items-center justify-center text-military-field-green font-bold text-sm">
                2
              </div>
              <p className="text-military-muted">
                You will be contacted via phone/email when official recruitment opens
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-military-field-green/20 rounded-full flex items-center justify-center text-military-field-green font-bold text-sm">
                3
              </div>
              <p className="text-military-muted">
                Follow official military recruitment channels for screening and selection
              </p>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="p-5 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg text-left mb-8">
          <p className="text-sm text-military-muted">
            <span className="font-semibold text-military-smoke">Important:</span> Beware of scammers.
            No payment is required at any stage. Official communication will only come through verified channels.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Return to Homepage
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
