'use client';

import { useState } from 'react';
import { QUALIFICATIONS } from '@/lib/constants';

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function EducationStep({ data, updateData, onNext, onPrev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.qualification) newErrors.qualification = 'Qualification is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-military-gold mb-6">Education</h2>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Highest Qualification <span className="text-military-alert-red">*</span>
        </label>
        <select
          className="input-field w-full"
          value={data.qualification}
          onChange={(e) => updateData({ qualification: e.target.value })}
        >
          <option value="">Select qualification</option>
          {QUALIFICATIONS.map((qual) => (
            <option key={qual} value={qual}>
              {qual}
            </option>
          ))}
        </select>
        {errors.qualification && (
          <p className="text-military-alert-red text-xs mt-1">{errors.qualification}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Number of Passes (Optional)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            placeholder="e.g., 5"
            className="input-field w-full"
            value={data.numberOfPasses || ''}
            onChange={(e) =>
              updateData({ numberOfPasses: e.target.value ? parseInt(e.target.value) : undefined })
            }
          />
          <p className="text-xs text-military-muted mt-1">For WAEC/NECO/GCE</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Number of Sittings (Optional)
          </label>
          <select
            className="input-field w-full"
            value={data.numberOfSittings || ''}
            onChange={(e) =>
              updateData({ numberOfSittings: e.target.value ? parseInt(e.target.value) : undefined })
            }
          >
            <option value="">Select</option>
            <option value="1">1 Sitting</option>
            <option value="2">2 Sittings</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Year of Exam (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., 2020"
            maxLength={4}
            className="input-field w-full"
            value={data.yearOfExam || ''}
            onChange={(e) => updateData({ yearOfExam: e.target.value })}
          />
        </div>
      </div>

      <div className="p-4 bg-military-gold/10 border border-military-gold/30 rounded-lg">
        <p className="text-sm text-military-smoke">
          <span className="font-semibold">Note:</span> Ensure your qualifications are verifiable.
          You may be required to present original certificates during screening.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={onPrev} className="btn-secondary">
          Back
        </button>
        <button onClick={handleNext} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
