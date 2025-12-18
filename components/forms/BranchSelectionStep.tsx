'use client';

import { useState } from 'react';
import { MILITARY_BRANCHES, SKILL_OPTIONS } from '@/lib/constants';

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function BranchSelectionStep({ data, updateData, onNext, onPrev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (data.branches.length === 0)
      newErrors.branches = 'Select at least one branch of interest';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const toggleBranch = (value: string) => {
    const branches = data.branches.includes(value)
      ? data.branches.filter((b: string) => b !== value)
      : [...data.branches, value];
    updateData({ branches });
  };

  const toggleSkill = (skill: string) => {
    const skills = data.skills.includes(skill)
      ? data.skills.filter((s: string) => s !== skill)
      : [...data.skills, skill];
    updateData({ skills });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-military-gold mb-6">
        Branch Selection & Skills
      </h2>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-3">
          Select Branch(es) of Interest <span className="text-military-alert-red">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MILITARY_BRANCHES.map((branch) => (
            <label
              key={branch.value}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                data.branches.includes(branch.value)
                  ? 'border-military-field-green bg-military-field-green/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <input
                type="checkbox"
                checked={data.branches.includes(branch.value)}
                onChange={() => toggleBranch(branch.value)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-military-field-green focus:ring-military-field-green focus:ring-offset-0"
              />
              <span className="text-military-smoke font-medium">{branch.label}</span>
            </label>
          ))}
        </div>
        {errors.branches && (
          <p className="text-military-alert-red text-xs mt-2">{errors.branches}</p>
        )}
        <p className="text-xs text-military-muted mt-2">
          You can select multiple branches
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-military-smoke mb-3">
          Relevant Skills (Optional)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SKILL_OPTIONS.map((skill) => (
            <label
              key={skill}
              className={`flex items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer text-sm ${
                data.skills.includes(skill)
                  ? 'border-military-gold bg-military-gold/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <input
                type="checkbox"
                checked={data.skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-military-gold focus:ring-military-gold focus:ring-offset-0"
              />
              <span className="text-military-smoke">{skill}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-military-muted mt-2">
          Select all skills that apply to you
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
