'use client';

import { useState } from 'react';

type Props = {
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
};

export default function ConsentStep({ onSubmit, onPrev, isSubmitting }: Props) {
  const [consent, setConsent] = useState(false);
  const [dataAccuracy, setDataAccuracy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!consent || !dataAccuracy) {
      setError('You must agree to all declarations to proceed');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-military-gold mb-6">
        Consent & Declaration
      </h2>

      <div className="space-y-4">
        <div className="p-5 bg-white/5 border border-white/10 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={dataAccuracy}
              onChange={(e) => setDataAccuracy(e.target.checked)}
              className="w-5 h-5 mt-1 rounded border-white/20 bg-white/5 text-military-field-green focus:ring-military-field-green focus:ring-offset-0"
            />
            <div className="flex-1">
              <p className="text-military-smoke font-medium mb-1">
                Declaration of Accuracy
              </p>
              <p className="text-sm text-military-muted">
                I declare that all information provided in this form is true, accurate, and
                complete to the best of my knowledge. I understand that providing false
                information may result in disqualification.
              </p>
            </div>
          </label>
        </div>

        <div className="p-5 bg-white/5 border border-white/10 rounded-lg">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 mt-1 rounded border-white/20 bg-white/5 text-military-field-green focus:ring-military-field-green focus:ring-offset-0"
            />
            <div className="flex-1">
              <p className="text-military-smoke font-medium mb-1">
                Consent to Data Processing
              </p>
              <p className="text-sm text-military-muted">
                I consent to the collection, processing, and storage of my personal
                information by Lagos State Government (OSSG – Cabinet Office) for the
                purpose of coordinating military recruitment support and providing
                official updates.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="p-5 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
        <h3 className="font-semibold text-military-smoke mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-military-alert-red" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Important Reminders
        </h3>
        <ul className="space-y-2 text-sm text-military-muted">
          <li>• This is an <strong className="text-military-smoke">Expression of Interest</strong> only</li>
          <li>• <strong className="text-military-smoke">No payment</strong> is required at any stage</li>
          <li>• Final recruitment is conducted through official military channels</li>
          <li>• You will be contacted if your profile matches recruitment requirements</li>
          <li>• Keep your reference ID safe for future correspondence</li>
        </ul>
      </div>

      {error && (
        <div className="p-4 bg-military-alert-red/20 border border-military-alert-red rounded-lg">
          <p className="text-military-alert-red text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="btn-secondary" disabled={isSubmitting}>
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </div>
  );
}
