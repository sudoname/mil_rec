'use client';

import { useState } from 'react';

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
};

export default function PersonalInfoStep({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^(\+234|0)[789]\d{9}$/.test(data.phone))
      newErrors.phone = 'Invalid Nigerian phone number';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Invalid email address';
    if (!data.gender) newErrors.gender = 'Gender is required';
    if (!data.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    else {
      const age = new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear();
      if (age < 18 || age > 35) newErrors.dateOfBirth = 'Age must be between 18 and 35';
    }

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
      <h2 className="text-2xl font-bold text-military-gold mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            First Name <span className="text-military-alert-red">*</span>
          </label>
          <input
            type="text"
            className="input-field w-full"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
          />
          {errors.firstName && (
            <p className="text-military-alert-red text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Last Name <span className="text-military-alert-red">*</span>
          </label>
          <input
            type="text"
            className="input-field w-full"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
          />
          {errors.lastName && (
            <p className="text-military-alert-red text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-2">
          Middle Name (Optional)
        </label>
        <input
          type="text"
          className="input-field w-full"
          value={data.middleName}
          onChange={(e) => updateData({ middleName: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Phone Number <span className="text-military-alert-red">*</span>
          </label>
          <input
            type="tel"
            placeholder="08012345678"
            className="input-field w-full"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
          />
          {errors.phone && (
            <p className="text-military-alert-red text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Email (Optional)
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="input-field w-full"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
          />
          {errors.email && (
            <p className="text-military-alert-red text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Gender <span className="text-military-alert-red">*</span>
          </label>
          <select
            className="input-field w-full"
            value={data.gender}
            onChange={(e) => updateData({ gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && (
            <p className="text-military-alert-red text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-military-smoke mb-2">
            Date of Birth <span className="text-military-alert-red">*</span>
          </label>
          <input
            type="date"
            className="input-field w-full"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split('T')[0]}
          />
          {errors.dateOfBirth && (
            <p className="text-military-alert-red text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleNext} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
