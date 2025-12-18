'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import PersonalInfoStep from '@/components/forms/PersonalInfoStep';
import LagosIndigeneStep from '@/components/forms/LagosIndigeneStep';
import EducationStep from '@/components/forms/EducationStep';
import BranchSelectionStep from '@/components/forms/BranchSelectionStep';
import ConsentStep from '@/components/forms/ConsentStep';
import SuccessStep from '@/components/forms/SuccessStep';

type FormData = {
  // Personal Info
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | '';
  dateOfBirth: string;
  // Lagos Indigene
  lga: string;
  placeOfOrigin: string;
  homeAddress: string;
  currentAddress: string;
  // Education
  qualification: string;
  numberOfPasses?: number;
  numberOfSittings?: number;
  yearOfExam?: string;
  // Branches & Skills
  branches: string[];
  skills: string[];
};

const STEPS = [
  'Personal Information',
  'Lagos Indigene Details',
  'Education',
  'Branch & Skills',
  'Consent & Submit',
];

export default function ShowInterestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    lga: '',
    placeOfOrigin: '',
    homeAddress: '',
    currentAddress: '',
    qualification: '',
    numberOfPasses: undefined,
    numberOfSittings: undefined,
    yearOfExam: '',
    branches: [],
    skills: [],
  });
  const [referenceId, setReferenceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setReferenceId(data.referenceId);
      setCurrentStep(STEPS.length); // Move to success step
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === STEPS.length) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight py-12">
          <SuccessStep referenceId={referenceId} />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-military-midnight via-military-navy to-military-midnight py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-military-smoke mb-2">
              Expression of Interest
            </h1>
            <p className="text-military-muted">
              Complete all steps to register your interest
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div
                  key={index}
                  className={`flex-1 ${index !== 0 ? 'ml-2' : ''}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all ${
                      index <= currentStep
                        ? 'bg-military-field-green'
                        : 'bg-white/10'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-military-gold font-semibold">
                Step {currentStep + 1} of {STEPS.length}
              </p>
              <p className="text-military-smoke mt-1">{STEPS[currentStep]}</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-military-alert-red/10 border border-military-alert-red/30 rounded-lg">
              <p className="text-military-alert-red text-sm">{error}</p>
            </div>
          )}

          {/* Form Content */}
          <div className="glass-card p-6 md:p-8">
            {currentStep === 0 && (
              <PersonalInfoStep
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
              />
            )}
            {currentStep === 1 && (
              <LagosIndigeneStep
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 2 && (
              <EducationStep
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <BranchSelectionStep
                data={formData}
                updateData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <ConsentStep
                onSubmit={handleSubmit}
                onPrev={prevStep}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-military-muted">
              <span className="font-semibold text-military-smoke">Note:</span> No payment is required.
              All information will be kept confidential.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
