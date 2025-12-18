'use client';

import { useState } from 'react';
import { LAGOS_LGAS } from '@/lib/constants';

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function LagosIndigeneStep({ data, updateData, onNext, onPrev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.lga) newErrors.lga = 'LGA is required';
    if (!data.placeOfOrigin.trim())
      newErrors.placeOfOrigin = 'Place of origin is required';
    if (!data.homeAddress.trim()) newErrors.homeAddress = 'Home address is required';
    if (!data.currentAddress.trim())
      newErrors.currentAddress = 'Current address is required';

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
      <h2 className="text-2xl font-bold text-military-gold mb-6">
        Lagos Indigene Details
      </h2>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Local Government Area (LGA) <span className="text-military-alert-red">*</span>
        </label>
        <select
          className="input-field w-full"
          value={data.lga}
          onChange={(e) => updateData({ lga: e.target.value })}
        >
          <option value="">Select LGA</option>
          {LAGOS_LGAS.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
        {errors.lga && (
          <p className="text-military-alert-red text-xs mt-1">{errors.lga}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Place of Origin <span className="text-military-alert-red">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Ikorodu"
          className="input-field w-full"
          value={data.placeOfOrigin}
          onChange={(e) => updateData({ placeOfOrigin: e.target.value })}
        />
        <p className="text-xs text-military-muted mt-1">
          Your ancestral town/village in Lagos State
        </p>
        {errors.placeOfOrigin && (
          <p className="text-military-alert-red text-xs mt-1">{errors.placeOfOrigin}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Home Address (Lagos) <span className="text-military-alert-red">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Your permanent home address in Lagos State"
          className="input-field w-full resize-none"
          value={data.homeAddress}
          onChange={(e) => updateData({ homeAddress: e.target.value })}
        />
        {errors.homeAddress && (
          <p className="text-military-alert-red text-xs mt-1">{errors.homeAddress}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Current Residential Address <span className="text-military-alert-red">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Where you currently reside"
          className="input-field w-full resize-none"
          value={data.currentAddress}
          onChange={(e) => updateData({ currentAddress: e.target.value })}
        />
        {errors.currentAddress && (
          <p className="text-military-alert-red text-xs mt-1">{errors.currentAddress}</p>
        )}
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
