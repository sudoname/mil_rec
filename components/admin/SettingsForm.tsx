'use client';

import { useState, useEffect } from 'react';

interface Setting {
  key: string;
  value: string;
  label: string;
  description: string;
  type: 'text' | 'textarea' | 'number';
}

const SETTINGS_CONFIG: Setting[] = [
  {
    key: 'hero_title',
    label: 'Hero Title',
    description: 'Main title displayed on the homepage hero section',
    type: 'textarea',
    value: '',
  },
  {
    key: 'hero_subtitle',
    label: 'Hero Subtitle',
    description: 'Subtitle text displayed below the hero title',
    type: 'textarea',
    value: '',
  },
  {
    key: 'official_notice',
    label: 'Official Notice',
    description: 'Main content for the official notice section',
    type: 'textarea',
    value: '',
  },
  {
    key: 'anti_scam_notice',
    label: 'Anti-Scam Notice',
    description: 'Important anti-scam disclaimer text',
    type: 'textarea',
    value: '',
  },
  {
    key: 'contact_phone_1',
    label: 'Contact Phone 1',
    description: 'Primary contact phone number',
    type: 'text',
    value: '',
  },
  {
    key: 'contact_phone_2',
    label: 'Contact Phone 2',
    description: 'Secondary contact phone number',
    type: 'text',
    value: '',
  },
  {
    key: 'contact_email',
    label: 'Contact Email',
    description: 'Official contact email address',
    type: 'text',
    value: '',
  },
  {
    key: 'office_address',
    label: 'Office Address',
    description: 'Physical office address',
    type: 'textarea',
    value: '',
  },
  {
    key: 'recruitment_open',
    label: 'Recruitment Status',
    description: 'Set to "true" to show recruitment is open, "false" to close',
    type: 'text',
    value: '',
  },
];

export default function SettingsForm() {
  const [settings, setSettings] = useState<Setting[]>(SETTINGS_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        const updatedSettings = SETTINGS_CONFIG.map((setting) => ({
          ...setting,
          value: data[setting.key] || '',
        }));
        setSettings(updatedSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(settings.map((s) => (s.key === key ? { ...s, value } : s)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const settingsData = settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(null), 5000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-military-gold border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-military-muted">Loading settings...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg border ${
            message.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* General Settings */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-military-gold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          General Settings
        </h2>

        <div className="space-y-6">
          {settings.slice(0, 4).map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-military-smoke mb-2">
                {setting.label}
              </label>
              <p className="text-xs text-military-muted mb-2">{setting.description}</p>
              {setting.type === 'textarea' ? (
                <textarea
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className="input-field w-full"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={setting.type}
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className="input-field w-full"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Settings */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-military-gold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact Information
        </h2>

        <div className="space-y-6">
          {settings.slice(4, 8).map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-military-smoke mb-2">
                {setting.label}
              </label>
              <p className="text-xs text-military-muted mb-2">{setting.description}</p>
              {setting.type === 'textarea' ? (
                <textarea
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  rows={2}
                  className="input-field w-full"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type={setting.type}
                  value={setting.value}
                  onChange={(e) => handleChange(setting.key, e.target.value)}
                  className="input-field w-full"
                  placeholder={`Enter ${setting.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Portal Status */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-military-gold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Portal Status
        </h2>

        <div className="space-y-6">
          {settings.slice(8).map((setting) => (
            <div key={setting.key}>
              <label className="block text-sm font-medium text-military-smoke mb-2">
                {setting.label}
              </label>
              <p className="text-xs text-military-muted mb-2">{setting.description}</p>
              <input
                type={setting.type}
                value={setting.value}
                onChange={(e) => handleChange(setting.key, e.target.value)}
                className="input-field w-full"
                placeholder={`Enter ${setting.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={fetchSettings}
          className="btn-secondary"
          disabled={saving}
        >
          Reset Changes
        </button>
        <button
          type="submit"
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </form>
  );
}
