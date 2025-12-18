export const LAGOS_LGAS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
];

export const MILITARY_BRANCHES = [
  { value: 'army', label: 'Nigerian Army' },
  { value: 'navy', label: 'Nigerian Navy' },
  { value: 'airforce', label: 'Nigerian Air Force' },
  { value: 'defence_intelligence', label: 'Defence Intelligence Agency' },
  { value: 'cyber', label: 'Cyber Defence' },
  { value: 'support', label: 'Support Roles' },
];

export const SKILL_OPTIONS = [
  'IT/Computer Science',
  'Cybersecurity',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Medical/Healthcare',
  'Logistics',
  'Communications',
  'Intelligence Analysis',
  'Languages',
  'Aviation',
  'Maritime',
  'Administration',
];

export const QUALIFICATIONS = [
  'WAEC/NECO',
  'GCE',
  'Trade Test',
  'OND',
  'HND',
  'BSc/BA',
  'MSc/MA',
  'Professional Certification',
];

export const APPLICATION_STATUS = {
  NEW: 'NEW',
  REVIEWING: 'REVIEWING',
  SHORTLISTED: 'SHORTLISTED',
  CONTACTED: 'CONTACTED',
  REJECTED: 'REJECTED',
} as const;

export const STATUS_COLORS = {
  NEW: 'badge-new',
  REVIEWING: 'badge-reviewing',
  SHORTLISTED: 'badge-shortlisted',
  CONTACTED: 'badge-contacted',
  REJECTED: 'badge-rejected',
};
